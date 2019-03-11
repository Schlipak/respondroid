import * as React from 'react';
import PropTypes from 'prop-types';
import { Switch as PaperSwitch } from 'react-native-paper';

const SwitchToggle = (props) => {
  const { value, onToggle } = props;
  return (
    <PaperSwitch
      value={value}
      onValueChange={onToggle}
    />
  );
};

SwitchToggle.propTypes = {
  value: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default SwitchToggle;
