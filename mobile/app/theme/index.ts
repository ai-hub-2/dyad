import {Appearance} from 'react-native';
import {colors} from './colors';
import {typography} from './typography';
import {spacing} from './spacing';

export const useTheme = () => {
  const scheme = Appearance.getColorScheme() || 'dark';
  const palette = scheme === 'dark' ? colors.dark : colors.light;
  return {colors: palette, typography, spacing};
};
