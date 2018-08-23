import { StyleSheet } from 'react-native';
import { colors } from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
  },
  indicator: {
    alignItems: 'center',
    backgroundColor: 'black',
    bottom: 0,
    height: '100%',
    left: 0,
    opacity: 0.5,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    zIndex: 1101,
  },
});

export default styles;
