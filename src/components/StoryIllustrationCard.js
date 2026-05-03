import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AvatarCharacter from './AvatarCharacter';

export default function StoryIllustrationCard({ title, subtitle, progress, color, variant = 'avatar' }) {
  return (
    <View style={[styles.card, { backgroundColor: color }]}> 
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: progress }]} />
        </View>
      </View>
      <View style={styles.right}>
        {variant === 'avatar' ? <AvatarCharacter size={84} /> : <View style={styles.objectBlob} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 18, padding: 14, flexDirection: 'row', alignItems: 'center' },
  left: { flex: 1, paddingRight: 8 },
  right: { width: 88, alignItems: 'center', justifyContent: 'center' },
  title: { color: 'white', fontSize: 25, fontWeight: '800' },
  subtitle: { color: 'white', opacity: 0.9, marginTop: 4, fontSize: 13 },
  progressTrack: { marginTop: 12, width: '100%', height: 6, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.35)' },
  progressFill: { height: 6, borderRadius: 99, backgroundColor: 'white' },
  objectBlob: { width: 70, height: 70, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.65)' },
});
