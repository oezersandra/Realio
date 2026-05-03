import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

export default function AvatarCharacter({ size = 120 }) {
  return (
    <View style={[styles.wrap, { width: size, height: size }]}> 
      <Image
        source={require('../../assets/avatar/avatar1.png')}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
