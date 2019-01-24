import { DefaultTheme } from 'react-native-paper';
import { palette } from './colors';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...palette,
    background: '#ffffff',
    overlay: {
      dark: 'rgba(0, 0, 0, 0.35)',
      light: 'rgba(255, 255, 255, 0.35)',
    },
  },
};
