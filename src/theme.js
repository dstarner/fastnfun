import {
    createMuiTheme,
    responsiveFontSizes
} from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#ffcd05",
        },
        secondary: {
            main: "#0b723e"
        },
        gradientBG: {
            backgroundColor: "#fbfbf8",
            background: "linear-gradient(to left,#17161a,#242124 0%, #17161a 83%)",
        },
        green: "#a0b7aa",
        offWhite: "#fefbea",
    },
    layout: {
        contentWidth: 1140,
    },
    typography: {
        fontFamily: [
            'Lato',
            'sans-serif'
        ].join(','),
        headerItalic: {
            fontFamily: '"Hauser Condensed Italic", Lato'
        },
        header: {
            fontFamily: '"Hauser", Lato',
        },
        body1: {
            fontSize: "1.2rem"
        },
    },
});

theme.palette.classes = {
    gridSectionHeader: {
        width: "80%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down('md')]: {
            width: "100%",
        },
    },
};

theme.overrides = {
    MuiCssBaseline: {
        '@global': {
            ".map-container": {
                [theme.breakpoints.up('md')]: {
                    marginTop: `-3em`, marginBottom: "3em",
                },
                height: "500px", width: "100%",
                [theme.breakpoints.down('sm')]: {
                    marginTop: `-1em`, marginBottom: "2em",
                },
            },
        },
    }
};

export default responsiveFontSizes(theme);
