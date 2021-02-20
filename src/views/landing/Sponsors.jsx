import clsx from "clsx";
import {
    Grid,
    makeStyles,
} from '@material-ui/core';
import { Section } from 'src/components/organisms';
import { useBreakpoint } from "src/hooks";


const useStyles = makeStyles(theme => ({
    cell: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    sponsor: {
        height: 140,
        width: "100%",
    },
    imgContainer: {
        maxWidth: "90%",
        margin: theme.spacing(.5),
        "& img": {
            width: "100%",
        },
    },
    rightBorder: {
        borderRight: `2px solid ${theme.palette.grey[700]}`,
    },
    topMargin: {
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(4.5),
            paddingTop: theme.spacing(4),
            borderTop: `2px solid ${theme.palette.grey[700]}`,
        },
    },
}));


function Sponsors() {
    const classes = useStyles();
    const isSm = useBreakpoint("sm", "down", false);

    function SponsorImage({ src }) {
        return (
            <div className={classes.imgContainer}>
                <img className={classes.image} src={src} />
            </div>
        );
    }

    return (
        <Section className={classes.root} fullWidth>
            <Grid container justify="center">
                <Grid item sm={12} md={4} lg={3} className={clsx(classes.cell, { [classes.rightBorder]: !isSm })}>
                    <SponsorImage src="/static/images/sponsors/gmg.png" />
                </Grid>
                <Grid item sm={12} md={4} lg={3} className={clsx(classes.cell, classes.topMargin, { [classes.rightBorder]: !isSm })}>
                    <SponsorImage src="/static/images/sponsors/Champion.png" />
                </Grid>
                <Grid item sm={12} md={4} lg={3} className={clsx(classes.cell, classes.topMargin)}>
                    <SponsorImage src="/static/images/sponsors/bsm.png" />
                </Grid>
            </Grid>
        </Section>
    );
}

export default Sponsors;