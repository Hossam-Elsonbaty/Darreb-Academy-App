import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLanguage } from "../context/LanguageContext";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// Import your child screens
import ProfileScreen from "./userProfile/Profile";
import PhotoScreen from "./userProfile/UserPicture";
import SecurityScreen from "./userProfile/Security";
import PurchasedCoursesScreen from "./userProfile/PurchasedCourses";
import DeleteAccountScreen from "./userProfile/DeleteAccount";

const Tab = createMaterialTopTabNavigator();

const AccountLayout = () => {
  const navigation = useNavigation();
  const { language } = useLanguage();
  const lang = language === "ar" ? "ar" : "en";
  const [token, setToken] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const isLoading = useSelector((state) => state.loader.isLoading);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      setToken(storedToken);

      if (!storedToken) {
        // Redirect to login if no token
        navigation.replace("Login");
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#309255" />
      </View>
    );
  }

  if (!token) {
    return null; // Will redirect to login
  }

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-white pt-12 pb-4 px-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#309255" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-green-600">
            {lang === "ar" ? "لوحة تحكم المستخدم" : "User Dashboard"}
          </Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#309255" />
        </View>
      ) : (
        <Tab.Navigator
          screenOptions={{
            tabBarScrollEnabled: true,
            tabBarActiveTintColor: "#309255",
            tabBarInactiveTintColor: "#6B7280",
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "600",
              textTransform: "none",
            },
            tabBarStyle: {
              backgroundColor: "#fff",
            },
            tabBarIndicatorStyle: {
              backgroundColor: "#309255",
              height: 3,
            },
            tabBarItemStyle: {
              width: "auto",
              minWidth: 120,
            },
          }}
        >
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: lang === "ar" ? "الملف الشخصي" : "Profile",
              tabBarIcon: ({ color }) => (
                <Ionicons name="person-outline" size={20} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Photo"
            component={PhotoScreen}
            options={{
              tabBarLabel: lang === "ar" ? "الصورة" : "Photo",
              tabBarIcon: ({ color }) => (
                <Ionicons name="camera-outline" size={20} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Security"
            component={SecurityScreen}
            options={{
              tabBarLabel: lang === "ar" ? "الأمان" : "Security",
              tabBarIcon: ({ color }) => (
                <Ionicons name="lock-closed-outline" size={20} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="PurchasedCourses"
            component={PurchasedCoursesScreen}
            options={{
              tabBarLabel: lang === "ar" ? "الدورات المشتراة" : "My Courses",
              tabBarIcon: ({ color }) => (
                <Ionicons name="cart-outline" size={20} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="DeleteAccount"
            component={DeleteAccountScreen}
            options={{
              tabBarLabel: lang === "ar" ? "حذف الحساب" : "Delete",
              tabBarIcon: ({ color }) => (
                <Ionicons name="trash-outline" size={20} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </View>
  );
};

export default AccountLayout;