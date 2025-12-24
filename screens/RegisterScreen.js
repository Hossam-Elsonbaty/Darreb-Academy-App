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
import { useNavigation } from "@react-navigation/native";
import loginimg from "../assets/login.png";
import { LanguageContext } from 'context/LanguageContext';
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { language } =useContext(LanguageContext);

  const inputClassName = `
  
                      w-full h-[60px] px-6 
                      text-[15px] text-[#52565b] 
                      border border-[rgba(48,146,85,0.2)] 
                      rounded-[10px] bg-white 
                      transition-all duration-300 
                      focus:border-main focus:outline-none
`;
const [showPassword, setShowPassword] = React.useState(false);
const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);


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
        language === "en" ? "Error" : "خطأ",
        language === "en"
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
        navigation.navigate("Login"); 
      }
    } catch (error) {
      Alert.alert(
        language === "en" ? "Error" : "خطأ",
        error.response?.data?.message ||
          (language === "en"
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
            {language === "en" ? "Registration " : "سجل "}
            <Text className="text-[#309255]">
              {language === "en" ? "Now" : "الآن"}
            </Text>
          </Text>
        </View>

        {/* FORM */}
        <View className="w-full max-w-md gap-4">

          {/* NAME */}
          <Controller
  control={control}
  name="name"
  rules={{
    required:
      language === "en" ? "Name is required" : "الاسم مطلوب",
  }}
  render={({ field: { onChange, value } }) => (
    <TextInput
      placeholder={language === "en" ? "Name" : "الاسم"}
      value={value}
      onChangeText={onChange}
      className={inputClassName}
    />
  )}
/>
{errors.name && <Text className="text-red-500">{errors.name.message}</Text>}


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
      placeholder={language === "en" ? "Email" : "البريد الإلكتروني"}
      keyboardType="email-address"
      value={value}
      onChangeText={onChange}
      className={inputClassName}
    />
  )}
/>
{errors.email && <Text className="text-red-500">{errors.email.message}</Text>}

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
          : "كلمة المرور يجب ألا تقل عن 8 أحرف",
    },
  }}
  render={({ field: { onChange, value } }) => (
    <View className="relative">
      <TextInput
        placeholder={language === "en" ? "Password" : "كلمة المرور"}
        secureTextEntry={!showPassword}
        value={value}
        onChangeText={onChange}
        className={inputClassName}
      />
      <Pressable
        onPress={() => setShowPassword(!showPassword)}
        className={`absolute ${
          language === "ar" ? "left-4" : "right-4"
        } top-1/2 -translate-y-1/2`}
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

          {/* CONFIRM PASSWORD */}
         <Controller
  control={control}
  name="confirmPassword"
  rules={{
    required:
      language === "en"
        ? "Confirm password"
        : "تأكيد كلمة المرور",
    validate: (value) =>
      value === password ||
      (language === "en"
        ? "Passwords do not match"
        : "كلمتا المرور غير متطابقتين"),
  }}
  render={({ field: { onChange, value } }) => (
    <View className="relative">
      <TextInput
        placeholder={
          language === "en"
            ? "Confirm Password"
            : "تأكيد كلمة المرور"
        }
        secureTextEntry={!showConfirmPassword}
        value={value}
        onChangeText={onChange}
        className={inputClassName}
      />
      <Pressable
        onPress={() =>
          setShowConfirmPassword(!showConfirmPassword)
        }
        className={`absolute ${
          language === "ar" ? "left-4" : "right-4"
        } top-1/2 -translate-y-1/2`}
      >
        <Ionicons
          name={
            showConfirmPassword
              ? "eye-off-outline"
              : "eye-outline"
          }
          size={22}
          color="#52565b"
        />
      </Pressable>
    </View>
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
              {language === "en" ? "Create an account" : "إنشاء حساب"}
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
