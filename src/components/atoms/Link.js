/* eslint-disable react/display-name, react/prop-types */
import React, { forwardRef } from 'react';
import NLink from 'next/link';
import {
  Button,
  GridListTile as MGridListTile,
  ListItem as MListItem,
  MenuItem as MMenuItem,
  Typography,
} from '@material-ui/core';
import MLink from '@material-ui/core/Link';

export const ButtonLink = forwardRef(
  ({ href, prefetch, children, ...props }, ref) => (
    <NLink href={href} prefetch={prefetch} passHref>
      <Button ref={ref} {...props}>
        {children}
      </Button>
    </NLink>
  ),
);

export const GridListTileLink = forwardRef(
  ({ href, prefetch, style, children, ...props }, ref) => (
    <NLink href={href} prefetch={prefetch} passHref>
      <MGridListTile ref={ref} style={{ ...(style ? style : {}), cursor: "pointer", }} {...props}>
        {children}
      </MGridListTile>
    </NLink>
  ),
);

export const Link = forwardRef(
  ({ href, prefetch, children, ...props }, ref) => (
    <NLink href={href} prefetch={prefetch} passHref>
      <MLink ref={ref} {...props}>
        {children}
      </MLink>
    </NLink>
  ),
);

export const TypographyLink = forwardRef(
  ({ href, prefetch, children, ...props }, ref) => (
    <NLink href={href} prefetch={prefetch} passHref>
      <Typography color="primary" style={{ textDecoration: "none" }} {...props} component="a" ref={ref}>
        {children}
      </Typography>
    </NLink>
  ),
);

export const ListItemLink = forwardRef(
  ({ href, prefetch, children, ...props }, ref) => (
    <NLink href={href} prefetch={prefetch} passHref>
      <MListItem
        {...props}
        component="a"
        ref={ref}
        style={{ color: 'inherit' }}
      >
        {children}
      </MListItem>
    </NLink>
  ),
);

export const MenuItemLink = forwardRef(
  ({ href, prefetch, children, ...props }, ref) => (
    <NLink href={href} prefetch={prefetch} passHref>
      <MMenuItem
        {...props}
        component="a"
        ref={ref}
        style={{ color: 'inherit' }}
      >
        {children}
      </MMenuItem>
    </NLink>
  ),
);

export default Link;
