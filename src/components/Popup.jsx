import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Dialog, Portal, Text, Title,
} from 'react-native-paper';
import { selectPopup, setPopupInfo } from '../ducks/popup';
import Container from './Container';

const dispatcher = dispatch => ({
  setPopupInfo: (key, value) => dispatch(setPopupInfo(key, value)),
});

const extractor = state => ({
  popup: selectPopup(state),
});

class Popup extends Component {
  _hideModal = () => {
    this.props.setPopupInfo('isOpen', false);
  };

  confirm = () => {
    this.props.onConfirm();
    this._hideModal();
  };

  render() {
    const { popup } = this.props;
    const { isOpen, title, text } = popup;
    if (!isOpen) {
      return <Text>{JSON.stringify(popup)}</Text>;
    }
    return (
      <Portal>
        <Dialog visible={isOpen} onDismiss={this._hideModal} dismissable>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Text>
              {text}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button style={{ marginRight: 10 }} onPress={this._hideModal()} color={'orange'} mode={'outlined'}>Cancel</Button>
            <Button onPress={this.confirm} mode={'contained'}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}

const ConnectedPopup = connect(extractor, dispatcher)(Popup);
export default ConnectedPopup;
