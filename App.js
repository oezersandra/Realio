import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import MissionsScreen from './src/screens/MissionsScreen';
import StoryScreen from './src/screens/StoryScreen';
import ChallengesScreen from './src/screens/ChallengesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { colors } from './src/theme/colors';

const Tab = createBottomTabNavigator();

const tabIcon = (emoji) => ({ color }) => <Text style={{ color, fontSize: 16 }}>{emoji}</Text>;

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: '#9CA3AF',
            tabBarStyle: { height: 70, paddingBottom: 10, paddingTop: 8 },
          }}
        >
          <Tab.Screen name="Start" component={HomeScreen} options={{ tabBarIcon: tabIcon('🏠') }} />
          <Tab.Screen name="Missionen" component={MissionsScreen} options={{ tabBarIcon: tabIcon('✅') }} />
          <Tab.Screen name="Story" component={StoryScreen} options={{ tabBarIcon: tabIcon('📖') }} />
          <Tab.Screen name="Challenges" component={ChallengesScreen} options={{ tabBarIcon: tabIcon('🏆') }} />
          <Tab.Screen name="Profil" component={ProfileScreen} options={{ tabBarIcon: tabIcon('👤') }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
