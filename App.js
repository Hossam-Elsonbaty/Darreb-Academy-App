import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import { LanguageProvider } from './context/LanguageContext';
import './global.css';

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </LanguageProvider>
  );
}
