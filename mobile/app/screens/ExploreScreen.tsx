import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../components/Header';
import {useTheme} from '../theme';

export default function ExploreScreen() {
  const {colors, typography} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.bg}]}>
      <Header title="Explore" />
      <View style={styles.body}>
        <Text style={[typography.body, {color: colors.textMuted}]}>
          ضع هنا شبكة/قائمة العناصر.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  body: {padding: 16},
});
