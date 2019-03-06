import React, { Component } from 'react';
import PropType from 'prop-types';
import { View } from 'react-native';

class Container extends Component {
  render() {
    const { style } = this.props;
    const { column } = this.props;
    return (
      <View style={{
        width: '100%',
        display: 'flex',
        flexDirection: column ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...style,
      }}>
        {this.props.children}
      </View>
    )
  }
}

export default Container;
