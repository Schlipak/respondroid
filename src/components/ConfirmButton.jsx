import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

class ConfirmButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
    };

  }
  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false });

  confirm = () => {
    this._hideDialog();
    this.props.onConfirm();
  };

  cancel = () => {
    this.props.onCancel();
    this._hideDialog();
  };

  render() {
    const { color, mode } = this.props;
    return (
      <View>
        <Button onPress={this._showDialog} mode={mode || 'contained'} color={color}>{this.props.label}</Button>
        <Portal>
          <Dialog
            visible={this.state.visible}
            onDismiss={this.cancel}>
            <Dialog.Title>{this.props.title}</Dialog.Title>
            <Dialog.Content>
              {this.props.content}
            </Dialog.Content>
            <Dialog.Actions>
              <Button style={{ marginRight: 10 }} onPress={this.cancel} color={'orange'} mode={'outlined'}>Cancel</Button>
              <Button onPress={this.confirm} mode={'contained'}>Confirm</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }
}

export default ConfirmButton
