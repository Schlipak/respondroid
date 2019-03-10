import * as React from 'react';
import { Switch as PaperSwitch } from 'react-native-paper';

class SwitchToggle extends React.Component {
  render() {
    return (
      <PaperSwitch
        value={this.props.value}
        onValueChange={this.props.onToggle}
      />
    );
  }
}

export default SwitchToggle;
