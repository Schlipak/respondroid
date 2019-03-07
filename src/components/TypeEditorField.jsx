import React, { Component } from 'react';
import PropType from 'prop-types';
import {
  StyleSheet,
  KeyboardAvoidingView, View, ScrollView, Picker, TouchableOpacity,
} from 'react-native';
import {
  Title, Text, Button, TextInput, Headline, Divider, Subheading, IconButton,
} from 'react-native-paper';
import Container from '../components/Container';
import FIELD_TYPES from '../constants/fieldTypes';

class TypeEditorField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: props.collapsed,
    }
  }

  renderCollapsed() {
    const { field, changeAttr, category, index } = this.props;
    return (
      <TouchableOpacity style={{ marginBottom: 4, padding: 12, backgroundColor: 'white', borderWidth: 1, borderColor: 'black', borderRadius: 5 }}
            onPress={() => {
              this.setState({
                collapsed: false,
              });
            }}
      >
        <Container>
            <Text style={{ color: '#4CAE50' }}>{field.type}</Text>
            <Text style={{ color: '#374046' }}>{field.name}</Text>
        </Container>
      </TouchableOpacity>
    )
  }

  render() {
    const { collapsed } = this.state;
    if (collapsed) {
      return this.renderCollapsed();
    }
    const { field, changeAttr, category, index } = this.props;
    return (
      <View style={{ marginBottom: 4, padding: 12, backgroundColor: 'white', borderWidth: 1, borderColor: 'black', borderRadius: 5 }}>
        <Container>
        <TextInput
          style={{ flex: 1 }}
          value={field.name}
          onChangeText={(text) => {
            this.props.changeAttr(category, index, 'name', text);
          }}
          mode={'outlined'}
          label={'Field Name'}
        />
          <IconButton
            mode={'outlined'}
            icon={'close'}
            onPress={() => {
              this.setState({
                collapsed: true,
              });
            }}/>
        </Container>
        <TextInput
          value={field.description}
          onChangeText={(text) => {
            this.props.changeAttr(category, index, 'description', text);
          }}
          mode={'outlined'}
          label={'Field description'}
        />
        <Container>
          <Subheading>
            Type
          </Subheading>
          <Picker
            selectedValue={field.type || FIELD_TYPES.TEXT}
            style={{
              flex: 1,
            }}
            onValueChange={(itemValue, itemIndex) => {
              this.props.changeAttr(category, index, 'type', itemValue);
            }}
            mode={'dialog'}
          >
            {
              Object.keys(FIELD_TYPES).map(key => {
                return <Picker.Item label={FIELD_TYPES[key]}
                                    value={FIELD_TYPES[key]}/>
              })
            }
          </Picker>
          {
            Object.keys(field).includes('_remove') &&
            field['_remove'] === true &&
            <Button icon={'check'} color={'#039be5'} mode={'outlined'}
                    onPress={() => {
                      this.props.changeAttr(category, index, '_remove', false);
                    }}>
              Keep
            </Button>
          }
          {
            ((Object.keys(field).includes('_remove') && field['_remove'] ===
              false)
              || !Object.keys(field).includes('_remove'))
            && <Button icon={'delete'} color={'crimson'} mode={'outlined'}
                       onPress={() => {
                         this.props.changeAttr(category, index, '_remove',
                           true);
                       }}>
              Remove
            </Button>
          }
        </Container>
      </View>
    )
  }
}

export default TypeEditorField;
