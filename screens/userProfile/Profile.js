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

export default function ProfileScreen() {
  const { language } = useLanguage();
  const lang = language === "ar" ? "ar" : "en";
  const [userData, setUserData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      headline: "",
      bio: "",
    },
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString) {
        const data = JSON.parse(userDataString);
        setUserData(data);
        setValue("fullName", data.fullName || "");
        setValue("headline", data.headline || "");
        setValue("bio", data.bio || "");
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
      const response = await api.put(`/users/${userData._id}`, {
        fullName: data.fullName,
        headline: data.headline,
        bio: data.bio,
      });

      const updatedUser = response.data.data;
      setUserData(updatedUser);
      await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));

      Alert.alert(
        lang === "ar" ? "نجح" : "Success",
        lang === "ar" ? "تم تحديث الملف الشخصي بنجاح" : "Profile updated successfully"
      );
    } catch (err) {
      console.error("Update error:", err);
      Alert.alert(
        lang === "ar" ? "خطأ" : "Error",
        err.response?.data?.message ||
          (lang === "ar" ? "فشل تحديث الملف الشخصي" : "Failed to update profile")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-white border border-green-200 rounded-lg m-4 p-6">
        <Text className="text-2xl font-semibold mb-1 text-center text-gray-800">
          {lang === "ar" ? "الملف الشخصي العام" : "Public Profile"}
        </Text>
        <Text className="text-sm text-gray-500 mb-6 text-center">
          {lang === "ar" ? "أضف معلومات عن نفسك" : "Add information about yourself"}
        </Text>

        {/* Full Name */}
        <View className="mb-6">
          <Text className="text-sm font-semibold mb-3 text-gray-800">
            {lang === "ar" ? "الأساسيات:" : "Basics:"}
          </Text>

          <Controller
            control={control}
            name="fullName"
            rules={{
              required: lang === "ar" ? "الاسم الكامل مطلوب" : "Full name is required",
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder={lang === "ar" ? "الاسم الكامل" : "Full Name"}
                className={`w-full px-4 py-3 text-base text-gray-700 border rounded-lg bg-white ${
                  errors.fullName ? "border-red-500" : "border-green-200"
                }`}
              />
            )}
          />
          {errors.fullName && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </Text>
          )}
        </View>

        {/* Headline */}
        <View className="mb-6">
          <Controller
            control={control}
            name="headline"
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder={lang === "ar" ? "العنوان" : "Headline"}
                maxLength={60}
                className="w-full px-4 py-3 text-base text-gray-700 border border-green-200 rounded-lg bg-white"
              />
            )}
          />
          <Text className="text-xs text-gray-500 mt-2">
            {lang === "ar"
              ? 'أضف عنوانًا احترافيًا مثل، "مدرب في Udemy".'
              : 'Add a professional headline like, "Instructor at Udemy".'}
          </Text>
        </View>

        {/* Biography */}
        <View className="mb-6">
          <Text className="text-sm font-semibold mb-2 text-gray-800">
            {lang === "ar" ? "السيرة الذاتية" : "Biography"}
          </Text>

          <Controller
            control={control}
            name="bio"
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder={lang === "ar" ? "السيرة الذاتية" : "Biography"}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                className="w-full px-4 py-3 text-base text-gray-700 border border-green-200 rounded-lg bg-white"
              />
            )}
          />
          <Text className="text-xs text-gray-500 mt-2">
            {lang === "ar"
              ? "لا يُسمح بإضافة روابط أو رموز خصم."
              : "Links and coupon codes are not permitted."}
          </Text>
        </View>

        {/* Save Button */}
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
              {lang === "ar" ? "حفظ" : "Save"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}