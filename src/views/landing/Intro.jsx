import {
    Grid,
    makeStyles,
} from '@material-ui/core';
import { Section } from 'src/components/organisms';
import { OverlapedImages, SectionHeader } from "src/components/molecules";


const useStyles = makeStyles(theme => ({
    textColumns: theme.palette.classes.gridSectionHeader,
    yellowBackground: theme.palette.gradientBG,
    imageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}));


function Intro(props) {
    const classes = useStyles();

    return (
        <Section {...props} className={classes.yellowBackground} fullWidth>
            <Grid container spacing={4} justify="center">
                <Grid item xs={12} lg={4}>
                    <div className={classes.textColumns}>
                        <SectionHeader
                        label="Introduction"
                            title="The Home of High Quality Racing"
                            subtitle={(
                                <>
                                    We are a collection of iRacers and racing enthusiasts who strive for
                                    clean, fast, and competitive asphalt racing. Our drivers know how
                                    to walk the tightrope of competitive racing while being respectful
                                    and displaying high quality race-craft.
                                    <br />
                                    <br />
                                    Our drivers come from a variety of backgrounds and places, but all
                                    being drawn to Fast 'n Fun for their desire to get more out of
                                    iRacing than what the open public races provide. Come learn more
                                    about us, and even consider reaching out if you want to reach out!
                                </>
                            )}
                            subtitleProps={{
                                align: "justify",
                                variant: "body1"
                            }}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} lg={6} className={classes.imageContainer}>
                    <OverlapedImages
                        data-aos="fade-up"
                        image1={{ src: "/static/images/screenshots/cup_michigan.png" }}
                        image3={{ src: "/static/images/screenshots/3_wide_trucks.png" }}
                        image2={{ src: "/static/images/screenshots/4_wide_trucks.png" }}
                    />
                </Grid>
            </Grid>
        </Section>
    );
}

export default Intro;