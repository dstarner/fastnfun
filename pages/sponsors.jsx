import { Fragment } from "react";
import { Divider, Grid, makeStyles, Typography } from "@material-ui/core";

import { SectionHeader } from "src/components/molecules";
import { Section } from "src/components/organisms";
import CompleteHeroBackground from "src/components/organisms/CompleteHeroBackground";
import PageFrame from "src/frame";

import sponsors from "src/data/sponsors";


const useStyles = makeStyles(theme => ({
    title: {
        ...theme.typography.header,
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
}));


function SponsorsPage() {
    const classes = useStyles();

    function SponsorImage({ src }) {
        return (
            <div className={classes.imgContainer}>
                <img className={classes.image} src={src} />
            </div>
        );
    }

    return (
        <PageFrame title="Sponsors">
            <CompleteHeroBackground
                backgroundImg="/static/images/screenshots/daytona_pack.jpg"
                title="Our Sponsors"
                subtitle="Our leagues would not be possible without the assistance of our sponsors"
            />
            <Section>
                <Grid container justify="center" spacing={4}>
                    {sponsors.map((sponsor, idx) => (
                        <Fragment key={idx}>
                            <Grid item xs={12} container alignItems="center">
                                <Grid item xs={12} md={5}>
                                    <SponsorImage src={sponsor.img} />
                                </Grid>
                                <Grid item xs={12} md={7}>
                                    <SectionHeader
                                        title={sponsor.name}
                                        titleProps={{ className: classes.title }}
                                    />
                                    <Typography align="justify">
                                        {sponsor.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                            {
                                idx !== sponsors.length - 1 && (
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                )
                            }
                        </ Fragment>
                    ))}
                </Grid>
            </Section>
        </PageFrame>
    );
}

export default SponsorsPage;