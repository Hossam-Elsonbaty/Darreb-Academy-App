// import React, { useEffect } from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { Image, Pressable, Switch, Text, TouchableOpacity, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useLanguage } from '../context/LanguageContext';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import HomeScreen from '../screens/HomeScreen';
// import AboutScreen from '../screens/AboutScreen';
// import ContactScreen from '../screens/ContactScreen';
// import RegisterScreen from '../screens/RegisterScreen';
// import { t } from 'i18next';
// import AfterEnroll from '../screens/AfterEnroll';
// import Cart from '../screens/Cart';
// import Wishlist from '../screens/Wishlist';
// import CoursesScreen from '../screens/CoursesScreen';
// import LoginScreen from '../screens/LoginScreen';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import CourseDetails from 'screens/CourseDetails';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();

// function CoursesStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Courses" component={CoursesScreen} />
//       <Stack.Screen name="CourseDetails" component={CourseDetails} />
//     </Stack.Navigator>
//   );
// }

// export default function DrawerNavigator() {
//   const { language, toggleLanguage } = useLanguage();
//   const links = t('links', { returnObjects: true });
//   let token ;
//   const getToken = async()=> {
//     token = await AsyncStorage.getItem("token");
//   }
//   getToken()
//   console.log(token);
//   console.log(token);
//   const CustomDrawerItem = ({ onPress }) => {
//     const handleLogout = async()=>{
//       console.log(token);
//       console.log("logged out");
//       await AsyncStorage.removeItem("token")
//       await AsyncStorage.removeItem("userData")
//     }
//   return (
//     <Pressable onPress={handleLogout}>
//       {/* Custom Pressable content for logout */}
//       <Ionicons name="log-in-outline" size={24} color="#000" />
//       <Text>Sign Out</Text>
//     </Pressable>
//   );
// };
//   return (
//     <Drawer.Navigator
//       screenOptions={({ navigation }) => ({
//         headerLeft: () => null,
//         headerTitle: () => (
//           <Image
//             source={require('../assets/logo.webp')}
//             style={{ width: 100, height: 30 }}
//             resizeMode="contain"
//           />
//         ),

//         headerRight: () => (
//           <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
//             <Switch value={language === 'ar'} onValueChange={toggleLanguage} />

//             <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
//               <Ionicons name="menu" size={28} className="text-main" />
//             </TouchableOpacity>
//           </View>
//         ),
//       })}>
//       <Drawer.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           title: links[0],
//           drawerIcon: ({ color, size }) => (
//             <Ionicons name="home-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       <Drawer.Screen
//         name="About"
//         component={AboutScreen}
//         options={{
//           title: links[1],
//           drawerIcon: ({ color, size }) => (
//             <Ionicons name="information-circle-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       <Drawer.Screen
//         name="Contact"
//         component={ContactScreen}
//         options={{
//           title: links[2],
//           drawerIcon: ({ color, size }) => (
//             <Ionicons name="mail-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       {/* <Drawer.Screen
//         name="Enroll"
//         component={AfterEnroll}
//         options={{
//           title: links[3],
//           drawerIcon: ({ color, size }) => (
//             <Ionicons name="mail-outline" size={size} color={color} />
//           ),
//         }}
//       /> */}
//       <Drawer.Screen
//         name="Cart"
//         component={Cart}
//         options={{
//           title: links[4],
//           drawerIcon: ({ color, size }) => (
//             <AntDesign name="shopping-cart" size={size} color={color} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Wishlist"
//         component={Wishlist}
//         options={{
//           title: links[5],
//           drawerIcon: ({ color, size }) => (
//             <Ionicons name="heart-outline" size={size} color={color} />
//           ),
//         }}
//       />
//         <Drawer.Screen
//           name="Courses"
//           component={CoursesStack}
//           options={{
//             title: links[3],
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="book-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         {!token?
//         <>
//           <Drawer.Screen
//             name="Register"
//             component={RegisterScreen}
//             options={{
//               title: links[7],
//               drawerIcon: ({ color, size }) => (
//                 <Ionicons name="log-in-outline" size={size} color={color} />
//               ),
//             }}
//           />
//           <Drawer.Screen
//             name="signin"
//             component={LoginScreen}
//             options={{
//               title: links[8],
//               drawerIcon: ({ color, size }) => (
//                 <Ionicons name="log-in-outline" size={size} color={color} />
//               ),
//             }}
//           />
//         </>
//         :
//         <Drawer.Screen
//           name="signout"
//           component={CustomDrawerItem}
//           options={{
//             title: links[11],
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="log-out-outline" size={size} color={color} />
//             ),
//           }}
//         />
//         }
//     </Drawer.Navigator>
//   );
// }
import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { t } from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import AfterEnroll from '../screens/AfterEnroll';
import Cart from '../screens/Cart';
import Wishlist from '../screens/Wishlist';
import CoursesScreen from '../screens/CoursesScreen';
import CourseDetails from '../screens/CourseDetails';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Drawer = createDrawerNavigator();

// Courses Stack with nested navigation
function CoursesStack() {
  const Stack = createNativeStackNavigator();
  // const CoursesStackNavigator = Stack();
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CoursesList" component={CoursesScreen} />
      <Stack.Screen name="CourseDetails" component={CourseDetails} />
    </Stack.Navigator>
  );
}

// Custom Drawer Content
function CustomDrawerContent(props) {
  const { navigation } = props;
  const [token, setToken] = useState(null);
  const { language, toggleLanguage } = useLanguage();
  const links = t('links', { returnObjects: true });

  // Check token on mount and when drawer opens
  useFocusEffect(
    React.useCallback(() => {
      checkToken();
    }, [token])
  );

  const checkToken = async () => {
    const storedToken = await AsyncStorage.getItem("token");
    setToken(storedToken);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userData");
      setToken(null);
      navigation.navigate("Home");
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const DrawerItem = ({ name, icon, label, onPress }) => (
    <TouchableOpacity
      onPress={onPress || (() => navigation.navigate(name))}
      className="flex-row items-center px-4 py-3 gap-4"
    >
      {icon}
      <Text className="text-base text-gray-700">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white pt-12">
      {/* Logo Section */}
      {/* <View className="px-4 pb-6 border-b border-gray-200">
        <Image
          source={require('../assets/logo.webp')}
          style={{ width: 120, height: 40 }}
          resizeMode="contain"
        />
      </View>
 */}
      {/* Menu Items */}
      <View className="flex-1 pt-4">
        <DrawerItem
          name="Home"
          icon={<Ionicons name="home-outline" size={24} color="#4B5563" />}
          label={links[0]}
        />

        <DrawerItem
          name="About"
          icon={<Ionicons name="information-circle-outline" size={24} color="#4B5563" />}
          label={links[1]}
        />

        <DrawerItem
          name="Contact"
          icon={<Ionicons name="mail-outline" size={24} color="#4B5563" />}
          label={links[2]}
        />

        <DrawerItem
          name="Courses"
          icon={<Ionicons name="book-outline" size={24} color="#4B5563" />}
          label={links[3]}
        />

        <DrawerItem
          name="Cart"
          icon={<AntDesign name="shopping-cart" size={24} color="#4B5563" />}
          label={links[4]}
        />

        <DrawerItem
          name="Wishlist"
          icon={<Ionicons name="heart-outline" size={24} color="#4B5563" />}
          label={links[5]}
        />

        {/* Authentication Items */}
        {!token ? (
          <>
            <DrawerItem
              name="Register"
              icon={<Ionicons name="person-add-outline" size={24} color="#4B5563" />}
              label={links[7]}
            />

            <DrawerItem
              name="Login"
              icon={<Ionicons name="log-in-outline" size={24} color="#4B5563" />}
              label={links[8]}
            />
          </>
        ) : (
          <DrawerItem
            name="Logout"
            icon={<Ionicons name="log-out-outline" size={24} color="#DC2626" />}
            label={links[11] || "Sign Out"}
            onPress={handleLogout}
          />
        )}
      </View>

      {/* Language Toggle at Bottom */}
      {/* <View className="px-4 py-6 border-t border-gray-200">
        <View className="flex-row items-center justify-between">
          <Text className="text-gray-700">
            {language === 'ar' ? 'العربية' : 'English'}
          </Text>
          <Switch value={language === 'ar'} onValueChange={toggleLanguage} />
        </View>
      </View> */}
    </SafeAreaView>
  );
}

export default function DrawerNavigator() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginRight: 15 }}>
            <Switch value={language === 'ar'} onValueChange={toggleLanguage} />
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Ionicons name="menu" size={28} color="#309255" />
            </TouchableOpacity>
          </View>
        ),
      })}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Contact" component={ContactScreen} />
      <Drawer.Screen name="Courses" component={CoursesStack} />
      <Drawer.Screen name="Cart" component={Cart} />
      <Drawer.Screen name="Wishlist" component={Wishlist} />
      <Drawer.Screen name="Register" component={RegisterScreen} />
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="CourseDetails" component={CourseDetails} />
    </Drawer.Navigator>
  );
}