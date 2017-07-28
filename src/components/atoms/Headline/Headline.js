import React from 'react';
import PropTypes from 'prop-types';
import defaultTheme from '../../../constants/themes/defaultTheme';
import injectSheet from 'react-jss';

const styles = {
  atom_headline: {
    'font-size': '1.5em',
    'text-align': 'center',
    color: props => (props.primary ? defaultTheme.colors.primary : defaultTheme.colors.default),
  },
};

const Headline = props =>
  <h1 className={props.classes.atom_headline}>
    {props.children}
  </h1>;

Headline.propTypes = {
  /** the headline text */
  children: PropTypes.string.isRequired,
  primary: PropTypes.bool,
};

Headline.defaultProps = {
  /** the headline text */
  primary: false,
};

export default injectSheet(styles)(Headline);
