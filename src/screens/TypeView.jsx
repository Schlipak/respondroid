import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import {
  StyleSheet, View, KeyboardAvoidingView,
} from 'react-native';
import {
  Button, Text, Title, Subheading,
} from 'react-native-paper';
import { selectApi } from '../ducks/api';
import { selectMenu, setMenu } from '../ducks/menu';
import Container from '../components/Container';
import { reset } from '../ducks/editor';

const crimson = 'crimson';

const styles = StyleSheet.create({
  content: {
    padding: 4,
  },
  headline: {
    marginBottom: 5,
  },
  displayFieldsRoot: bg => ({ padding: 8, backgroundColor: bg }),
  displayFieldsHead: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },

});

const extractor = state => ({
  api: selectApi(state),
  menu: selectMenu(state),
});

const dispatcher = dispatch => ({
  doSetMenu: (key, value) => dispatch(setMenu(key, value)),
  resetEditor: () => dispatch(reset()),
});

class TypeView extends Component {
  static propTypes = {
    navigation: PropType.objectOf(PropType.any).isRequired,
    doSetMenu: PropType.func.isRequired,
    menu: PropType.objectOf(PropType.any).isRequired,
    resetEditor: PropType.func.isRequired,
  };

  constructor() {
    super();
    this.state = {};
  }

  goTo = (screen, type) => {
    const { navigation, doSetMenu } = this.props;
    doSetMenu('title', `${type.fields.Name} Editor`);
    navigation.navigate(screen);
  };

  displayFields = (fields, bg = 'aliceblue') => fields.map(field => (
    <View style={styles.displayFieldsRoot(bg)}>
      <View style={styles.displayFieldsHead}>
        <Subheading>
          {field.name}
        </Subheading>
        <Text>
          {field.type}
        </Text>
      </View>
      <Text>
        {field.description || 'No description available'}
      </Text>
    </View>
  ));

  displayMethods = (methods, bg = 'lightgreen') => methods.map(method => (
    <View style={styles.displayFieldsRoot(bg)}>
      <View style={styles.displayFieldsHead}>
        <Subheading>
          {method.name}
        </Subheading>
        <Text>
          {method.prototype}
        </Text>
      </View>
      <Text>
        {method.description || 'No description available'}
      </Text>
    </View>
  ));

  render() {
    const { menu } = this.props;
    const { type } = menu;
    if (!type || !type.fields || !type.fields.Fields) {
      return <View><Text>ERROR: No type provided</Text></View>;
    }
    const {
      editable, locked, classMethods, methods,
    } = type.fields.Fields;
    return (
      <KeyboardAvoidingView style={styles.content} behavior="padding">
        <Container>
          <Title style={styles.headline}>Description</Title>
          <Button
            mode="contained"
            onPress={() => {
              const { resetEditor } = this.props;
              resetEditor();
              this.goTo('TypeEditor', type);
            }}
          >
            Edit
          </Button>
        </Container>
        <Subheading>
          {type.fields.Description}
        </Subheading>
        <View>
          <Text>
            Editable fields
          </Text>
          {editable && this.displayFields(editable)}
        </View>
        <View>
          <Text style={{ color: crimson }}>
            Locked fields
          </Text>
          {locked && this.displayFields(locked)}
        </View>
        <View>
          <Text>
            Class Methods
          </Text>
          {
            (classMethods && classMethods.length > 0
              && this.displayMethods(classMethods)) || <Text>No class methods found</Text>
          }
        </View>
        <View>
          <Text>
            Instance methods
          </Text>
          {
            (methods && methods.length > 0
              && this.displayMethods(methods)) || <Text>No methods found</Text>
          }
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const ConnectedTypeView = connect(extractor, dispatcher)(TypeView);
export default ConnectedTypeView;
