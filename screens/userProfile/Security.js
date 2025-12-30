import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../api/axios";
import { useLanguage } from "../../context/LanguageContext";

export default function SecurityScreen() {
  const { language } = useLanguage();
  const lang = language === "ar" ? "ar" : "en";
  const [userData, setUserData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString) {
        const data = JSON.parse(userDataString);
        setUserData(data);
        setValue("email", data.email || "");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const onSubmit = async (data) => {
    if (!userData?._id) {
      Alert.alert(
        lang === "ar" ? "خطأ" : "Error",
        lang === "ar" ? "لم يتم العثور على معلومات المستخدم" : "User data not found"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.put(`/users/change-password/${userData._id}`, {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      const updatedUser = response.data.data;
      setUserData(updatedUser);
      await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));

      Alert.alert(
        lang === "ar" ? "نجح" : "Success",
        lang === "ar" ? "تم تغيير كلمة المرور بنجاح" : "Password changed successfully"
      );

      // Clear password fields
      setValue("oldPassword", "");
      setValue("newPassword", "");
      setValue("confirmPassword", "");
    } catch (err) {
      console.error("Password change error:", err);
      Alert.alert(
        lang === "ar" ? "خطأ" : "Error",
        err.response?.data?.message ||
          (lang === "ar" ? "فشل تغيير كلمة المرور" : "Failed to change password")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-white border border-green-200 rounded-lg m-4 p-6">
        <Text className="text-2xl font-semibold mb-1 text-center text-gray-800">
          {lang === "ar" ? "الحساب" : "Account"}
        </Text>
        <Text className="text-sm text-gray-500 mb-6 text-center">
          {lang === "ar"
            ? "قم بتعديل إعدادات حسابك وتغيير كلمة المرور هنا."
            : "Edit your account settings and change your password here."}
        </Text>

        {/* Email (Disabled) */}
        <View className="mb-6 pb-6 border-b border-gray-200">
          <Text className="text-sm font-semibold mb-3 text-gray-800">
            {lang === "ar" ? "البريد الإلكتروني:" : "Email:"}
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { value } }) => (
              <TextInput
                value={value}
                editable={false}
                placeholder={lang === "ar" ? "البريد الإلكتروني" : "Email"}
                className="w-full px-4 py-3 text-base text-gray-500 border border-gray-300 rounded-lg bg-gray-100"
              />
            )}
          />
        </View>

        {/* Old Password */}
        <View className="mb-6">
          <Text className="text-sm font-semibold mb-3 text-gray-800">
            {lang === "ar" ? "كلمة المرور القديمة:" : "Old Password:"}
          </Text>
          <Controller
            control={control}
            name="oldPassword"
            rules={{
              required:
                lang === "ar" ? "كلمة المرور مطلوبة" : "Password is required",
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder={lang === "ar" ? "كلمة المرور القديمة" : "Old Password"}
                secureTextEntry
                className={`w-full px-4 py-3 text-base text-gray-700 border rounded-lg bg-white ${
                  errors.oldPassword ? "border-red-500" : "border-green-200"
                }`}
              />
            )}
          />
          {errors.oldPassword && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.oldPassword.message}
            </Text>
          )}
        </View>

        {/* New Password */}
        <View className="mb-6">
          <Text className="text-sm font-semibold mb-3 text-gray-800">
            {lang === "ar" ? "كلمة المرور الجديدة:" : "New Password:"}
          </Text>
          <Controller
            control={control}
            name="newPassword"
            rules={{
              required:
                lang === "ar"
                  ? "كلمة المرور الجديدة مطلوبة"
                  : "New Password is required",
              minLength: {
                value: 8,
                message:
                  lang === "ar"
                    ? "يجب أن تكون كلمة المرور على الأقل 8 أحرف"
                    : "Password must be at least 8 characters",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder={lang === "ar" ? "كلمة المرور الجديدة" : "New Password"}
                secureTextEntry
                className={`w-full px-4 py-3 text-base text-gray-700 border rounded-lg bg-white ${
                  errors.newPassword ? "border-red-500" : "border-green-200"
                }`}
              />
            )}
          />
          {errors.newPassword && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.newPassword.message}
            </Text>
          )}
        </View>

        {/* Confirm Password */}
        <View className="mb-6 pb-6 border-b border-gray-200">
          <Text className="text-sm font-semibold mb-3 text-gray-800">
            {lang === "ar" ? "تأكيد كلمة المرور:" : "Confirm Password:"}
          </Text>
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required:
                lang === "ar"
                  ? "يرجى تأكيد كلمة المرور"
                  : "Please confirm your password",
              validate: (value) =>
                value === newPassword ||
                (lang === "ar"
                  ? "كلمات المرور غير متطابقة"
                  : "Passwords do not match"),
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder={lang === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"}
                secureTextEntry
                className={`w-full px-4 py-3 text-base text-gray-700 border rounded-lg bg-white ${
                  errors.confirmPassword ? "border-red-500" : "border-green-200"
                }`}
              />
            )}
          />
          {errors.confirmPassword && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className={`py-3 rounded-lg ${
            isSubmitting ? "bg-gray-400" : "bg-green-600"
          }`}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center font-semibold text-base">
              {lang === "ar" ? "تغيير كلمة المرور" : "Change Password"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}