import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, Switch, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';

import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';
import { t } from 'i18next';
import CoursesScreen from '../screens/CoursesScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { language, toggleLanguage } = useLanguage();
  const links = t('links', { returnObjects: true });
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => null,
        headerTitle: () => (
          <Image
            source={require('../assets/logo.webp')}
            style={{ width: 100, height: 30 }}
            resizeMode="contain"
          />
        ),

        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Switch value={language === 'ar'} onValueChange={toggleLanguage} />

            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Ionicons name="menu" size={28} className="text-main" />
            </TouchableOpacity>
          </View>
        ),
      })}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: links[0],
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: links[1],
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: links[2],
          drawerIcon: ({ color, size }) => (
            <Ionicons name="mail-outline" size={size} color={color} />
          ),
        }}
        
      />
        <Drawer.Screen
        name="Courses"
        component={CoursesScreen}
        options={{
          title: links[3],
          drawerIcon: ({ color, size }) => (
            <Ionicons name="mail-outline" size={size} color={color} />
          ),
        }}/>
    </Drawer.Navigator>
  );
}
