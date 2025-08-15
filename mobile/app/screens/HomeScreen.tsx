import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import {useTheme} from '../theme';

export default function HomeScreen({navigation}: any) {
  const {colors, typography, spacing} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.bg}]}>
      <Header title="Dyad" />
      <ScrollView contentContainerStyle={{padding: spacing(4)}}>
        <Card>
          <Text style={[typography.h3, {color: colors.text}]}>مرحبًا 👋</Text>
          <Text
            style={[typography.body, {color: colors.textMuted, marginTop: 8}]}>
            هذا هو التطبيق الأصلي (Native) المكافئ لتجربة Dyad. عدّل المكونات
            لتطابق تصميمك.
          </Text>
          <Button
            label="استكشف"
            onPress={() => navigation.navigate('Explore')}
            style={{marginTop: 12}}
          />
        </Card>

        <Card>
          <Text style={[typography.h3, {color: colors.text}]}>
            بطاقات/لوحات
          </Text>
          <Text
            style={[typography.body, {color: colors.textMuted, marginTop: 8}]}>
            ضع هنا عناصر القوائم/البطاقات التي كانت موجودة في الويب.
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
