import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

import Link from "src/components/atoms/Link";


const useStyles = makeStyles((theme) => ({
    table: {
        width: "100%",
        border: ({bordered }) => bordered ? `medium solid ${theme.palette.divider}` : "none",
        "& tr": {
            "&:hover": {
                backgroundColor: theme.palette.grey[900],
                color: theme.palette.grey.A100,
            },
            "& td": {
                borderTop: `1px solid ${theme.palette.grey[theme.palette.type === "light" ? 400 : 700]}`,
            },
        },
        "& tr:first-child": {
            "& td": {
                borderTop: "none",
            },
        },
    },
    keyCell: {
        fontSize: "larger",
        fontWeight: "bold",
    },
}));


function DefinitionList({ definitions, bordered=false }) {
    const classes = useStyles({ bordered });

    return (
        <table className={classes.table} cellSpacing="0" cellPadding="8">
            <tbody>
                {
                    definitions.map((def, idx) => {
                        let value = <Typography>{def.value}</Typography>;
                        if (def.href) {
                            const externalProps = def.external ? { target: "_blank", rel: "noreferrer" } : {};
                            value = (
                                <Link {...externalProps} href={def.href}>
                                    {value}
                                </Link>
                            );
                        }
                        return(
                            <tr key={idx}>
                                <Typography className={classes.keyCell} component="td" variant="button">
                                    {def.key}
                                </Typography>
                                <Typography align="right" component="td">{value}</Typography>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}

DefinitionList.propTypes = {
    definitions: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
    })).isRequired,
};

export default DefinitionList;