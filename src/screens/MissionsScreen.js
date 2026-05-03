import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Layout from '../components/Layout';
import { colors } from '../theme/colors';

const STORAGE_KEY = 'realio_missions_v1';
const XP_KEY = 'realio_xp_v1';
const STORY_KEY = 'realio_selected_story_v1';

const missionByStory = {
  mama_life: [
    { name: 'Frühstück vorbereiten', subtitle: 'Gesund für die Familie', icon: '🍎', xp: 40, done: false },
    { name: '15 Min Ordnung', subtitle: 'Wohnzimmer aufräumen', icon: '🏠', xp: 50, done: false },
    { name: 'Family Walk', subtitle: '20 Minuten spazieren', icon: '👣', xp: 60, done: false },
    { name: 'Me-Time', subtitle: '10 Minuten nur für dich', icon: '💗', xp: 30, done: false },
  ],
  glow_up: [
    { name: 'Mini Boss: Workout', subtitle: '20 Minuten Training', icon: '🔥', xp: 70, done: false },
    { name: 'Healthy Choice', subtitle: 'Keine Süßigkeiten heute', icon: '💖', xp: 40, done: false },
    { name: '2L Wasser', subtitle: '0 / 8 Gläser', icon: '💧', xp: 20, done: false },
    { name: 'Journaling', subtitle: '3 Dinge aufschreiben', icon: '📔', xp: 30, done: false },
  ],
  money_builder: [
    { name: 'Budget Check', subtitle: '10 Minuten Finanzen prüfen', icon: '💰', xp: 50, done: false },
    { name: 'Business Fokus', subtitle: '45 Minuten Deep Work', icon: '💼', xp: 80, done: false },
    { name: '1 Verkaufsmove', subtitle: 'Ein Angebot rausschicken', icon: '📈', xp: 60, done: false },
    { name: 'Learning', subtitle: '15 Minuten Skillaufbau', icon: '🧠', xp: 30, done: false },
  ],
};

const getSaved = (key) => {
  try {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const setSaved = (key, value) => {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(key, value);
  } catch {}
};

export default function MissionsScreen() {
  const [selectedStory, setSelectedStory] = useState('mama_life');
  const [missions, setMissions] = useState(missionByStory.mama_life);
  const [xp, setXp] = useState(485);

  useEffect(() => {
    const savedStory = getSaved(STORY_KEY);
    const story = savedStory || 'mama_life';
    setSelectedStory(story);

    const savedMissions = getSaved(`${STORAGE_KEY}_${story}`);
    if (savedMissions) {
      try {
        const parsed = JSON.parse(savedMissions);
        if (Array.isArray(parsed)) setMissions(parsed);
      } catch {}
    } else {
      setMissions(missionByStory[story] || missionByStory.mama_life);
    }

    const rawXp = getSaved(XP_KEY);
    if (rawXp) {
      const parsedXp = Number(rawXp);
      if (!Number.isNaN(parsedXp)) setXp(parsedXp);
    }
  }, []);

  useEffect(() => {
    setSaved(XP_KEY, String(xp));
  }, [xp]);

  useEffect(() => {
    setSaved(`${STORAGE_KEY}_${selectedStory}`, JSON.stringify(missions));
  }, [missions, selectedStory]);

  const completedCount = useMemo(() => missions.filter((m) => m.done).length, [missions]);

  const toggleMission = (name) => {
    setMissions((current) =>
      current.map((m) => {
        if (m.name !== name) return m;
        const toggled = !m.done;
        setXp((prevXp) => prevXp + (toggled ? m.xp : -m.xp));
        return { ...m, done: toggled };
      }),
    );
  };

  return (
    <Layout>
      <Text style={styles.title}>Missionen</Text>
      <Text style={styles.progress}>{completedCount}/{missions.length} abgeschlossen • {xp} XP</Text>

      {missions.map((mission) => (
        <Pressable key={mission.name} style={[styles.row, mission.done && styles.rowDone]} onPress={() => toggleMission(mission.name)}>
          <Text style={styles.icon}>{mission.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={[styles.name, mission.done && styles.nameDone]}>{mission.name}</Text>
            <Text style={styles.subtitle}>{mission.subtitle}</Text>
          </View>
          <Text style={styles.xp}>+{mission.xp}</Text>
          <View style={[styles.check, mission.done && styles.checkDone]}>
            <Text style={styles.checkText}>{mission.done ? '✓' : ''}</Text>
          </View>
        </Pressable>
      ))}
    </Layout>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '700', color: colors.text },
  progress: { color: '#6B7280', marginBottom: 2, fontWeight: '600' },
  row: { backgroundColor: 'white', borderRadius: 16, padding: 14, flexDirection: 'row', gap: 10, alignItems: 'center' },
  rowDone: { borderWidth: 1, borderColor: '#BBF7D0' },
  icon: { fontSize: 20 },
  name: { fontWeight: '700' },
  nameDone: { color: '#15803D' },
  subtitle: { color: '#6B7280', marginTop: 2 },
  xp: { color: '#6D3DF5', fontWeight: '700' },
  check: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: '#D1D5DB', alignItems: 'center', justifyContent: 'center' },
  checkDone: { backgroundColor: '#22C55E', borderColor: '#22C55E' },
  checkText: { color: 'white', fontWeight: '800' },
});
