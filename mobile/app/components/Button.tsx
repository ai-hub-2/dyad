import React from 'react';
import {Pressable, Text, StyleSheet, ViewStyle} from 'react-native';
import {useTheme} from '../theme';

type Props = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  variant?: 'primary' | 'ghost';
};
export default function Button({
  label,
  onPress,
  style,
  variant = 'primary',
}: Props) {
  const {colors, spacing} = useTheme();
  const bg = variant === 'primary' ? colors.primary : 'transparent';
  const color = variant === 'primary' ? '#fff' : colors.text;
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.btn,
        {
          backgroundColor: bg,
          paddingVertical: spacing(3),
          paddingHorizontal: spacing(5),
          borderRadius: 12,
        },
        style,
      ]}>
      <Text style={[styles.text, {color}]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {alignItems: 'center', justifyContent: 'center'},
  text: {fontWeight: '700'},
});
