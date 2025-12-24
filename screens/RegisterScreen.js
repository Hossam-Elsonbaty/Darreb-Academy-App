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
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "../context/LanguageContext"; 
import loginimg from "../assets/login.png";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { lang } = useLanguage();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      Alert.alert(
        lang === "en" ? "Error" : "خطأ",
        lang === "en"
          ? "Password and Confirm Password must be the same"
          : "كلمة المرور غير متطابقة"
      );
      return;
    }

    try {
      const response = await axios.post(
        "https://darreb-academy-backend.vercel.app/api/auth/register",
        {
          fullName: data.name,
          email: data.email,
          password: data.password,
        }
      );

      if (response.status === 201) {
        navigation.navigate("register"); 
      }
    } catch (error) {
      Alert.alert(
        lang === "en" ? "Error" : "خطأ",
        error.response?.data?.message ||
          (lang === "en"
            ? "Something went wrong"
            : "حدث خطأ، حاول مرة أخرى")
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
            {lang === "en" ? "Registration " : "سجل "}
            <Text className="text-[#309255]">
              {lang === "en" ? "Now" : "الآن"}
            </Text>
          </Text>
        </View>

        {/* FORM */}
        <View className="w-full max-w-md gap-4">

          {/* NAME */}
          <Controller
            control={control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Name"
                value={value}
                onChangeText={onChange}
                className="h-[60px] px-6 border border-[rgba(48,146,85,0.2)] rounded-lg"
              />
            )}
          />
          {errors.name && (
            <Text className="text-red-500">{errors.name.message}</Text>
          )}

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

          {/* CONFIRM PASSWORD */}
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: "Confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                className="h-[60px] px-6 border border-[rgba(48,146,85,0.2)] rounded-lg"
              />
            )}
          />
          {errors.confirmPassword && (
            <Text className="text-red-500">
              {errors.confirmPassword.message}
            </Text>
          )}

          {/* SUBMIT */}
          <Pressable
            onPress={handleSubmit(onSubmit)}
            disabled={password && confirmPassword && password !== confirmPassword}
            className={`py-4 rounded-lg ${
              password && confirmPassword && password !== confirmPassword
                ? "bg-gray-400"
                : "bg-[#309255]"
            }`}
          >
            <Text className="text-white text-lg font-medium text-center">
              {lang === "en" ? "Create an account" : "إنشاء حساب"}
            </Text>
          </Pressable>

          {/* GOOGLE */}
          <Pressable className="bg-[#e7f8ee] border border-[rgba(48,146,85,0.2)] py-4 rounded-lg">
            <Text className="text-[#309255] text-lg font-medium text-center">
              Sign up with Google
            </Text>
          </Pressable>

        </View>
      </View>
    </ScrollView>
  );
}
