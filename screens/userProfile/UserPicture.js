import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useLanguage } from "../../context/LanguageContext";

export default function PhotoScreen() {
  const { language } = useLanguage();
  const lang = language === "ar" ? "ar" : "en";
  const [userData, setUserData] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadUserData();
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        lang === "ar" ? "صلاحية مطلوبة" : "Permission Required",
        lang === "ar"
          ? "نحتاج إلى إذن للوصول إلى مكتبة الصور الخاصة بك"
          : "We need permission to access your photo library"
      );
    }
  };

  const loadUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString) {
        const data = JSON.parse(userDataString);
        setUserData(data);
        setPreview(data.profilePic);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setPreview(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert(
        lang === "ar" ? "خطأ" : "Error",
        lang === "ar" ? "فشل اختيار الصورة" : "Failed to pick image"
      );
    }
  };

  const uploadImage = async () => {
    if (!preview || preview === userData?.profilePic) {
      Alert.alert(
        lang === "ar" ? "تنبيه" : "Warning",
        lang === "ar" ? "الرجاء اختيار صورة جديدة" : "Please select a new image"
      );
      return;
    }

    if (!userData?._id) {
      Alert.alert(
        lang === "ar" ? "خطأ" : "Error",
        lang === "ar" ? "لم يتم العثور على معلومات المستخدم" : "User data not found"
      );
      return;
    }

    setIsUploading(true);

    try {
      const token = await AsyncStorage.getItem("token");

      // Create form data
      const formData = new FormData();
      
      // Get file extension
      const uriParts = preview.split(".");
      const fileType = uriParts[uriParts.length - 1];

      formData.append("profilePic", {
        uri: preview,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });

      const response = await axios.put(
        `https://darreb-academy-backend.vercel.app/api/users/update-pic/${userData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.data;
      setUserData(updatedUser);
      await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));

      Alert.alert(
        lang === "ar" ? "نجح" : "Success",
        lang === "ar" ? "تم تحديث الصورة بنجاح" : "Photo updated successfully"
      );
    } catch (err) {
      console.error("Upload error:", err);
      Alert.alert(
        lang === "ar" ? "خطأ" : "Error",
        err.response?.data?.message ||
          (lang === "ar" ? "فشل تحميل الصورة" : "Failed to upload photo")
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-white border border-green-200 rounded-lg m-4 p-6">
        <Text className="text-xl font-semibold text-center mb-1 text-gray-800">
          {lang === "ar" ? "الصورة" : "Photo"}
        </Text>
        <Text className="text-sm text-gray-500 text-center mb-6">
          {lang === "ar"
            ? "أضف صورة جميلة لنفسك لملفك الشخصي."
            : "Add a nice photo of yourself for your profile."}
        </Text>

        {/* Image Preview */}
        <Text className="text-sm font-medium mb-2 text-gray-800">
          {lang === "ar" ? "معاينة الصورة" : "Image Preview"}
        </Text>
        <View className="w-full h-64 border border-green-200 rounded-lg mb-6 overflow-hidden bg-gray-100">
          {preview ? (
            <Image
              source={{ uri: preview }}
              className="w-full h-full"
              resizeMode="contain"
            />
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-gray-400">
                {lang === "ar" ? "لا توجد صورة" : "No Image"}
              </Text>
            </View>
          )}
        </View>

        {/* Add/Change Image */}
        <Text className="text-sm font-medium mb-3 text-gray-800">
          {lang === "ar" ? "إضافة / تغيير الصورة" : "Add / Change Image"}
        </Text>

        {/* Pick Image Button */}
        <TouchableOpacity
          onPress={pickImage}
          disabled={isUploading}
          className={`py-4 rounded-lg mb-3 ${
            isUploading ? "bg-gray-300" : "bg-gray-200"
          }`}
        >
          <Text className="text-center text-gray-700 font-medium">
            {lang === "ar" ? "اختر صورة" : "Choose Image"}
          </Text>
        </TouchableOpacity>

        {/* Upload Button */}
        <TouchableOpacity
          onPress={uploadImage}
          disabled={isUploading || !preview}
          className={`py-4 rounded-lg ${
            isUploading || !preview ? "bg-gray-400" : "bg-green-600"
          }`}
        >
          {isUploading ? (
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