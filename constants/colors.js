export const standardColors = {
  red: {
    light: '#F44336',
    dark: '#D32F2F',
    accent: '#FF5252',
  },
  pink: {
    light: '#E91E63',
    dark: '#C2185B',
    accent: '#FF4081',
  },
  purple: {
    light: '#9C27B0',
    dark: '#7B1FA2',
    accent: '#E040FB',
  },
  deepPurple: {
    light: '#673AB7',
    dark: '#512DA8',
    accent: '#7C4DFF',
  },
  indigo: {
    light: '#3F51B5',
    dark: '#303F9F',
    accent: '#536DFE',
  },
  blue: {
    light: '#2196F3',
    dark: '#1976D2',
    accent: '#448AFF',
  },
  lightBlue: {
    light: '#03A9F4',
    dark: '#0288D1',
    accent: '#03A9F4',
  },
  cyan: {
    light: '#00BCD4',
    dark: '#0097A7',
    accent: '#00BCD4',
  },
  teal: {
    light: '#009688',
    dark: '#00796B',
    accent: '#009688',
  },
  green: {
    light: '#4CAF50',
    dark: '#388E3C',
    accent: '#4CAF50',
  },
  lightGreen: {
    light: '#8BC34A',
    dark: '#689F38',
    accent: '#8BC34A',
  },
  lime: {
    light: '#CDDC39',
    dark: '#AFB42B',
    accent: '#CDDC39',
  },
  yellow: {
    light: '#FFEB3B',
    dark: '#FBC02D',
    accent: '#FFEB3B',
  },
  amber: {
    light: '#FFC107',
    dark: '#FFA000',
    accent: '#FFC107',
  },
  orange: {
    light: '#FF9800',
    dark: '#F57C00',
    accent: '#FF9800',
  },
  deepOrange: {
    light: '#FF5722',
    dark: '#E64A19',
    accent: '#FF5722',
  },
  brown: {
    light: '#795548',
    dark: '#5D4037',
    accent: '#795548',
  },
  grey: {
    light: '#9E9E9E',
    dark: '#616161',
    accent: '#9E9E9E',
  },
  blueGrey: {
    light: '#607D8B',
    dark: '#455A64',
    accent: '#607D8B',
  },
};

export const palette = {
  primary: standardColors.indigo.light,
  accent: standardColors.pink.accent,
};

export default {
  ...standardColors,
  ...palette,
};
