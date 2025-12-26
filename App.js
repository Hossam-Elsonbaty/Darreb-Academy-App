import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import { LanguageProvider } from './context/LanguageContext';
import './global.css';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoursesScreen from 'screens/CoursesScreen';
import CourseDetails from 'screens/CourseDetails';

export default function App() {
 let Stack= createNativeStackNavigator()
  return (
    
    <LanguageProvider>
      <NavigationContainer>
        
        <DrawerNavigator />
      </NavigationContainer>
    </LanguageProvider>
  );
}
