import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import { LanguageProvider } from './context/LanguageContext';
import Toast from 'react-native-toast-message';

import './global.css';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from 'context/WishlistContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoursesScreen from 'screens/CoursesScreen';
import CourseDetails from 'screens/CourseDetails';
import { Provider } from 'react-redux';
import { store } from './Store/store.js';
import Footer from './components/Footer';
import Toaster from 'components/Toaster';
import { ToasterProvider } from './context/ToasterContext';
import { AuthProvider } from './context/AuthContext';
export default function App() {
  let Stack = createNativeStackNavigator();
  return (
    <>
    <AuthProvider>
      <Provider store={store}>
        <ToasterProvider>
          <LanguageProvider>
            <WishlistProvider>
              <CartProvider>
                <NavigationContainer>
                  <DrawerNavigator />
                </NavigationContainer>
              </CartProvider>
            </WishlistProvider>
          </LanguageProvider>
          <Toaster /> 
        </ToasterProvider>
      </Provider>
      <Toast />
    </AuthProvider>
    </>
  );
}
