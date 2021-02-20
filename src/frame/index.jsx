import { useState } from "react";
import clsx from "clsx";
import {
    AppBar,
    Grid,
    IconButton,
    List,
    Slide,
    Toolbar,
    Typography,
    makeStyles,
    useScrollTrigger,
    Hidden,
    Drawer,
    Divider,
} from "@material-ui/core";
import { TypographyLink, ListItemLink } from "src/components/atoms/Link";
import { Section } from "src/components/organisms";
import { Menu } from "@material-ui/icons";


const links = [
    {
        title: "SPONSORS",
        href: "/sponsors",
    },
    {
        title: "DRIVERS",
        href: "/drivers",
    }
];


const useStyles = makeStyles(theme => ({
    header: {
        ...theme.typography.header,
    },
    headerItalic: {
        ...theme.typography.headerItalic,
    },
    drawer: {
        minWidth: 275,
    },
    drawerHeader: {
        display: "block",
        width: `calc(100% - ${theme.spacing(2)})`,
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
    },
    grow: {
        flexGrow: 1,
    },
    navigationContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listItem: {
        cursor: 'pointer',
        '&:hover > .menu-item, &:hover svg': {
            color: theme.palette.primary.dark,
        },
    },
    listItemActive: {
        '&> .menu-item': {
            color: theme.palette.primary.dark,
        },
    },
    listItemText: {
        flex: '0 0 auto',
        marginRight: theme.spacing(2),
        whiteSpace: 'nowrap',
        fontWeight: 500,
        fontSize: 'large',
    },
}));


function PageFrame({ children, floatingNav = false, hideNav = false }) {
    const classes = useStyles();
    const trigger = useScrollTrigger({ disableHysteresis: false, threshold: 150 });
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            {
                <Slide in={!hideNav || (hideNav && trigger)} unmountOnExit mountOnEnter>
                    <AppBar
                        color={floatingNav && !trigger ? 'transparent' : 'inherit'}
                        position={(floatingNav || hideNav) ? 'fixed' : 'sticky'}
                    >
                        <Toolbar>
                            <TypographyLink href="/" variant="h4" color="textPrimary" className={clsx(classes.grow, classes.headerItalic)}>
                                Fast 'n Fun iRacing
                            </TypographyLink>
                            <Hidden smDown>
                                <List className={classes.navigationContainer}>
                                    {
                                        links.map(({ title, href, ...linkProps}, idx) => (
                                            <ListItemLink
                                                key={idx} {...linkProps}
                                                className={classes.listItem}
                                                href={href}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    color="textSecondary"
                                                    className={clsx(classes.listItemText, 'menu-item')}
                                                >
                                                    {title}
                                                </Typography>
                                            </ListItemLink>
                                        ))
                                    }
                                </List>
                            </Hidden>
                            <Hidden mdUp>
                                <IconButton onClick={() => setDrawerOpen(true)}>
                                    <Menu/>
                                </IconButton>
                                <Drawer open={drawerOpen} anchor="left" onClose={() => setDrawerOpen(false)}>
                                    <div className={classes.drawer}>
                                        <TypographyLink href="/" variant="h4" color="textPrimary" className={clsx(classes.drawerHeader, classes.headerItalic)}>
                                            Fast &apos;n Fun iRacing
                                        </TypographyLink>
                                        <Divider />
                                        <List>
                                        {
                                            links.map(({ title, href, ...linkProps}, idx) => (
                                                <ListItemLink
                                                    key={idx} {...linkProps}
                                                    className={classes.listItem}
                                                    href={href}
                                                >
                                                    <Typography
                                                        variant="body1"
                                                        color="textSecondary"
                                                        className={clsx(classes.listItemText, 'menu-item')}
                                                    >
                                                        {title}
                                                    </Typography>
                                                </ListItemLink>
                                            ))
                                        }
                                        </List>
                                    </div>
                                </Drawer>
                            </Hidden>
                        </Toolbar>
                    </AppBar>
                </Slide>
            }
            {children}
            <Section fullWidth className={classes.footer}>
                <Grid container justify="center">
                    <Grid item xs={6} lg={3}>
                        <Typography variant="h4" component="div" align="center" className={classes.header}>
                            Fast &apos;n Fun
                        </Typography>
                        <Typography variant="caption" align="center" component="div">
                            Built by&nbsp;
                            <TypographyLink
                                variant="inherit" color="primary"
                                href="https://www.danstarner.com" target="_blank" rel="noreferrer"
                            >
                                Dan
                            </TypographyLink>
                        </Typography>
                    </Grid>
                </Grid>
            </Section>
        </>
    );
}

export default PageFrame;