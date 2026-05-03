import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Layout from '../components/Layout';
import { colors } from '../theme/colors';
import AvatarCharacter from '../components/AvatarCharacter';

export default function ProfileScreen() {
  return (
    <Layout>
      <Text style={styles.title}>Profil</Text>
      <View style={styles.avatar}><AvatarCharacter size={96} /></View>
      <Text style={styles.name}>Lea</Text>
      <Text style={styles.level}>Level 12</Text>
      <View style={styles.stats}>
        <Text>45 Missionen</Text>
        <Text>6 Badges</Text>
        <Text>7 Stories</Text>
      </View>
      <View style={styles.aiCard}>
        <Text style={styles.aiTitle}>AI Coach</Text>
        <Text style={styles.aiText}>Ich unterstütze dich dabei, motiviert zu bleiben und deine Woche zu planen.</Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '700', color: colors.text },
  avatar: { width: 110, height: 110, borderRadius: 55, backgroundColor: '#DDD6FE', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', overflow: 'hidden' },
  name: { textAlign: 'center', fontSize: 24, fontWeight: '700' },
  level: { textAlign: 'center', color: colors.primary, fontWeight: '700' },
  stats: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 16, padding: 16 },
  aiCard: { backgroundColor: 'white', borderRadius: 16, padding: 16 },
  aiTitle: { fontSize: 18, fontWeight: '700' },
  aiText: { marginTop: 6, color: '#4B5563' },
});
