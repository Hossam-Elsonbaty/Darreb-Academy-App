import React from "react";
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
import { useLanguage } from "../context/LanguageContext"; // عدل المسار
import loginimg from "../assets/login.png";

export default function LoginScreen() {
  const { lang } = useLanguage();
  const navigation = useNavigation();

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

        navigation.navigate("Home"); // اسم الشاشة الرئيسية
      }
    } catch (error) {
      Alert.alert(
        lang === "en" ? "Login Failed" : "فشل تسجيل الدخول",
        error.response?.data?.message ||
          (lang === "en"
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
          className="w-64 h-64 mb-6"
          resizeMode="contain"
        />

        {/* TITLE */}
        <View className="mb-6">
          <Text className="text-[30px] font-medium text-center text-[#212832]">
            {lang === "en" ? "Login " : "سجل "}
            <Text className="text-[#309255]">
              {lang === "en" ? "Now" : "الآن"}
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
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
                className="h-[60px] px-6 border border-[rgba(48,146,85,0.2)] rounded-lg"
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
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Password"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                className="h-[60px] px-6 border border-[rgba(48,146,85,0.2)] rounded-lg"
              />
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
              {lang === "en" ? "Login" : "تسجيل الدخول"}
            </Text>
          </Pressable>

          {/* GOOGLE */}
          <Pressable className="bg-[#e7f8ee] border border-[rgba(48,146,85,0.2)] py-4 rounded-lg">
            <Text className="text-[#309255] text-lg font-medium text-center">
              {lang === "en" ? "Login with Google" : "الدخول عبر جوجل"}
            </Text>
          </Pressable>

        </View>
      </View>
    </ScrollView>
  );
}
