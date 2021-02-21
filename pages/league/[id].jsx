import moment from "moment";
import ErrorPage from 'next/error';

import PageFrame from "src/frame";

import Seasons from 'src/views/league/Seasons';
import Drivers from 'src/views/league/Drivers';
import Leagues from "src/views/landing/Leagues";

import scrapped from "src/data/leagues/scrapped.json";
import leagues from "src/data/leagues/index.json";
import CompleteHeroBackground from "src/components/organisms/CompleteHeroBackground";
import { useTheme } from "@material-ui/core";


function sortByNumber(a, b) {
    if (a.number === b.number) {
        return a.name > b.name ? 1 : -1;
    }
    return a.number > b.number ? 1 : -1;
}

function LeaguePage({ league, overview, valid }) {
    if (!valid) {
        return <ErrorPage statusCode={404} />
    }

    const theme = useTheme();
    const sortedSeasons = league.seasons.sort((a, b) => {
        return moment(a.sessions[0].date) > moment(b.sessions[0].date) ? -1 : 1
    });
    return (
        <PageFrame>
            <CompleteHeroBackground
                backgroundImg={overview.img}
                title={league.name}
                subtitle={overview.description}
            />
            <Seasons seasons={sortedSeasons} />
            <Drivers
                drivers={league.members.filter(d => d.number !== null).sort(sortByNumber)}
                secondaryFunc={() => undefined}
                avatarFunc={(driver) => ({
                    style: {
                        fontSize: theme.typography.h1.fontSize,
                        color: theme.palette.common.white,
                        ...theme.typography.header,
                    },
                    children: driver.number,
                })}
            />
            <Leagues />
        </PageFrame>
    );
}

LeaguePage.getInitialProps = async ({ res, ...ctx }) => {
    const { id } = ctx.query;
    const data = scrapped[id];
    const overview = leagues.find(l => l.id == id);
    return { league: { ...data, id }, overview, valid: Boolean(data) && Boolean(overview) };
}

export default LeaguePage;