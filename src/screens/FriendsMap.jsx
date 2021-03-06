import React, { Component } from 'react';
import PropType from 'prop-types';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Button, Title, Text,
} from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { Location } from 'expo';
import colors from '../constants/colors';
import Container from '../components/Container';
import LoaderPlaceholder from '../components/LoaderPlaceholder';

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 30,
  },
  headline: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  mapWidget: {
    backgroundColor: colors.grey.light,
    height: 300,
    width: '100%',
  },
  mapWidgetMessage: {
    textAlign: 'center',
    lineHeight: 300,
  },
});

const someNames = [
  'Kipling Humphry',
  'Rowley Levi',
  'Astor George',
  'Rastus Clayton',
  'Edgar Ezra ',
  'Clayton Hoyt',
  'Woody Braith',
  'Mortimer Jackson',
  'Camron Driskoll',
  'Boyd Millard ',
  'Valentine Garnett',
  'Rickey Davin',
  'Scottie Clayton',
  'Arron Dex',
  'Blaine Tye',
];

class PreferencesScreen extends Component {
  static propTypes = {
    navigation: PropType.objectOf(PropType.any).isRequired,
  };

  constructor() {
    super();
    this.state = {
      position: null,
      loadingPosition: false,
      markers: [],
      friendDetected: null,
      friends: [],
    };
    this.positionSub = null;
  }

  componentDidMount() {
    setTimeout(async () => {
      try {
        await Location.requestPermissionsAsync();

        this.setState({ loadingPosition: true });

        const currentPos = await Location.getCurrentPositionAsync();
        this.setState({
          markers: someNames.map((name, i) => ({
            latlng: {
              latitude: currentPos.coords.latitude + 0.01 * Math.random(),
              longitude: currentPos.coords.longitude + 0.01 * Math.random(),
            },
            friend: { name, id: i },
          })),
        });

        this.positionSub = await Location.watchPositionAsync({
          timeInterval: 3000,
          distanceInterval: 30,
        }, position => this.setState({ position }));
        return undefined;
      } catch (err) {
        return err;
      }
    }, 0);
  }

  componentWillUnmount() {
    if (this.positionSub) { this.positionSub.remove(); }
  }

  addDetectedFriend(friend) {
    this.setState(prev => ({
      markers: [...prev.markers.filter(marker => marker.friend.id !== friend.id)],
      friends: [...prev.friends, friend],
      friendDetected: null,
    }));
  }

  render() {
    const {
      friends, friendDetected, loadingPosition, position, markers,
    } = this.state;
    let content;
    if (position) {
      content = (
        <MapView
          {...StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {markers.map(marker => (
            <Marker
              key={marker.friend.id}
              coordinate={marker.latlng}
              title={marker.friend.name}
              onPress={() => this.setState({ friendDetected: marker })}
            />
          ))}
        </MapView>
      );
    } else if (loadingPosition) {
      content = <LoaderPlaceholder />;
    } else {
      content = (
        <Text style={styles.mapWidgetMessage}>
            You need to turn on geolocation to use this feature
        </Text>
      );
    }
    return (
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <Title style={styles.headline}>Friends map</Title>
        <Container style={styles.mapWidget}>
          {content}
        </Container>
        {friendDetected
        && (
        <>
          <Title style={styles.headline}>Friend detected</Title>
          <Container style={styles.content}>
            <Text>{friendDetected.friend.name}</Text>
            <Button onPress={() => this.addDetectedFriend(friendDetected.friend)} mode="outlined">
              Add friend
            </Button>
          </Container>
        </>
        )
        }

        <>
          <Title style={styles.headline}>Current friends</Title>
          <View style={styles.content}>
            {friends.map(friend => (<Text key={friend.id}>{friend.name}</Text>))}
          </View>
        </>

      </KeyboardAvoidingView>
    );
  }
}

export default PreferencesScreen;
