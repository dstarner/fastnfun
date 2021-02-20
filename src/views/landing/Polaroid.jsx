import clsx from "clsx";
import {
    makeStyles
} from "@material-ui/core";

const sp = 2.5;

const useStyles = makeStyles(theme => ({
    root: {
        background: "#ffffff",
        display: "inline-block",
        padding: `${theme.spacing(sp)}px ${theme.spacing(sp)}px ${theme.spacing(sp * 2)}px`,
        textAlign: "center",
        textDecoration: "none",
        "-webkit-box-shadow": "0 4px 6px rgba(0, 0, 0, .3)",
        "-moz-box-shadow": "0 4px 6px rgba(0, 0, 0, .3)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, .3)",
        "-webkit-transition": "all .20s linear",
        "-moz-transition": "all .20s linear",
        transition: "all .20s linear",
        zIndex: 0,
        position: "relative",
        "-webkit-transform": ({ invertSrc }) => `rotate(${invertSrc ? "-" : ""}2deg)`,
        "-moz-transform": "rotate(-2deg)",
        "&:after": {
            color: "#333",
            fontSize: theme.typography.h6.fontSize,
            content: ({ text }) => `'${text}'`,
            position: "relative",
            top: 15,
        },
        "&:hover": {
            "-webkit-transform": "scale(1.2)",
            "-moz-transform": "scale(1.2)",
            transform: "scale(1.2)",
            zIndex: 10,
            "-webkit-box-shadow": "0 10px 20px rgba(0, 0, 0, .7)",
            "-moz-box-shadow": "0 10px 20px rgba(0, 0, 0, .7)",
            boxShadow: "0 10px 20px rgba(0, 0, 0, .7)",
        },
    },
    image: {
        display: "block",
        maxWidth: "100%",
        width: "100%",
        maxHeight: `calc(100% - ${theme.spacing(sp)}px)`,
    },
}));


function Polaroid({ src, text, invertSrc=false, className }) {
    const classes = useStyles({ text, invertSrc });

    return (
        <div className={clsx(classes.root, className)}>
            <img className={classes.image} src={src} alt={text} title={text} />
        </div>
    );
}

export default Polaroid;