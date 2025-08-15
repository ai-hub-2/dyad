import {Dimensions} from 'react-native';

export const isSmall = () => Dimensions.get('window').width < 360;
export const isTablet = () => Dimensions.get('window').width >= 768;

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
