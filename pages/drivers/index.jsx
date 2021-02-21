import CompleteHeroBackground from "src/components/organisms/CompleteHeroBackground";
import PageFrame from "src/frame";
import Drivers from "src/views/league/Drivers";

import driverData from "src/data/drivers.json";

function DriversPage() {
    const drivers = Object.values(driverData).sort((a, b) => a.name > b.name ? 1 : -1);
    return (
        <PageFrame title="Drivers">
            <CompleteHeroBackground
                backgroundImg="/static/images/screenshots/4_wide_cup.png"
                title="Drivers of Fast n Fun"
                subtitle="Learn more about the individuals who make up the different leagues"
            />
            <Drivers drivers={drivers} />
        </PageFrame>
    )
}

export default DriversPage;