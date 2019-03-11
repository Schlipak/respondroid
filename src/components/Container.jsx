import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: (options, column) => ({
    width: '100%',
    display: 'flex',
    flexDirection: column ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...options,
  }),
});

const Container = (props) => {
  const { style, column, children } = props;
  return (
    <View style={styles.container(style, column)}>
      {children}
    </View>
  );
};

Container.propTypes = {
  style: PropTypes.objectOf(PropTypes.any),
  column: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

Container.defaultProps = {
  style: {},
  column: false,
};

export default Container;
