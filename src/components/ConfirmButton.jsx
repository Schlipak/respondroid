import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';

const styles = StyleSheet.create({
  cancelButton: { marginRight: 10 },
});

class ConfirmButton extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    color: PropTypes.objectOf(PropTypes.any).isRequired,
    mode: PropTypes.objectOf(PropTypes.any).isRequired,
    content: PropTypes.objectOf(PropTypes.any).isRequired,
    label: PropTypes.objectOf(PropTypes.any).isRequired,
    title: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
    };
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  confirm = () => {
    const { onConfirm } = this.props;
    this.hideDialog();
    onConfirm();
  };

  cancel = () => {
    const { onCancel } = this.props;
    onCancel();
    this.hideDialog();
  };

  render() {
    const {
      color, mode, content, label, title,
    } = this.props;
    const { visible } = this.state;
    return (
      <View>
        <Button onPress={this.showDialog} mode={mode || 'contained'} color={color}>{label}</Button>
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={this.cancel}
          >
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Content>
              {content}
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                style={styles.cancelButton}
                onPress={this.cancel}
                color="orange"
                mode="outlined"
              >
                Cancel
              </Button>
              <Button onPress={this.confirm} mode="contained">Confirm</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }
}

export default ConfirmButton;
