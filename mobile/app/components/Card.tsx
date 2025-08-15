import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '../theme';

export default function Card({children}: {children: ReactNode}) {
  const {colors, spacing} = useTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          padding: spacing(4),
        },
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    marginVertical: 8,
  },
});
