import { makeStyles } from "@material-ui/core";
import { HeroBackground } from ".";
import { SectionHeader } from "../molecules";


const useStyles = makeStyles(theme => ({
    title: {
        ...theme.typography.headerItalic,
    },
}));


function CompleteHeroBackground({ title, subtitle, backgroundImg, backgroundColor="rgba(0,0,0,.8)", height="45vh" }) {
    const classes = useStyles();

    return (
        <HeroBackground style={{ minHeight: height }} backgroundColor={backgroundColor} backgroundImg={backgroundImg}>
            <SectionHeader
                title={title}
                titleProps={{
                    variant: "h2",
                    className: classes.title
                }}
                subtitle={subtitle}
            />
        </HeroBackground>
    );
}

export default CompleteHeroBackground;