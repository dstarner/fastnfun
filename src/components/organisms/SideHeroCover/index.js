import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { HeroBackground, Section } from 'src/components/organisms';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    minHeight: '70vh',
    width: '100%',
    position: 'relative',
  },
  section: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0,
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  },
  cover: {
    marginLeft: theme.spacing(-2),
    marginRight: theme.spacing(-2),
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    backgroundColor: ({ backgroundColor }) => backgroundColor,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '30%',
      maxWidth: 400,
      height: '100%',
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  coverContent: {
    [theme.breakpoints.up('md')]: {
      position: 'sticky',
      top: '50%',
      transform: 'translateY(-50%)',
      padding: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      '& img': {
        display: 'none',
      },
    },
  },
  content: {
    flex: '0 0 100%',
    maxWidth: '100%',
    [theme.breakpoints.up('md')]: {
      flex: '0 0 70%',
      maxWidth: '70%',
    },
  },
  pagePaddingTop: {
    paddingTop: 0,
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
    },
  },
}));

const SideHeroCover = ({
  sideContent,
  backgroundImg,
  backgroundColor,
  children,
  ...heroProps
}) => {
  const classes = useStyles({ backgroundColor });

  return (
    <div className={classes.root}>
      <Section className={clsx(classes.pagePaddingTop, classes.section)}>
        <div className={classes.wrapper}>
          <HeroBackground
            backgroundImg={backgroundImg}
            className={classes.cover}
            wrapperClassName={classes.coverContent}
          >
            {sideContent}
          </HeroBackground>
          <div className={classes.content}>{children}</div>
        </div>
      </Section>
      <Divider />
    </div>
  );
};

export default SideHeroCover;
