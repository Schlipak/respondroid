import React, { Component } from 'react';
import {
  RefreshControl, StyleSheet, View, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { List, Text, TouchableRipple } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';

import { standardColors, palette } from '../constants/colors';
import theme from '../constants/theme';

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: standardColors.white.light,
  },
  listButtons: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: standardColors.white.accent,
  },
  listButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listBlock: dir => ({
    flexDirection: 'row',
    height: '100%',
    justifyContent: dir === 'left' ? 'flex-start' : 'flex-end',
    alignItems: 'center',
  }),
});

export default class SwipableItemList extends Component {
  static propTypes = {
    list: PropTypes.objectOf(PropTypes.any).isRequired,
    parser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super();
    this.width = Dimensions.get('window').width;
    const { list, parser } = props;
    const items = list.map(parser);
    this.state = {
      height: 0,
      refreshing: false,
      items,
    };
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({
        refreshing: false,
      });
    }, 2000);
  };

  onSwipeValueChange = (data) => {
    const {
      height, rightSwipe, leftSwipe, items,
    } = this.state;
    const { key, value } = data;
    const item = items[key];
    const { onSwipeRight, onSwipeLeft } = item;
    if (rightSwipe && value <= height) {
      return this.resetSwipe('right');
    }
    if (leftSwipe && value > -height) {
      return this.resetSwipe('left');
    }
    if (value < -(height * 2) && !leftSwipe) {
      // Dragging item to the left
      this.setState({
        leftSwipe: true,
      });
      // Add callback from redux props, on swipe left
      if (onSwipeLeft) {
        onSwipeLeft(item);
      }
    } else if (value > height * 2 && !rightSwipe) {
      // Dragging item to the right
      this.setState({
        rightSwipe: true,
      });
      // Add callback from redux props, on swipe right
      if (onSwipeRight) {
        onSwipeRight(item);
      }
    }
    return undefined;
  };

  resetSwipe = (direction) => {
    this.setState({
      [`${direction}Swipe`]: false,
    });
  };

  renderItem(rowData) {
    const { item, onPress } = rowData;
    const {
      onClickLeft, onSwipeLeft, onClickRight, onSwipeRight,
    } = item;

    const borderLeft = onClickLeft || onSwipeLeft ? {
      borderLeftWidth: 1.5,
      borderLeftColor: item.leftLabel.bg,
    } : {};

    const borderRight = onClickRight || onSwipeRight ? {
      borderRightWidth: 1.5,
      borderRightColor: item.rightLabel.bg,
    } : {};
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
          title={item.title}
          description={item.description}
          onPress={() => onPress(item.ref)}
          style={{
            ...styles.listItem,
            ...borderLeft,
            ...borderRight,
          }}
        />
      </View>
    );
  }

  renderHiddenItem(rowData, rowMap) {
    const {
      height: width,
    } = this.state;
    const { item } = rowData;
    const { key } = item;
    const {
      onClickLeft, onSwipeLeft, onClickRight, onSwipeRight,
    } = item;
    return (
      <View style={[styles.listButtons]}>
        <View style={[styles.listBlock('left')]}>
          {
            onClickLeft && (
              <TouchableRipple
                onPress={() => {
                  rowMap[key].closeRow();
                  // Add callback from redux props, on click left icon
                  onClickLeft(item);
                }}
                style={[
                  styles.listButton,
                  {
                    backgroundColor: item.leftLabel.bg,
                    width,
                  },
                ]}
                rippleColor={theme.colors.overlay.light}
              >
                <View>
                  <Text style={{ color: item.leftLabel.color }}>
                    {item.leftLabel.text}
                  </Text>
                </View>
              </TouchableRipple>
            )
          }
          {
            onSwipeRight && (
              <TouchableRipple
                onPress={() => {
                  rowMap[key].closeRow();
                  // Add callback from redux props, on click left icon
                  onClickLeft(item);
                }}
                style={[
                  styles.listButton,
                  {
                    backgroundColor: item.swipeRightLabel.bg,
                    width,
                  },
                ]}
                rippleColor={theme.colors.overlay.light}
              >
                <View>
                  <Text style={{ color: item.swipeRightLabel.color }}>
                    {item.swipeRightLabel.text}
                  </Text>
                </View>
              </TouchableRipple>
            )
          }
        </View>
        <View style={[styles.listBlock('right')]}>
          {
            onSwipeLeft && (
              <TouchableRipple
                style={[
                  styles.listButton,
                  {
                    backgroundColor: item.swipeLeftLabel.bg,
                    width,
                  },
                ]}
                rippleColor={theme.colors.overlay.light}
              >
                <View>
                  <Text style={{ color: item.swipeLeftLabel.color }}>
                    {item.swipeLeftLabel.text}
                  </Text>
                </View>
              </TouchableRipple>
            )
          }
          {
            onClickRight && (
              <TouchableRipple
                onPress={() => {
                  rowMap[key].closeRow();
                  onClickRight(item);
                }}
                style={[
                  styles.listButton,
                  {
                    backgroundColor: item.rightLabel.bg,
                    width,
                  },
                ]}
                rippleColor={theme.colors.overlay.light}
              >
                <View>
                  <Text style={{ color: item.rightLabel.color }}>
                    {item.rightLabel.text}
                  </Text>
                </View>
              </TouchableRipple>
            )
          }
        </View>
      </View>
    );
  }

  render() {
    const {
      height, refreshing, items,
    } = this.state;
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
        onRowClose={() => { this.resetSwipe(); }}
        leftOpenValue={height}
        rightOpenValue={-height}
        closeOnRowBeginSwipe
        useFlatList
        onSwipeValueChange={this.onSwipeValueChange}
      />
    );
  }
}
