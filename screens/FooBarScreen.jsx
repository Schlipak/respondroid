import React from 'react';
import {
  StyleSheet, Text, ScrollView, View,
} from 'react-native';
import { Button, Divider } from 'react-native-paper';

import { standardColors } from '../constants/colors';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 20,
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

export default () => (
  <ScrollView>
    <View style={styles.content}>
      <Text>Lorem ipsum dolor sit amet consectetur adipisicing.</Text>
      <Divider style={styles.divider} />
      <Button mode="outlined" onPress={() => console.log('Pressed')}>
        <Text>Foo Bar</Text>
      </Button>
      <View style={styles.buttonsContainer}>
        {Object.keys(standardColors).map((key) => {
          const color = standardColors[key].light;

          return (
            <View key={key} style={styles.buttonsRow}>
              <Button
                mode="contained"
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
