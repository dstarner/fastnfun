import {
    GridList,
    GridListTileBar,
    IconButton,
    makeStyles,
} from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import { GridListTileLink } from "src/components/atoms/Link";
import { SectionHeader } from "src/components/molecules";
import { Section } from "src/components/organisms";
import { useBreakpoint } from "src/hooks";

import leagues from "src/data/leagues/index.json";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    tileBar: {
        "&:hover": {
            backgroundColor: theme.palette.grey[900],
        },
    },
    icon: {
        marginRight: theme.spacing(.5),
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));


function Leagues(props) {
    const classes = useStyles();
    const isSm = useBreakpoint("sm", "down", false);

    return (
        <Section {...props}>
            <SectionHeader
                title="Fast &apos;n Fun Leagues"
                subtitle="Check out our current series and learn more about the schedules, broadcasts, and drivers"
            />
            <GridList cellHeight={180} spacing={isSm ? 4 : 8}>
                {leagues.map((tile, idx) => (
                    <GridListTileLink
                        key={idx} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}
                        href={`/league/${tile.id}`}
                    >
                        <img src={tile.img} alt={tile.name} className={classes.tileImage}/>
                        <GridListTileBar
                            title={tile.name}
                            classes={{
                                root: classes.tileBar
                            }}
                            actionIcon={
                                <IconButton aria-label={`info about ${tile.name}`} className={classes.icon}>
                                    <ChevronRight />
                                </IconButton>
                            }
                        />
                    </GridListTileLink>
                ))}
            </GridList>
        </Section>
    );
}

export default Leagues;