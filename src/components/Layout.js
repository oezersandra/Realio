import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function Layout({ children }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 14, paddingBottom: 120 },
});
