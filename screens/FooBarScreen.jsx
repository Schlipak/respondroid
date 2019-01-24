import React, { Component } from 'react';
import {
  StyleSheet, Text, ScrollView, View, RefreshControl,
} from 'react-native';
import { Button, Divider, Switch } from 'react-native-paper';

import { standardColors, palette } from '../constants/colors';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingTop: 10,
    width: '100%',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
  },
  button: {
    width: '45%',
  },
});

export default class FooBarScreen extends Component {
  constructor() {
    super();

    this.state = { isContained: false, refreshing: false };
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 8000);
  };

  render() {
    const { isContained, refreshing } = this.state;

    return (
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.onRefresh}
            colors={Object.values(standardColors).map(value => value.light)}
            tintColor={palette.accent}
            title="Test reload"
          />
        )}
      >
        <View style={styles.content}>
          <Text>Lorem ipsum dolor sit amet consectetur adipisicing.</Text>
          <View style={styles.switchContainer}>
            <Text>{isContained ? 'Contained' : 'Outlined'}</Text>
            <Switch
              value={isContained}
              onValueChange={() => this.setState({ isContained: !isContained })}
            />
          </View>
          <Divider style={styles.divider} />
          <View style={styles.buttonsContainer}>
            {Object.keys(standardColors).map((key) => {
              const color = standardColors[key].light;

              return (
                <View key={key} style={styles.buttonsRow}>
                  <Button
                    mode={isContained ? 'contained' : 'outlined'}
                    style={styles.button}
                    color={color}
                    onPress={() => console.log(`Pressed button ${key}`)}
                  >
                    {key}
                  </Button>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    );
  }
}
