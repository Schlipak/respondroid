import React, { Component } from 'react';
import PropType from 'prop-types';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {
  Headline, TextInput, Button, HelperText, Title, Text,
} from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { Location } from 'expo';
import Table from '../middlewares/Api/Table';
import Container from '../components/Container';
import LoaderPlaceholder from '../components/LoaderPlaceholder';

const styles = StyleSheet.create({
  content: {},
  headline: {
    marginBottom: 5,
  },
  mapWidget: {
    height: 300,
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 30,
  },
  loginButton: {
    marginTop: 8,
  },
});

const someNames = [
  "Kipling Humphry",
  "Rowley Levi",
  "Astor George",
  "Rastus Clayton",
  "Edgar Ezra ",
  "Clayton Hoyt",
  "Woody Braith",
  "Mortimer Jackson",
  "Camron Driskoll",
  "Boyd Millard ",
  "Valentine Garnett",
  "Rickey Davin",
  "Scottie Clayton",
  "Arron Dex",
  "Blaine Tye",
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
        this.setState({ markers: someNames.map((name, i) => ({
          latlng: {
            latitude: currentPos.coords.latitude + 0.01 * Math.random(),
            longitude: currentPos.coords.longitude + 0.01 * Math.random(),
          },
          friend: { name, id: i },
        }))});

        this.positionSub = await Location.watchPositionAsync({
          timeInterval: 3000,
          distanceInterval: 30,
        }, position => this.setState({ position }));
      }
      catch (err) {
        console.error(err);
      }
    }, 0);
  }

  componentWillUnmount() {
    this.positionSub && this.positionSub.remove();
  }

  addDetectedFriend(friend) {
    this.setState({
      markers: [ ...this.state.markers.filter(marker => marker.friend.id != friend.id)],
      friends: [ ...this.state.friends, friend ],
      friendDetected: null,
    });
  }

  render() {
    const friendDetected = this.state.friendDetected;
    return (
      <KeyboardAvoidingView style={styles.content} behavior="padding">

      <Title style={styles.headline}>Friend map</Title>

      <Container style={styles.mapWidget}>
        {this.state.position
          ? <MapView
            style={styles.mapWidget}
            initialRegion={{
              latitude: this.state.position.coords.latitude,
              longitude: this.state.position.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            {...StyleSheet.absoluteFillObject}
          >
            {this.state.markers.map(marker => (
              <Marker
                key={marker.friend.id}
                coordinate={marker.latlng}
                title={marker.friend.name}
                onPress={e => this.setState({ friendDetected: marker })}
              />
            ))}
          </MapView>
        : this.state.loadingPosition
          ? <LoaderPlaceholder />
          : <Text style={styles.mapWidget} >You need to turn on geolocation to use this feature</Text>}
      </Container>

      {friendDetected &&
        <View style={styles.inputContainer}>
          <Title>Friend detected</Title>
          <Text>{friendDetected.friend.name}</Text>
          <Button onPress={() => this.addDetectedFriend(friendDetected.friend)} mode={'outlined'}>
            Add friend
          </Button>
        </View>
      }

      <View style={styles.inputContainer}>
        <Title>Current friends</Title>
        {this.state.friends.map(friend =>
          (<Text key={friend.id} >{friend.name}</Text>)
        )}
      </View>

      </KeyboardAvoidingView>
    );
  }
}

export default PreferencesScreen;
