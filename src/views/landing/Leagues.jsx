import {
    GridList,
    GridListTile,
    GridListTileBar,
    IconButton,
    makeStyles,
} from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import { SectionHeader } from "src/components/molecules";
import { Section } from "src/components/organisms";
import { useBreakpoint } from "src/hooks";

const leagues = [
    {
        img: "/static/images/screenshots/4_wide_cup.png",
        name: "Champion Cup Series",
        featured: true,
    },
    {
        img: "/static/images/screenshots/xfinity_finish.png",
        name: "Fast 'n Fun Xfinity Series",
    },
    {
        img: "/static/images/screenshots/iroc_drafting.png",
        name: "Fast 'n Fun IROC Series",
    },
    {
        img: "/static/images/screenshots/3_wide_trucks.png",
        name: "Green Mountain Grills Trucks Series",
        featured: true,
    },
    
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    icon: {
        marginRight: theme.spacing(.5),
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));


function Leagues() {
    const classes = useStyles();
    const isSm = useBreakpoint("sm", "down", false);

    return (
        <Section>
            <SectionHeader
                title="Fast &apos;n Fun Leagues"
                subtitle="Check out our current series and learn more about the schedules, broadcasts, and drivers"
            />
            <GridList cellHeight={180} spacing={isSm ? 4 : 8}>
                {leagues.map((tile, idx) => (
                    <GridListTile key={idx} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
                        <img src={tile.img} alt={tile.name} className={classes.tileImage}/>
                        <GridListTileBar
                            title={tile.name}
                            actionIcon={
                                <IconButton aria-label={`info about ${tile.name}`} className={classes.icon}>
                                    <ChevronRight />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </Section>
    );
}

export default Leagues;