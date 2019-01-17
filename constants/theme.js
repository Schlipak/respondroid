import { DefaultTheme } from 'react-native-paper';
import { palette } from './colors';

export default {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    ...palette,
  },
};
