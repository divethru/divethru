import { COLOR as colors } from 'react-native-material-ui';

const palette = {
  primaryColor: colors.white,
  accentColor: '#1B4AE8',
};

const gradient = [
  '#1771D7',
  '#0195FF',
];

const uiTheme = {
  palette,
  drawerSectionActiveItem: {
    leftElement: {
      color: palette.accentColor,
    },
    primaryText: {
      color: palette.accentColor,
    },
  },
  toolbar: {
    container: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      elevation: 0,
      height: 64,
      borderBottomWidth: 1,
      borderBottomColor: colors.grey300,
    },
    titleText: {
      color: colors.grey800,
      fontWeight: '100',
    },
    leftElement: {
      color: colors.grey900,
    },
  },

};

export {
  palette,
  colors,
  gradient,
  uiTheme,
};
