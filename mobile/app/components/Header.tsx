import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../theme';

export default function Header({title}: {title: string}) {
  const {colors, typography} = useTheme();
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors.surface, borderBottomColor: colors.border},
      ]}>
      <Text style={[styles.title, {color: colors.text}, typography.h2]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 14,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  title: {fontWeight: '700'},
});
