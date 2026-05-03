import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Layout from '../components/Layout';
import { colors } from '../theme/colors';
import AvatarCharacter from '../components/AvatarCharacter';
import ProgressBoard from '../components/ProgressBoard';

const XP_KEY = 'realio_xp_v1';
const STORY_KEY = 'realio_selected_story_v1';
const MISSIONS_KEY_PREFIX = 'realio_missions_v1_';

const storyLabel = {
  mama_life: 'Mama Life',
  glow_up: 'Glow Up',
  money_builder: 'Money Builder',
};

const getSaved = (key) => {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export default function HomeScreen() {
  const [missions, setMissions] = useState([]);
  const [xp, setXp] = useState(485);
  const [story, setStory] = useState('mama_life');

  useEffect(() => {
    const selectedStory = getSaved(STORY_KEY) || 'mama_life';
    setStory(selectedStory);

    const rawMissions = getSaved(`${MISSIONS_KEY_PREFIX}${selectedStory}`);
    if (rawMissions) {
      try {
        const parsed = JSON.parse(rawMissions);
        if (Array.isArray(parsed)) setMissions(parsed);
      } catch {}
    }

    const rawXp = getSaved(XP_KEY);
    if (rawXp) {
      const parsedXp = Number(rawXp);
      if (!Number.isNaN(parsedXp)) setXp(parsedXp);
    }
  }, []);

  const doneCount = useMemo(() => missions.filter((m) => m.done).length, [missions]);

  return (
    <Layout>
      <Text style={styles.title}>Guten Morgen, Lea! ✨</Text>
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <Text style={styles.level}>Level 12</Text>
          <Text style={styles.heroText}>{xp} / 800 XP</Text>
          <Text style={styles.small}>Story: {storyLabel[story] || 'Mama Life'}</Text>
          <Text style={styles.small}>{doneCount}/{missions.length || 4} Missionen erledigt</Text>
        </View>
        <AvatarCharacter size={132} />
      </View>

      <ProgressBoard progress={doneCount} total={12} />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Deine Mission heute</Text>
        {missions.map((m) => (
          <View key={m.name} style={styles.missionRow}>
            <Text style={styles.item}>{m.done ? '✅' : '⬜'} {m.name}</Text>
            <Text style={styles.missionXp}>+{m.xp}</Text>
          </View>
        ))}
      </View>
      <Pressable style={styles.button}><Text style={styles.buttonText}>Mission starten 🚀</Text></Pressable>
    </Layout>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '700', color: colors.text },
  hero: { backgroundColor: '#EDE9FE', borderRadius: 20, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  heroTop: { flex: 1, paddingBottom: 8 },
  level: { color: colors.primary, fontWeight: '700' },
  heroText: { fontSize: 18, fontWeight: '700', marginTop: 8 },
  small: { marginTop: 4, color: '#6B7280', fontWeight: '600' },
  card: { backgroundColor: colors.card, borderRadius: 16, padding: 16, gap: 8 },
  cardTitle: { fontWeight: '700', fontSize: 17 },
  missionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  item: { color: '#374151' },
  missionXp: { color: '#6D3DF5', fontWeight: '700' },
  button: { backgroundColor: colors.primary, padding: 15, borderRadius: 14, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '700' },
});
