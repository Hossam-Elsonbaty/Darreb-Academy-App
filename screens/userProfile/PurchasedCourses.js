import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import api from "../../api/axios";
import { useLanguage } from "../../context/LanguageContext";

export default function PurchasedCoursesScreen() {
  const navigation = useNavigation();
  const { language } = useLanguage();
  const lang = language === "ar" ? "ar" : "en";
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPurchasedCourses();
  }, []);

  const fetchPurchasedCourses = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/auth/my-courses");
      setPurchasedCourses(response.data.data || []);
    } catch (err) {
      console.error("Error fetching purchased courses:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCourseCard = ({ item: course }) => (
    <View className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4 mx-2">
      {/* Course Image */}
      <Image
        source={{ uri: course.thumbnail }}
        className="w-full h-48"
        resizeMode="cover"
      />

      {/* Course Content */}
      <View className="p-4">
        <Text className="font-semibold text-base mb-2" numberOfLines={2}>
          {course.title}
        </Text>
        <Text className="text-sm text-gray-500 mb-4">
          {course.instructor?.fullName}
        </Text>

        {/* Watch Now Button */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("WatchCourse", { courseId: course._id })
          }
          className="bg-green-600 py-3 rounded-lg"
        >
          <Text className="text-white text-center font-semibold">
            {lang === "ar" ? "شاهد الآن" : "Watch Now"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#309255" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white border border-gray-200 m-4 rounded-lg p-4">
        <Text className="text-2xl font-semibold mb-6 text-gray-800">
          {lang === "ar" ? "الدورات المشتراة" : "Purchased Courses"}
        </Text>

        {purchasedCourses.length > 0 ? (
          <FlatList
            data={purchasedCourses}
            renderItem={renderCourseCard}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          <View className="items-center justify-center py-12">
            <Ionicons name="cart-outline" size={64} color="#D1D5DB" />
            <Text className="font-bold text-xl text-gray-700 mt-4 mb-2">
              {lang === "ar"
                ? "لم تشترِ أي كورس بعد"
                : "You haven't purchased any course yet"}
            </Text>
            <Text className="text-gray-500 text-center mb-6 px-4">
              {lang === "ar"
                ? "ابدأ التعلم اليوم"
                : "Start learning today"}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Courses")}
              className="bg-green-600 px-6 py-3 rounded-lg"
            >
              <Text className="text-white text-lg font-semibold">
                {lang === "ar" ? "تصفح دوراتنا" : "Browse Our Courses"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}