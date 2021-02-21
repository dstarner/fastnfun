import clsx from "clsx";
import { Avatar, Grid, ListItem, ListItemAvatar, ListItemText, makeStyles } from "@material-ui/core";
import { SectionHeader } from "src/components/molecules";
import { CardBase, Section } from "src/components/organisms";
import { useBreakpoint } from "src/hooks";
import { useState } from "react";


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.grey[900],
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
    socialBtns: {
        display: 'flex',
        justifyContent: 'center',
        '& button': {
            marginLeft: theme.spacing(0.5),
            marginRight: theme.spacing(0.5),
        },
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
    title: {
        fontWeight: 'bold',
    },
}));


function Drivers({ drivers }) {
    const classes = useStyles();
    const isMd = useBreakpoint("md", "up", true);

    const [bioMemeber, setBioMember] = useState(null);

    const DriverCard = ({ driver }) => (
        <CardBase className={classes.cardBase} liftUp>
            <ListItem disableGutters className={classes.listItem}>
                <ListItemAvatar className={classes.listItemAvatar}>
                    <Avatar
                        {...driver.authorPhoto}
                        className={clsx(classes.avatar, {
                            [classes.bioAvatar]: driver.bio,
                        })}
                        onClick={() => setBioMember(driver.bio ? item : null)}
                    />
                </ListItemAvatar>
                <ListItemText
                    className={classes.listItemText}
                    primary={driver.name}
                    secondary={driver.number ? `#${driver.number}` : "-"}
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
            </ListItem>
        </CardBase>
    )

    return (
        <div className={classes.root}>
            <Section>
                <SectionHeader
                    title="Drivers"
                    subtitle="See who's behind the steering wheel of these fast cars"
                />
                <Grid container justify="center" spacing={isMd ? 3 : 1}>
                    {drivers.map(driver => (
                        <Grid item key={driver.id} md={4} xs={6}>
                            <DriverCard driver={driver} />
                        </Grid>
                    ))}
                </Grid>
            </Section>
        </div>
    );
}

export default Drivers;