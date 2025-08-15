import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../components/Header';
import {useTheme} from '../theme';

export default function DetailsScreen() {
  const {colors, typography} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.bg}]}>
      <Header title="Details" />
      <View style={styles.body}>
        <Text style={[typography.body, {color: colors.text}]}>
          تفاصيل العنصر…
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  body: {padding: 16},
});
