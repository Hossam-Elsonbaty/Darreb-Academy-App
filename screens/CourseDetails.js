
import { useLanguage } from "context/LanguageContext";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";

export default function CourseDetails({ route }) {
  const { course, status } = route.params;
 const { lang } = useLanguage();
 const [activeTab, setActiveTab] = useState("description");
  
  return (
    // <View className="p-4">
    //   <Text className="text-2xl font-bold">{course.title}</Text>
    //   <Text>{course.category}</Text>
    //   <Text>{course.instructor}</Text>
    // </View>
     <ScrollView className="bg-white">
      {/* Course Image */}
      <Image
        source={{ uri: course.thumbnail }}
        className="w-full h-56"
        resizeMode="cover"
      />

      {/* Title */}
      <View className="p-4">
        <Text className="text-2xl font-bold">{course.title}</Text>
        <Text className="text-gray-600 mt-2">{course.description}</Text>

        {/* Rating */}
        <View className="flex-row items-center mt-3">
          {/* <Rating readonly value={course.rating} /> */}
          <Text className="ml-2 text-gray-500">
            ({course.totalRatings})
          </Text>
        </View>

        {/* Tabs */}
        <View className="flex-row justify-around bg-green-50 mt-5 p-2 rounded-xl">
          <Pressable
            onPress={() => setActiveTab("description")}
            className={`px-4 py-2 rounded-lg 
              ${
              activeTab === "description"
                ? "bg-green-600"
                : "bg-white"
            }`}
          >
            <Text
              className={`${
                activeTab === "description"
                  ? "text-white"
                  : "text-black"
              }`}
            >
              {lang === "en" ? "Description" : "الوصف"}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab("reviews")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "reviews"
                ? "bg-green-600"
                : "bg-white"
            }`}
          >
            <Text
              className={`${
                activeTab === "reviews"
                  ? "text-white"
                  : "text-black"
              }`}
            >
              {lang === "en" ? "Reviews" : "التقييمات"}
            </Text>
          </Pressable>
        </View>

        {/* TAB CONTENT */}
        {activeTab === "description" && (
          <View className="mt-5">
            <Text className="text-lg font-semibold mb-2">
              {lang === "en" ? "Curriculum" : "المحتوى"}
            </Text>

            {course.chapters?.map((item) => (
              <Text key={item._id} className="text-gray-600 mb-1">
                • {lang === "en" ? item.chapter.title : item.chapter.title_ar}
              </Text>
            ))}
          </View>
        )}

       
        </View>
        </ScrollView>
  );
}


