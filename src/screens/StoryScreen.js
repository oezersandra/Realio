import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import Layout from '../components/Layout';
import StoryIllustrationCard from '../components/StoryIllustrationCard';

const STORY_KEY = 'realio_selected_story_v1';

const stories = [
  { id: 'mama_life', title: 'Mama Life', subtitle: 'Meistere den Alltag', color: '#FB7185', progress: '45%', variant: 'avatar' },
  { id: 'glow_up', title: 'Glow Up', subtitle: 'Werde die beste Version von dir', color: '#8B5CF6', progress: '30%', variant: 'avatar' },
  { id: 'money_builder', title: 'Money Builder', subtitle: 'Baue dein Business', color: '#F59E0B', progress: '10%', variant: 'object' },
];

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

export default function StoryScreen() {
  const [selectedStory, setSelectedStory] = useState('mama_life');

  useEffect(() => {
    const saved = getSaved(STORY_KEY);
    if (saved) setSelectedStory(saved);
  }, []);

  const chooseStory = (id) => {
    setSelectedStory(id);
    setSaved(STORY_KEY, id);
  };

  const active = stories.find((s) => s.id === selectedStory);

  return (
    <Layout>
      <Text style={styles.title}>Story Modus</Text>
      <Text style={styles.subtitle}>Wähle deine Story</Text>

      {stories.map((story) => {
        const isActive = story.id === selectedStory;
        return (
          <Pressable key={story.id} onPress={() => chooseStory(story.id)} style={[styles.cardWrap, isActive && styles.cardActive]}>
            <StoryIllustrationCard {...story} />
          </Pressable>
        );
      })}

      <View style={styles.choiceBox}>
        <Text style={styles.choiceLabel}>Aktive Story</Text>
        <Text style={styles.choiceValue}>{active?.title ?? 'Keine'}</Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { color: '#6B7280', marginBottom: 4 },
  cardWrap: { borderRadius: 18 },
  cardActive: { borderWidth: 3, borderColor: '#6D3DF5' },
  choiceBox: { backgroundColor: 'white', borderRadius: 14, padding: 14 },
  choiceLabel: { color: '#6B7280', fontWeight: '600' },
  choiceValue: { marginTop: 2, fontSize: 18, fontWeight: '700', color: '#111827' },
});
