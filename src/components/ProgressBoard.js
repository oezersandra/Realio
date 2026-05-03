import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const worldIcons = ['🏠', '💪', '💖', '💧', '🧠', '🌱', '💰', '⭐', '🔥', '🎯', '🗺️', '🏰'];

export default function ProgressBoard({ progress = 0, total = 12 }) {
  const cells = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Dein Abenteuerpfad</Text>

      <View style={styles.scene}>
        <View style={styles.skyGlow} />
        <View style={styles.sun} />

        <View style={styles.cloudA} />
        <View style={styles.cloudB} />

        <View style={styles.hillBack} />
        <View style={styles.hillMid} />
        <View style={styles.hillFront} />

        <View style={styles.path}>
          {cells.map((n, i) => {
            const active = n <= progress;
            const current = n === Math.min(progress + 1, total);
            const icon = worldIcons[i % worldIcons.length];

            return (
              <View key={n} style={styles.stepWrap}>
                <View style={[styles.iconBadge, active && styles.iconBadgeDone]}>
                  <Text style={styles.iconText}>{icon}</Text>
                </View>
                <View style={[styles.cell, active && styles.cellDone, current && styles.cellCurrent]}>
                  <Text style={[styles.cellText, active && styles.cellTextDone]}>{active ? '✓' : n}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: 'white', borderRadius: 16, padding: 14, overflow: 'hidden' },
  title: { fontWeight: '700', fontSize: 16, marginBottom: 10 },
  scene: {
    height: 210,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    overflow: 'hidden',
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
  },
  skyGlow: { position: 'absolute', top: -20, left: 40, width: 220, height: 140, borderRadius: 70, backgroundColor: 'rgba(255,255,255,0.45)' },
  sun: { position: 'absolute', top: 18, right: 18, width: 28, height: 28, borderRadius: 14, backgroundColor: '#FDE68A' },
  cloudA: { position: 'absolute', top: 24, left: 20, width: 54, height: 18, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.9)' },
  cloudB: { position: 'absolute', top: 44, left: 98, width: 42, height: 15, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.85)' },
  hillBack: { position: 'absolute', bottom: 84, left: -20, width: 260, height: 110, borderRadius: 70, backgroundColor: '#C7D2FE' },
  hillMid: { position: 'absolute', bottom: 56, right: -30, width: 260, height: 115, borderRadius: 80, backgroundColor: '#A5B4FC' },
  hillFront: { position: 'absolute', bottom: -20, left: -20, width: 420, height: 130, borderRadius: 90, backgroundColor: '#7C9B6A' },
  path: { zIndex: 3, flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingBottom: 14, justifyContent: 'center' },
  stepWrap: { alignItems: 'center' },
  iconBadge: {
    marginBottom: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  iconBadgeDone: { backgroundColor: 'rgba(34,197,94,0.18)' },
  iconText: { fontSize: 12 },
  cell: {
    width: 31,
    height: 31,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  cellDone: { backgroundColor: '#22C55E', borderColor: '#22C55E' },
  cellCurrent: { borderColor: '#6D3DF5', borderWidth: 3 },
  cellText: { color: '#6B7280', fontWeight: '700', fontSize: 11 },
  cellTextDone: { color: 'white' },
});
