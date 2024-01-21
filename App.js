import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './app/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Post from './app/Post';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Post" component={Post} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <Home /> */}
    </SafeAreaProvider>
  );
}
