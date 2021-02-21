import PageFrame from "src/frame";
import { Button } from "@material-ui/core";
import LandingHero from 'src/views/landing/Hero';
import Sponsors from "src/views/landing/Sponsors";
import Intro from "src/views/landing/Intro";
import Leagues from "src/views/landing/Leagues";
import { ArrowDownward } from "@material-ui/icons";

const introID = "intro";
const leaguesID = "leagues";

function HomePage() {

    const makeScrollHandler = link => e => {
        const element = document.getElementById(link);
        element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <PageFrame hideNav>
            <LandingHero
                ctaGroup={[
                    <Button
                        variant="outlined" size="large" onClick={makeScrollHandler(introID)}
                        startIcon={<ArrowDownward />}
                    >
                        Learn More
                    </Button>,
                    <Button variant="contained" size="large" onClick={makeScrollHandler(leaguesID)}>Leagues</Button>,
                ]}
            />
            <Sponsors />
            <Intro id={introID}/>
            <Leagues id={leaguesID}/>
        </PageFrame>
    );
}

export default HomePage;