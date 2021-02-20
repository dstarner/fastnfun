import React from 'react';
import { Typography } from '@material-ui/core';

const Callout = ({ text, children }) => (
  <Typography component="span" variant="inherit" color="secondary">
    {text || children}
  </Typography>
);

export default Callout;
