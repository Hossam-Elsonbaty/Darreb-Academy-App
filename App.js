import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import { LanguageProvider } from './context/LanguageContext';
import Toast from "react-native-toast-message";

import './global.css';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from 'context/WishlistContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoursesScreen from 'screens/CoursesScreen';
import CourseDetails from 'screens/CourseDetails';

export default function App() {
 let Stack= createNativeStackNavigator()
  return (
    <>
    
    <LanguageProvider>
        <WishlistProvider>
      <CartProvider>
      <NavigationContainer>
        
        <DrawerNavigator />
      </NavigationContainer>
      </CartProvider>
      </WishlistProvider>
    </LanguageProvider>
          
          <Toast /> 
    </>

  );
}
