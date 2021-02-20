import { useState } from 'react';
import {
    Typography,
    makeStyles,
    Button,
} from '@material-ui/core';

import { SectionHeader, TypedText } from 'src/components/molecules';
import { HeroShaped } from 'src/components/organisms';
import { useBreakpoint, useInterval } from 'src/hooks';


function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}



const backgrounds = shuffle([
    "/static/images/screenshots/iroc_drafting.png",
    "/static/images/screenshots/4_wide_cup.png",
    "/static/images/screenshots/xfinity_finish.png",
]);

const useStyles = makeStyles(theme => ({
    headingItalic: {
        ...theme.typography.headerItalic
    },
    heading: {
        ...theme.typography.header
    },
    hero: {
        [theme.breakpoints.up('md')]: {
            height: "70vh",
        },
        [theme.breakpoints.up('sm')]: theme.palette.gradientBG,
        [theme.breakpoints.down('sm')]: {
            height: "62vh",
            backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7) ),url("${backgrounds[0]}")`,
            backgroundRepeat: "none",
            backgroundSize: "cover",
        },
    },
    leftSection: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    leftSideContent: {
        '& .section-header__cta-container': {
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                '& .section-header__cta-item-wrapper': {
                    width: '100%',
                    '&:last-child': {
                        marginLeft: 0,
                        marginTop: theme.spacing(1),
                    },
                    '& .MuiButtonBase-root': {
                        width: '100%',
                    },
                },
            },
        }
    },
    heroShaped: {
        '& .hero-shaped__image': {
            backgroundColor: theme.palette.background.paper,
        },
        [theme.breakpoints.down('sm')]: {
            '& .hero-shaped__image': {
                position: 'relative',
            },
            '& .hero-shaped__wrapper': {
                flexDirection: 'column',
            },
        },
    },
    imageAnimation: {
        width: '120%',
        animation: `$shrink 10s linear infinite`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto 100%",
        height: '120%',
        position: "absolute",
        backgroundColor: theme.palette.grey[700],
        "-webkit-transition": "opacity .8s ease-in-out",
        "-moz-transition": "opacity .8s ease-in-out",
        "-o-transition": "opacity .8s ease-in-out",
        transition: "opacity .8s ease-in-out",
        [theme.breakpoints.down('sm')]: {
            display: "hidden",
        }
    },
    '@keyframes shrink': {
        '0%': {
            backgroundSize: 'auto 100%',
        },
        '50%': {
            backgroundSize: 'auto 110%',
        },
        '100%': {
            backgroundSize: 'auto 100%',
        },
    },
}));

function LandingHero({ learnMoreLink }) {

    const [bgIdx, setBgIdx] = useState(0);
    useInterval(() => {
        setBgIdx((bgIdx + 1) % backgrounds.length);
    }, 5000);


    const classes = useStyles({ backgroundImg: backgrounds[bgIdx], offset: 220 });
    const isSm = useBreakpoint("sm", "down", true);

    const title = (
        <Typography variant="h1" component="span" className={classes.headingItalic}>
            Fast 'n Fun iRacing
            <br />
            <TypedText
                component="span"
                variant="h3"
                color="secondary"
                className={classes.heading}
                typedProps={{
                    strings: [
                        'NASCAR Cup Series',
                        'NASCAR Xfinity Series',
                        'NASCAR Trucks Series',
                        'IROC Prototype Series',
                        'Daytona Speedweeks',
                    ],
                    typeSpeed: 50,
                    loop: true,
                }}
            />
        </Typography>
    );

    const leftSideContent = (
        <SectionHeader
            title={title}
            subtitle="Discover the excitement around every turn!"
            align={isSm ? "center" : "left"}
            titleProps={{
                variant: 'h2',
                color: 'textPrimary',
            }}
            ctaGroup={[
                <Button variant="contained" size="large">Race Schedule</Button>,
                <Button variant="outlined" size="large">Join the Fun</Button>
            ]}
            data-aos="fade-right"
            disableGutter
            className={classes.leftSideContent}
        />
    );

    return (
        <>
            <HeroShaped
                className={classes.hero}
                leftClassName={classes.leftSection}
                leftSide={leftSideContent}
                rightSide={(
                    <>
                        {
                            backgrounds.map((bg, idx) => (
                                <div
                                    key={idx} className={classes.imageAnimation}
                                    style={{
                                        background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url("${bg}")`,
                                        opacity: bgIdx === idx ? "1" : "0",
                                        animationDelay: idx % 2 === 0 ? "0" : "5s",
                                    }}
                                />
                            ))
                        }
                    </>
                )}
            />
        </>
    );
}

export default LandingHero;