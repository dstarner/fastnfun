import { Fragment } from "react";
import clsx from "clsx";
import PageFrame from "src/frame";
import ErrorPage from 'next/error';
import {
    Avatar,
    Card,
    CardContent,
    DialogContent,
    DialogContentText,
    Grid,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Typography,
    useTheme,
} from "@material-ui/core";

import DefinitionList from "src/components/atoms/DefinitionList";
import { ListItemLink } from "src/components/atoms/Link";
import { CardBase, Section, SideHeroCover } from "src/components/organisms";
import { SectionHeader } from "src/components/molecules";
import { useBreakpoint } from "src/hooks";
import driverData from "src/data/drivers.json";


const useStyles = makeStyles(theme => ({
    heroTitle: {
        ...theme.typography.headerItalic,
    },
    section: {
        padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
    },
    title: {
        ...theme.typography.header,
    },
    cardBase: {
        boxShadow: 'none',
        background: theme.palette.background.paper,
        borderRadius: theme.spacing(1),
        '& .card-base__content': {
            padding: theme.spacing(1),
            [theme.breakpoints.up('sm')]: {
                padding: theme.spacing(3),
            },
        },
    },
    cardBase: {
        boxShadow: 'none',
        background: theme.palette.background.paper,
        borderRadius: theme.spacing(1),
        '& .card-base__content': {
            padding: theme.spacing(1),
            [theme.breakpoints.up('sm')]: {
                padding: theme.spacing(3),
            },
        },
    },
    bioText: {
        marginTop: theme.spacing(2),
        '& a': {
            color: theme.palette.primary.main,
        },
    },
    bioAvatar: {
        cursor: 'pointer',
        '&:hover': {
            border: `4px solid ${theme.palette.grey[500]}`,
        },
    },
    carNumber: {
        fontSize: theme.typography.h1.fontSize,
        color: theme.palette.common.white,
        ...theme.typography.header,
    },
    avatar: {
        width: 110,
        height: 110,
        border: `4px solid ${theme.palette.primary.dark}`,
        borderRadius: '100%',
        boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.1)',
    },
    listItem: {
        padding: 0,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    listItemAvatar: {
        marginRight: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            marginRight: 0,
            marginBottom: theme.spacing(2),
        },
    },
    listItemText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        margin: 0,
        height: '100%',
    },
    bioContainer: {
        paddingBottom: 0,
    },
}));

function DriverDetailsPage({ driver, valid }) {
    const theme = useTheme();
    const classes = useStyles();
    const isMd = useBreakpoint("md", "up", true);

    if (!valid) {
        return <ErrorPage statusCode={404} />
    }

    const hometown = (driver.info.find(o => o.key === "Hometown") || { value: undefined}).value;

    return (
        <PageFrame title={driver.name}>
            <SideHeroCover
                backgroundImg="/static/images/track_garage.jpg"
                backgroundColor={theme.palette.grey[900]}
                sideContent={(
                    <SectionHeader
                        title="Driver Profile"
                        subtitle="Learn more about our drivers"
                        align={isMd ? "left" : "center"}
                        titleProps={{
                            variant: "h2",
                            className: classes.heroTitle,
                        }}
                    />
                )}
            >
                <Section className={classes.section}>
                    <Card>
                        <CardContent>
                            <ListItem className={classes.listItem}>
                                <ListItemAvatar className={classes.listItemAvatar}>
                                    <Avatar src={`/static/images/profiles/${driver.id}.png`} className={classes.avatar} />
                                </ListItemAvatar>
                                <ListItemText
                                    className={classes.listItemText}
                                    primary={driver.name}
                                    secondary={<><strong>Hometown:</strong> {hometown || "-"}</>}
                                    primaryTypographyProps={{
                                        className: classes.title,
                                        variant: 'h4',
                                        align: isMd ? 'left' : 'center',
                                    }}
                                    secondaryTypographyProps={{
                                        variant: 'subtitle1',
                                        color: 'textPrimary',
                                        align: isMd ? 'left' : 'center',
                                    }}
                                />
                            </ListItem>
                            {
                                driver.bio && (
                                    <DialogContent className={classes.bioContainer}>
                                        <DialogContentText>
                                            {(driver.bio || "").split("\n").map((block, idx) => (
                                                <Fragment key={idx}>{block}<br/></Fragment>
                                            ))}
                                        </DialogContentText>
                                    </DialogContent>
                                )
                            }
                        </CardContent>
                    </Card>
                </Section>
                <Section className={classes.section}>
                    <SectionHeader
                        title="Driver Information"
                        titleProps={{
                            className: classes.title,
                        }}
                    />
                    <Grid container justify="center" spacing={2}>
                        <Grid item xs={12} md={10} >
                            <DefinitionList definitions={driver.info.filter(o => o.value && o.value !== "N/A")} />
                        </Grid>
                    </Grid>
                </Section>
                <Section className={classes.section}>
                    <SectionHeader
                        title="Leagues &amp; Car Number"
                        titleProps={{
                            className: classes.title,
                        }}
                    />
                    <Grid container spacing={2}>
                        {driver.leagues.map(league => (
                            <Grid item key={league.league_id} xs={12} sm={12} md={12}>
                                <CardBase className={classes.cardBase} liftUp>
                                    <ListItemLink disableGutters className={classes.listItem} href={`/league/${league.league_id}`}>
                                        <ListItemAvatar className={classes.listItemAvatar}>
                                            <Avatar
                                                className={clsx(classes.avatar, classes.carNumber, {
                                                    [classes.bioAvatar]: driver.bio,
                                                })}
                                            >
                                                {league.number}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            className={classes.listItemText}
                                            primary={league.league_name}
                                            secondary={(
                                                <Typography>
                                                    <strong>Nickname:</strong> {league.nickname ? league.nickname : "N/A"}
                                                </Typography>
                                            )}
                                            primaryTypographyProps={{
                                                className: classes.title,
                                                variant: 'h6',
                                                align: isMd ? 'left' : 'center',
                                            }}
                                            secondaryTypographyProps={{
                                                variant: 'subtitle1',
                                                color: 'textPrimary',
                                                align: isMd ? 'left' : 'center',
                                            }}
                                        />
                                    </ListItemLink>
                                </CardBase>
                            </Grid>
                        ))}
                    </Grid>
                </Section>
            </SideHeroCover>
        </PageFrame>
    );
}

DriverDetailsPage.getInitialProps = async ({ res, ...ctx }) => {
    const { id } = ctx.query;
    const data = driverData[id];
    return { key: Number(new Date()), driver: { ...data, id }, valid: Boolean(data) };
}

export default DriverDetailsPage;