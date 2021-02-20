import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, useMediaQuery } from '@material-ui/core';

import { SectionHeader } from 'src/components/molecules';

const useStyles = makeStyles(theme => ({
  contentSection: {
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(8),
    },
  },
  pagePaddingTop: {
    paddingTop: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
    },
  },
}));

const SectionBlock = ({
  id,
  title,
  subtitle,
  children,
  label,
  className,
  first = false,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div
      id={id}
      className={clsx(classes.contentSection, className, {
        [classes.pagePaddingTop]: first,
      })}
    >
      <SectionHeader
        label={label}
        title={title}
        subtitle={subtitle}
        align={isMd ? 'center' : 'left'}
        data-aos="fade-up"
      />
      <Typography align={isMd ? 'justify' : 'left'}>{children}</Typography>
    </div>
  );
};

export default SectionBlock;
