import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, Switch, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { t } from 'i18next';
import AfterEnroll from '../screens/AfterEnroll';
import Cart from '../screens/Cart';
import Wishlist from '../screens/Wishlist';
import CoursesScreen from '../screens/CoursesScreen';
import LoginScreen from '../screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CourseDetails from 'screens/CourseDetails';
import Profile from 'screens/Profile';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function CoursesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Courses" component={CoursesScreen} />
      <Stack.Screen name="CourseDetails" component={CourseDetails} />
    </Stack.Navigator>
  );
}

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
        name="Enroll"
        component={AfterEnroll}
        options={{
          title: links[3],
          drawerIcon: ({ color, size }) => (
            <Ionicons name="mail-outline" size={size} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Courses"
        component={CoursesScreen}
        options={{
          title: links[3],
          drawerIcon: ({ color, size }) => (
            <Ionicons name="mail-outline" size={size} color={color} />
          ),}}/>
          <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{
          title: links[3],
          drawerIcon: ({ color, size }) => (
            <AntDesign name="shopping-cart" size={size} color={color} />

          ),
        }}
      />
          <Drawer.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          title: links[4],
          drawerIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
      name="Register"
      component={RegisterScreen}
      options={{
        title: links[3],
        drawerIcon: ({ color, size }) => (
          <Ionicons name="log-in-outline" size={size} color={color} />
        ),
      }}  />

      <Drawer.Screen
        name="signin"
        component={LoginScreen}
        options={{
          title: links[4],
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-in-outline" size={size} color={color} />
          ),
        }}  />
        }}/> */}
      <Drawer.Screen
        name="Courses"
        component={CoursesStack}
        options={{
          title: links[3],
          drawerIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          title: links[4],
          drawerIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
