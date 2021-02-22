import clsx from "clsx";
import moment from "moment";
import { useState } from "react";
import {
    Box, Paper, Tab, Table, TableCell, TableHead, TableRow, Tabs, Tooltip, makeStyles, TableBody,
} from "@material-ui/core";
import { SectionHeader } from "src/components/molecules";
import { Section } from "src/components/organisms";
import { useBreakpoint } from "src/hooks";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    futureRace: {
        backgroundColor: theme.palette.grey[900],
    },
}));

function lapsTooltip(session) {
    return (
        <>
            {session.practice && <><strong>Practice</strong>: {session.practice} minutes<br/></>}
            {session.qual && <><strong>Qualify</strong>: {session.qual} laps<br/></>}
            {session.race && <><strong>Race</strong>: {session.race} laps<br/></>}
        </>
    )
}

function Seasons({ seasons }) {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const hideLaps = useBreakpoint("sm", "down", true);

    const cells = [
        { label: "Date", key: "date", format: (val) => {
            const m = moment(val);
            let format = "MMM Do";
            if (m.year() !== moment().year()) {
                format += ", YYYY"
            }
            return m.format(format);
        }},
        { label: "Time (EST)", key: "time" },
        { label: "Track", key: "track", tooltip: hideLaps ? lapsTooltip : undefined },
        !hideLaps && { label: "Laps", key: "race", tooltip: lapsTooltip },
    ].filter(v => Boolean(v));


    return (
        <Section>
            <SectionHeader
                title="Schedule"
                subtitle="Check out our past and upcoming races for the series"
            />
            <Paper>
                <Tabs value={value} onChange={handleChange} centered>
                    {seasons.map((season, idx) => (
                        <Tab key={season.id} label={season.name} value={idx}/>
                    ))}
                </Tabs>
                {
                    seasons.map((season, idx) => (
                        <TabPanel value={value} index={idx} key={idx}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {cells.map(cell => (
                                            <TableCell key={cell.key}>{cell.label}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        season.sessions.map((session, idx) => {
                                            const futureRace = moment(session.date) > moment();
                                            return (
                                                <Tooltip key={idx} title={!futureRace ? "This race already occurred" : ""}>
                                                    <TableRow className={clsx({
                                                        [classes.futureRace]: futureRace,
                                                    })}>
                                                        {cells.map(cell => (
                                                            <Tooltip key={cell.key} placement="left" title={cell.tooltip ? cell.tooltip(session) : ""}>
                                                                <TableCell>
                                                                    {cell.format ? cell.format(session[cell.key]) : session[cell.key]}
                                                                </TableCell>
                                                            </Tooltip>
                                                        ))}
                                                    </TableRow>
                                                </Tooltip>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TabPanel>
                    ))
                }
            </Paper>
        </Section>
    );
}

export default Seasons;