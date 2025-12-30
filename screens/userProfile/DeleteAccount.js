import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import api from "../../api/axios";
import { useLanguage } from "../../context/LanguageContext";

export default function DeleteAccountScreen() {
  const navigation = useNavigation();
  const { language } = useLanguage();
  const lang = language === "ar" ? "ar" : "en";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      if (!userDataString) {
        Alert.alert(
          lang === "ar" ? "خطأ" : "Error",
          lang === "ar" ? "لم يتم العثور على بيانات المستخدم" : "User data not found"
        );
        return;
      }

      const userData = JSON.parse(userDataString);
      setIsDeleting(true);

      await api.delete(`/users/${userData._id}`);

      // Clear all stored data
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userData");

      setIsModalOpen(false);

      // Show success message
      Alert.alert(
        lang === "ar" ? "تم الحذف" : "Deleted",
        lang === "ar" ? "تم حذف حسابك بنجاح" : "Your account has been deleted successfully",
        [
          {
            text: "OK",
            onPress: () => {
              // Navigate to home and reset navigation stack
              navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              });
            },
          },
        ]
      );
    } catch (error) {
      console.error("Delete account error:", error);
      Alert.alert(
        lang === "ar" ? "خطأ" : "Error",
        error.response?.data?.message ||
          (lang === "ar" ? "فشل حذف الحساب" : "Failed to delete account")
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const showDeleteConfirmation = () => {
    setIsModalOpen(true);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-white border border-gray-200 rounded-lg m-4 p-6">
        <Text className="text-xl font-semibold text-red-600 mb-4">
          {lang === "ar" ? "حذف الحساب" : "Delete Account"}
        </Text>

        {/* Warning Box */}
        <View className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <View className="flex-row items-center gap-2 mb-2">
            <Ionicons name="warning" size={20} color="#DC2626" />
            <Text className="text-red-700 font-semibold">
              {lang === "ar" ? "تحذير!" : "Warning!"}
            </Text>
          </View>
          <Text className="text-red-700 text-sm">
            {lang === "ar"
              ? "هذه العملية دائمة ولا يمكن التراجع عنها."
              : "This action is permanent and cannot be undone."}
          </Text>
        </View>

        {/* Description */}
        <Text className="text-sm text-gray-600 mb-6 leading-6">
          {lang === "ar"
            ? "بمجرد حذف حسابك، سيتم إزالة جميع بياناتك بشكل دائم بما في ذلك الدورات المشتراة والتقدم في التعلم."
            : "Once you delete your account, all your data will be permanently removed including purchased courses and learning progress."}
        </Text>

        {/* Delete Button */}
        <TouchableOpacity
          onPress={showDeleteConfirmation}
          className="bg-red-600 py-4 rounded-lg"
        >
          <Text className="text-white text-center font-semibold text-base">
            {lang === "ar" ? "حذف حسابي" : "Delete My Account"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Confirmation Modal */}
      <Modal
        visible={isModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => !isDeleting && setIsModalOpen(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-4">
          <View className="bg-white rounded-2xl p-6 w-full max-w-md">
            {/* Warning Icon */}
            <View className="items-center mb-4">
              <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center">
                <Ionicons name="alert-circle" size={32} color="#DC2626" />
              </View>
            </View>

            {/* Title */}
            <Text className="text-xl font-bold text-center mb-2 text-gray-900">
              {lang === "ar" ? "هل أنت متأكد؟" : "Are you sure?"}
            </Text>

            {/* Message */}
            <Text className="text-sm text-center text-gray-600 mb-6 leading-6">
              {lang === "ar"
                ? "بمجرد تأكيدك، سيتم حذف حسابك بشكل دائم ولن تتمكن من استعادته. جميع دوراتك وبياناتك ستُفقد نهائياً."
                : "Once you confirm, your account will be permanently deleted and you won't be able to recover it. All your courses and data will be lost forever."}
            </Text>

            {/* Buttons */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setIsModalOpen(false)}
                disabled={isDeleting}
                className="flex-1 bg-gray-200 py-3 rounded-lg"
              >
                <Text className="text-gray-700 text-center font-semibold">
                  {lang === "ar" ? "إلغاء" : "Cancel"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleDeleteAccount}
                disabled={isDeleting}
                className={`flex-1 py-3 rounded-lg ${
                  isDeleting ? "bg-gray-400" : "bg-red-600"
                }`}
              >
                {isDeleting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white text-center font-semibold">
                    {lang === "ar" ? "تأكيد" : "Confirm"}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}