import React, { Component } from 'react';
import PropType from 'prop-types';
import {
  View, Picker, TouchableOpacity, StyleSheet,
} from 'react-native';
import {
  Text, Button, TextInput, Subheading, IconButton,
} from 'react-native-paper';
import Container from './Container';
import FIELD_TYPES from '../constants/fieldTypes';

const white = 'white';
const black = 'black';
const green = '#4CAE50';
const grey = '#374046';

const styles = StyleSheet.create({
  touch: {
    marginBottom: 4,
    padding: 12,
    backgroundColor: white,
    borderWidth: 1,
    borderColor: black,
    borderRadius: 5,
  },
  color: c => ({ color: c }),
  flexGrow: { flex: 1 },
});

class TypeEditorField extends Component {
  static propTypes = {
    collapsed: PropType.bool.isRequired,
    field: PropType.objectOf(Object.any).isRequired,
    category: PropType.string.isRequired,
    index: PropType.number.isRequired,
    changeAttr: PropType.func.isRequired,
  };

  constructor(props) {
    super();
    this.state = {
      collapsed: props.collapsed,
    };
  }

  renderCollapsed() {
    const { field } = this.props;
    return (
      <TouchableOpacity
        style={styles.touch}
        onPress={() => {
          this.setState({
            collapsed: false,
          });
        }}
      >
        <Container>
          <Text style={styles.color(green)}>{field.type}</Text>
          <Text style={styles.color(grey)}>{field.name}</Text>
        </Container>
      </TouchableOpacity>
    );
  }

  render() {
    const { collapsed } = this.state;
    if (collapsed) {
      return this.renderCollapsed();
    }
    const {
      field, category, index, changeAttr,
    } = this.props;
    return (
      <View style={styles.touch}>
        <Container>
          <TextInput
            style={styles.flexGrow}
            value={field.name}
            onChangeText={(text) => {
              changeAttr(category, index, 'name', text);
            }}
            mode="outlined"
            label="Field Name"
          />
          <IconButton
            mode="contained"
            icon="close"
            onPress={() => {
              this.setState({
                collapsed: true,
              });
            }}
          />
        </Container>
        <TextInput
          value={field.description}
          onChangeText={(text) => {
            changeAttr(category, index, 'description', text);
          }}
          mode="outlined"
          label="Field description"
        />
        <Container>
          <Subheading>
            Type
          </Subheading>
          <Picker
            selectedValue={field.type || FIELD_TYPES.TEXT}
            style={styles.flexGrow}
            onValueChange={(itemValue) => {
              changeAttr(category, index, 'type', itemValue);
            }}
            mode="dialog"
          >
            {
              Object.keys(FIELD_TYPES).map(key => (
                <Picker.Item
                  label={FIELD_TYPES[key]}
                  value={FIELD_TYPES[key]}
                />
              ))
            }
          </Picker>
          {
            Object.keys(field).includes('remove') && field.remove === true
            && (
              <Button
                icon="check"
                color="#039be5"
                mode="outlined"
                onPress={() => {
                  changeAttr(category, index, '_remove', false);
                }}
              >
                Keep
              </Button>
            )
          }
          {
            ((Object.keys(field).includes('remove') && field.remove
              === false)
              || !Object.keys(field).includes('remove'))
            && (
              <Button
                icon="delete"
                color="crimson"
                mode="outlined"
                onPress={() => {
                  changeAttr(category, index, '_remove',
                    true);
                }}
              >
                Remove
              </Button>
            )
          }
        </Container>
      </View>
    );
  }
}

export default TypeEditorField;
