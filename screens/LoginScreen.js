import React, { useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LanguageContext } from 'context/LanguageContext';
import Ionicons from "@expo/vector-icons/Ionicons";

import loginimg from "../assets/login.png";

export default function LoginScreen() {
  const { language } =useContext(LanguageContext);
  const navigation = useNavigation();
  const inputClassName = `
  w-full h-[60px] px-6
  text-[15px] text-[#52565b]
  border border-[rgba(48,146,85,0.2)]
  rounded-[10px] bg-white
  focus:border-main focus:outline-none
`;
const [showPassword, setShowPassword] = React.useState(false);


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://darreb-academy-backend.vercel.app/api/auth/login",
        {
          email: data.email,
          password: data.password,
        }
      );

      const token = response.data.data.token;
      const userData = response.data.data;

      if (token) {
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("userData", JSON.stringify(userData));

        navigation.navigate("Home"); 
      }
    } catch (error) {
      Alert.alert(
        language === "en" ? "Login Failed" : "فشل تسجيل الدخول",
        error.response?.data?.message ||
          (language === "en"
            ? "Invalid email or password"
            : "البريد الإلكتروني أو كلمة المرور غير صحيحة")
      );
    }
  };

  return (
    <ScrollView className="bg-white flex-1">
      <View className="min-h-screen px-6 py-16 items-center justify-center">

        {/* IMAGE */}
        <Image
          source={loginimg}
          className="w-5 h-5" 
          resizeMode="contain"
        />

        {/* TITLE */}
        <View className="mb-6">
          <Text className="text-[30px] font-medium text-center text-[#212832]">
            {language === "en" ? "Login " : "سجل "}
            <Text className="text-[#309255]">
              {language === "en" ? "Now" : "الآن"}
            </Text>
          </Text>
        </View>

        {/* FORM */}
        <View className="w-full max-w-md gap-4">

          {/* EMAIL */}
          <Controller
  control={control}
  name="email"
  rules={{
    required:
      language === "en"
        ? "Email is required"
        : "البريد الإلكتروني مطلوب",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message:
        language === "en"
          ? "Invalid email format"
          : "صيغة البريد الإلكتروني غير صحيحة",
    },
  }}
  render={({ field: { onChange, value } }) => (
    <TextInput
      value={value}
      onChangeText={onChange}
      keyboardType="email-address"
      placeholder={language === "en" ? "Email" : "البريد الإلكتروني"}
      className={inputClassName}
    />
  )}
/>

{errors.email && (
  <Text className="text-red-500">{errors.email.message}</Text>
)}

          {/* PASSWORD */}
 <Controller
  control={control}
  name="password"
  rules={{
    required:
      language === "en"
        ? "Password is required"
        : "كلمة المرور مطلوبة",
    minLength: {
      value: 8,
      message:
        language === "en"
          ? "Password must be at least 8 characters"
          : "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
    },
  }}
  render={({ field: { onChange, value } }) => (
    <View className="relative">
      <TextInput
        value={value}
        onChangeText={onChange}
        secureTextEntry={!showPassword}
        placeholder={
          language === "en" ? "Password" : "كلمة المرور"
        }
        className={inputClassName}
      />

      {/* 👁 Eye */}
      <Pressable
        onPress={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2"
      >
        <Ionicons
          name={showPassword ? "eye-off-outline" : "eye-outline"}
          size={22}
          color="#52565b"
        />
      </Pressable>
    </View>
  )}
/>

{errors.password && (
  <Text className="text-red-500">{errors.password.message}</Text>
)}


          {/* LOGIN BUTTON */}
          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="bg-[#309255] py-4 rounded-lg"
          >
            <Text className="text-white text-lg font-medium text-center">
              {language === "en" ? "Login" : "تسجيل الدخول"}
            </Text>
          </Pressable>

          {/* GOOGLE */}
          <Pressable className="bg-[#e7f8ee] border border-[rgba(48,146,85,0.2)] py-4 rounded-lg">
            <Text className="text-[#309255] text-lg font-medium text-center">
              {language === "en" ? "Login with Google" : "الدخول عبر جوجل"}
            </Text>
          </Pressable>

        </View>
      </View>
    </ScrollView>
  );
}
