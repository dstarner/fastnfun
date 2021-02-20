import PageFrame from "src/frame";
import LandingHero from 'src/views/landing/Hero';
import Sponsors from "src/views/landing/Sponsors";
import Intro from "src/views/landing/Intro";
import Leagues from "src/views/landing/Leagues";


function HomePage() {
    return (
        <PageFrame hideNav>
            <LandingHero learnMoreLink="intro" />
            <Sponsors />
            <Intro id="intro"/>
            <Leagues />
        </PageFrame>
    );
}

export default HomePage;