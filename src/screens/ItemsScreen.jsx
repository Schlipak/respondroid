import React, { Component } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { List, TouchableRipple } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { standardColors, palette } from '../constants/colors';
import theme from '../constants/theme';

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: standardColors.white.light,
  },
  listItemIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listButtons: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: standardColors.white.accent,
  },
  listButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const DEMO_ITEM_COUNT = 16;

export default class ItemsScreen extends Component {
  constructor() {
    super();

    this.state = {
      height: 0,
      refreshing: false,
      items: Array(DEMO_ITEM_COUNT)
        .fill(0)
        .map((_, index) => ({ index, key: `${index}`, done: false })),
    };
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({
        refreshing: false,
        items: Array(DEMO_ITEM_COUNT)
          .fill(0)
          .map((_, index) => ({ index, key: `${index}`, done: false })),
      });
    }, 2000);
  };

  renderItem(rowData) {
    const { index, item } = rowData;
    const { done } = item;

    return (
      <View
        onLayout={(event) => {
          const { height } = this.state;
          const layoutHeight = event.nativeEvent.layout.height;

          if (height !== layoutHeight) {
            this.setState({ height: layoutHeight });
          }
        }}
      >
        <List.Item
          title={`Item ${index + 1}`}
          description="Item description"
          left={() => (
            <View style={styles.listItemIcon}>
              <MaterialCommunityIcons
                size={24}
                name={done ? 'check-circle-outline' : 'close-circle-outline'}
                color={done ? standardColors.green.light : standardColors.black.light}
              />
            </View>
          )}
          onPress={() => console.log('Press item')}
          style={styles.listItem}
        />
      </View>
    );
  }

  renderHiddenItem(rowData, rowMap) {
    const { items, height: width } = this.state;
    const { item } = rowData;
    const { index, key, done } = item;

    return (
      <View style={[styles.listButtons]}>
        <TouchableRipple
          onPress={() => {
            rowMap[key].closeRow();

            setTimeout(() => {
              items[index].done = !done;
              this.setState({ items });
            }, 500);
          }}
          style={[
            styles.listButton,
            {
              backgroundColor: done ? standardColors.red.light : standardColors.green.light,
              width,
            },
          ]}
          rippleColor={theme.colors.overlay.light}
        >
          <MaterialCommunityIcons
            size={24}
            color={standardColors.white.light}
            name={done ? 'close' : 'check'}
          />
        </TouchableRipple>
      </View>
    );
  }

  render() {
    const { items, height, refreshing } = this.state;

    return (
      <SwipeListView
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.onRefresh}
            colors={Object.values(standardColors).map(value => value.light)}
            tintColor={palette.accent}
            title="Refresh list"
          />
        )}
        data={items}
        renderItem={rowData => this.renderItem(rowData)}
        renderHiddenItem={(rowData, rowMap) => this.renderHiddenItem(rowData, rowMap)}
        leftOpenValue={height}
        closeOnRowBeginSwipe
        disableLeftSwipe
        useFlatList
      />
    );
  }
}
