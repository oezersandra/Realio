import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../components/Layout';

export default function ChallengesScreen() {
  return (
    <Layout>
      <Text style={styles.title}>Challenges</Text>
      <View style={[styles.card, { backgroundColor: '#FB7185' }]}><Text style={styles.name}>7 Tage Kein Zucker</Text></View>
      <View style={[styles.card, { backgroundColor: '#8B5CF6' }]}><Text style={styles.name}>10K Schritte Battle</Text></View>
      <View style={[styles.card, { backgroundColor: '#F59E0B' }]}><Text style={styles.name}>Frühaufsteher Challenge</Text></View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '700' },
  card: { borderRadius: 16, padding: 20 },
  name: { color: 'white', fontSize: 18, fontWeight: '700' },
});
