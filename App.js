import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import { LanguageProvider } from './context/LanguageContext';
import './global.css';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from 'context/WishlistContext';

export default function App() {
  return (
    <LanguageProvider>
        <WishlistProvider>
      <CartProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
      </CartProvider>
      </WishlistProvider>
    </LanguageProvider>
  );
}
