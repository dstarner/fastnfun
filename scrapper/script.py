import json
import os
from pathlib import Path
from pprint import pprint
import re
import sys
from time import sleep

from selenium import webdriver
from selenium.common import exceptions


SCRIPT_PATH = Path(__file__).parent.absolute()
LEAGUE_DIR_PATH = SCRIPT_PATH / Path('../src/data/leagues')
LEAGUE_INDEX_FILE = LEAGUE_DIR_PATH / Path('index.json')
LEAGUE_OUTPUT_FILE = LEAGUE_DIR_PATH / Path('scrapped.json')
DRIVER_OUTPUT_FILE = LEAGUE_DIR_PATH / Path('../drivers.json')
PROFILE_IMAGE_FILE = SCRIPT_PATH / Path('../public/static/images/profiles/{id}.png')

# iRacing URLs
LOGIN_URL = 'https://members.iracing.com/membersite/login.jsp'
LEAGUE_URL = 'https://members.iracing.com/membersite/member/LeagueView.do?league={id}'
LEAGUE_IMAGE_URL = 'https://members.iracing.com/membersite/member/GetLeagueImage?leagueid={id}'
DRIVER_URL = 'https://members.iracing.com/membersite/member/CareerStats.do?custid={id}'
PROFILE_URL = 'https://members.iracing.com/membersite/member/GetProfileImage?custid={id}'

# Credentials
USERNAME = os.getenv('IRACING_USERNAME', 'test')
PASSWORD = os.getenv('IRACING_PASSWORD', 'test')


def strip_end(text, suffix):
    if suffix and text.endswith(suffix):
        return text[:-len(suffix)]
    return text


class iRacingLeagueScrapper:

    def __init__(self, league_ids, username, password):
        if len(league_ids) == 0:
            raise ValueError('Needs to have at least 1 league!')
        self.leagues = league_ids
        self.username = username
        self.password = password
        self.data = {}

    def generate_all_league_data(self):
        num_leagues = len(self.leagues)
        for idx, league in enumerate(self.leagues):
            print(f'({idx + 1}/{num_leagues}) Generating data for league #{league}')
            self.data[league] = self.generate_league_data(league)
        print("Finished the league data")
        return self.data
    
    def generate_league_data(self, league_id):
        league_url = LEAGUE_URL.format(id=league_id)
        self.driver.get(league_url)
        sleep(2)
        print(f'Loaded league page for {league_id}')
        data = {
            'name': self._get_league_title(),
            'members': self._get_league_members(),
            'seasons': self._get_seasons(),
        }
        print(f'Finished the league {data["name"]}')
        return data

    @property
    def driver(self):
        """Generates or returns the chrome driver
        """
        if not hasattr(self, '_driver'):
            self._driver = webdriver.Chrome()
            print('Created Chrome Selenium driver')
            self._login_to_iracing()
        return self._driver

    def _login_to_iracing(self):
        """Use the Chrome driver to log in to iRacing
        """
        print("Attempting to log in to iRacing")
        self.driver.get(LOGIN_URL)
        self.driver.find_element_by_name('username').send_keys(self.username)
        self.driver.find_element_by_name('password').send_keys(self.password)
        self.driver.find_element_by_id('submit').click()
        print("Logged in to iRacing")

    def _get_league_title(self):
        name_header = self.driver.find_element_by_xpath("//div[@id='toolbar-heading']/h2")
        name = name_header.text.title()
        print(f'  - League Name: "{name}"')
        return name

    def _get_league_members(self):
        # make sure we are on the correct tab
        try:
            self.driver.find_element_by_xpath("//a[@id='membersSegment']").click()
            sleep(2)
        except exceptions.ElementNotInteractableException:
            pass

        def parse_member_row(element):
            parts = element.find_elements_by_tag_name("td")
            try:
                number = int(parts[2].text)
            except:
                number = None
            return {
                'name': re.sub(r'[\d]+$', '', parts[0].text),  # remove trailing numbers in names
                'nickname': parts[1].text,
                'number': number,
                'id': int(parts[0].find_element_by_tag_name('a').get_attribute('href').split('=',1)[1]),
            }

        # Paginate through all of the members
        members = []
        has_more_members = True
        while has_more_members:
            member_table_rows = self.driver.find_elements_by_xpath("//div[@id='leagueMemberManageTable']/table/tr")[1:]

            page_members = list(map(parse_member_row, member_table_rows))
            print(f'Found {len(page_members)} members on this page')
            if page_members:
                members.extend(page_members)
            
            has_more_members = False

            sleep(1)
            next_page_button = self.driver.find_element_by_xpath("//div[@id='nextPrev']/a[1]")
            if 'prev' in next_page_button.text.lower():
                next_page_button = self.driver.find_element_by_xpath("//div[@id='nextPrev']/a[2]")
            if next_page_button and 'disabled' in next_page_button.get_attribute('class').split():
                has_more_members = False
                print("No more members for the league")
            else:
                print("Going to the next page of members")
                has_more_members = True
                next_page_button.click()

            if has_more_members:
                print('Sleeping for a quick sec before looking at next member page')
                sleep(1)
        return members

    def _get_seasons(self):
        # make sure we are on the correct tab
        try:
            self.driver.find_element_by_xpath("//a[@id='raceSeasonsSegment']").click()
            sleep(2)
        except exceptions.ElementNotInteractableException:
            pass

        def try_int(val):
            try:
                return int(val)
            except ValueError:
                return -1

        def parse_session_row(element):
            parts = element.find_elements_by_tag_name("td")
            try:
                number = int(parts[2].text)
            except:
                number = None
            return {
                'date': parts[0].text,
                'time': parts[1].text,
                'track': strip_end(parts[3].text.strip(), ' -'),
                'practice': try_int(parts[4].text.replace('m', '')),
                'qual': try_int(parts[5].text.replace('L', '').replace('+', '')),
                'race': try_int(parts[6].text.replace('L', '').replace('+', '').replace('H', '')),
            }

        def parse_season(element):
            data = {
                'id': int(element.get_attribute('id').split('-',1)[-1]),
                'name': element.find_element_by_tag_name("h2").text,
            }

            element.click()
            sleep(1)

            race_table_rows = self.driver.find_elements_by_xpath("//div[@id='schedule-table']/table/tr")[1:]
            print(f'Found {len(race_table_rows)} sessions in the season')
            data['sessions'] = list(map(parse_session_row, race_table_rows))

            # Go back to the season container page
            action_bar_element = self.driver.find_element_by_xpath("//div[@id='action-bar']")
            action_link = action_bar_element.find_elements_by_tag_name("a")[0]
            print(f"Clicking {action_link.text} to go back to season list")
            action_link.click()
            return data

        def get_action_link():
            action_bar_element = self.driver.find_element_by_xpath("//div[@id='action-bar']")
            return action_bar_element.find_elements_by_tag_name("a")[-1]

        seasons = []
        for _ in range(2):  # one for active and one for not active
            action_link = get_action_link()
            is_active_session = 'active' not in action_link.text.lower()

            def get_season_containers():
                container_xpath = "//div[@id='seasonsOverview']/div"
                return self.driver.find_elements_by_xpath(container_xpath)

            num_seasons = len(get_season_containers())
            print(f'Found {num_seasons} {"active" if is_active_session else "old"} seasons')

            for i in range(num_seasons):
                container = get_season_containers()[i]
                inner_container = container.find_element_by_xpath(".//div/div")
                seasons.append(parse_season(inner_container))
                sleep(2)

            action_link = get_action_link()
            print(f"Clicking {action_link.text} to switch season type")
            action_link.click()  # switch to the other session type
            sleep(1)

        return seasons

    def get_driver_info(self, member_id):
        self.driver.get(DRIVER_URL.format(id=member_id))
        sleep(2)
        print('  - on driver page')
        data = {
            'member_since': self.driver.find_element_by_css_selector(".image_area_member_since").text.lower().replace("member since", "").strip(),
            'bio': self.driver.find_element_by_id('textarea_BIO').text.strip(),
            'info': [],
        }
        print('  - loaded the basics')

        information_table = self.driver.find_element_by_css_selector('.personalFavsDiv').find_element_by_tag_name('tbody')
        information_rows = information_table.find_elements_by_tag_name('tr')

        print('  - found information table rows')
        for row in information_rows:
            cells = row.find_elements_by_tag_name('td')
            if len(cells) != 2:
                continue
            key = cells[0]
            value = cells[1]
            if 'email' in key.text.lower():
                continue  # that is sorta sensitive data
            data['info'].append({
                'key': strip_end(key.text.strip(), ':'),
                'value': value.text.strip()
            })
        print('  - parsed information table rows')

        return data

    def get_driver_image(self, member_id):
        self.driver.get(PROFILE_URL.format(id=member_id))
        sleep(1)
        with open(str(PROFILE_IMAGE_FILE).format(id=member_id), 'wb') as f: 
            f.write(self.driver.find_element_by_tag_name('img').screenshot_as_png)


def load_league_ids():
    """Load the league IDs to lookup
    """
    print(f'* Reading {LEAGUE_INDEX_FILE} for "league.id"s')
    if not LEAGUE_INDEX_FILE.exists():
        raise ValueError(f'{LEAGUE_INDEX_FILE} does not exist!')
    with open(LEAGUE_INDEX_FILE, 'r') as f:
        data = json.load(f)
        return list(map(lambda x: x['id'], data))


def league_load(scrapper):
    """Runs the main application loop
    """
    
    data = scrapper.generate_all_league_data()
    
    print('--------------------------')
    print(f'Generated all league data, dumping contents to\n\t{LEAGUE_OUTPUT_FILE}')

    with open(LEAGUE_OUTPUT_FILE, 'w') as f:
        json.dump(data, f, indent=2)
    print("done, closing driver")


def driver_condense():
    print(f'Condensing drivers across leagues into {DRIVER_OUTPUT_FILE}')
    with open(LEAGUE_OUTPUT_FILE, 'r') as f:
        league_data = json.load(f)

    member_map = {}
    
    for league_id, data in league_data.items():
        members = data['members']
        for member in members:
            if member['id'] not in member_map:
                member_map[member['id']] = {
                    'name': member['name'],
                    'id': member['id'],
                    'leagues': [],
                }
            member_map[member['id']]['leagues'].append({
                'nickname': member['nickname'],
                'number': member['number'],
                'league_id': league_id,
                'league_name': data['name'],
            })
    
    with open(DRIVER_OUTPUT_FILE, 'w') as f:
        json.dump(member_map, f, indent=2)


def driver_load(scrapper):
    print('Attempting to load driver info')

    with open(DRIVER_OUTPUT_FILE, 'r') as f:
        member_data = json.load(f)

    for member_id, member in member_data.items():
        print(f'Loading details for {member["name"]}')
        try:
            iracing_data = scrapper.get_driver_info(member_id)
            for key, val in iracing_data.items():
                member_data[member_id][key] = val
            scrapper.get_driver_image(member_id)
        except Exception as e:
            print(f'MEMBER ERROR: {e}')
    
    with open(DRIVER_OUTPUT_FILE, 'w') as f:
        json.dump(member_data, f, indent=2)


def main():
    leagues = load_league_ids()
    num_leagues = len(leagues)
    print(f'Generating data for {num_leagues} leagues {leagues}')
    print('--------------------------')

    scrapper = iRacingLeagueScrapper(leagues, username=USERNAME, password=PASSWORD)

    exc = None
    try:
        if not '--driver-only' in sys.argv:
            league_load(scrapper)
        print('\n----------------------------')

        driver_condense()
        driver_load(scrapper)
    except Exception as e:
        exc = e
    finally:
        if not exc or not 'no such element' in str(exc):
            if hasattr(scrapper, '_driver'):
                print("STARTING SHUTDOWN")
                scrapper.driver.close()
        if exc:
            raise exc
    
    

if __name__ == '__main__':
    main()