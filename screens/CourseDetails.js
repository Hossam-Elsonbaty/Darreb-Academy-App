
import Rating from "common/Rating";

import { LanguageContext } from "context/LanguageContext";
import { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";

import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

import { useTranslation } from "react-i18next";

export default function CourseDetails({ route }) {
  const Row = ({ icon, label, value }) => (
  <View className="flex-row items-center border-b border-emerald-200 py-3">
    {icon}
    <Text className="ml-2 flex-1 text-[15px] text-gray-700">
      {label}
    </Text>
    <Text className="text-[15px] font-medium text-gray-600">
      {value}
    </Text>
  </View>
);
  const { course, courseId } = route.params;
const { t } = useTranslation();
const { lang } = useContext(LanguageContext);
 const [activeTab, setActiveTab] = useState("description");
 
  const isRTL = lang === 'ar';
  return (
    
     <ScrollView className="bg-white">
      
      {/* Course Image */}
      <View>
      <Image
        source={{uri:course.thumbnail}}
        className="w-full h-56 "
        resizeMode="cover"
      />

      {/* Title */}
     <View className="p-4">
  <Text
    className="text-2xl font-bold"
    style={{ textAlign: isRTL ? "right" : "left" }}
  >
    {course.title}
  </Text>

  <Text
    className="mt-2 text-gray-600"
    style={{ textAlign: isRTL ? "right" : "left" }}
  >
    {course.description}
  </Text>
</View>
        {/* Rating */}
        <View className="flex-row items-center mt-3">
           <Image
          source={require('../assets/author-06.jpg')}
          contentFit="cover"
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <Text className="ml-3 text-gray-700"style={{ textAlign: isRTL ? 'right' : 'left' }}>
          {course.instructor?.fullName || ''}
        </Text>
        <Text className="mx-4 text-gray-700"> {course.totalEnrollments}{" "}
                  {lang === "ar" ? "طالب مسجل":"Enrolled Students" }
         </Text>
          <Rating readonly value={course.rating} /> 
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
              {lang === "ar" ? "الوصف": "Description" }
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
              {lang === "ar" ?"التقييمات": "Reviews" }
            </Text>
          </Pressable>
        </View>

        {/* TAB CONTENT */}
        {activeTab === "description" && (
          

          <View className="mt-5">
           < Text className="text-lg font-semibold mb-2">
              {lang === "ar" ? "المحتوى": "Description" }
            </Text>
            <Text className="text-gray-700">{course.description}</Text>
            <Text className="text-lg font-semibold mb-2">
              {lang === "ar" ? "المحتوى":"Curriculum" }
            </Text>

            {course.chapters?.map((item) => (
              <Text key={item.chapter._id} className="text-gray-600 mb-1">
                • {lang === "ar" ? item.chapter.title_ar:item.chapter.title  }
              </Text>
            ))}
            <Text className="text-lg font-semibold mb-2">{lang==="ar"?"الشهادات":"Certificates"}</Text>
            <Text className="text-gray-700"> {lang === "en"
                      ? "Certificate available after completion"
                      : "شهادة متاحة بعد إتمام الدورة"}
                  </Text>
          </View>
        )}

{/* Table */}

         <View className="m-5 rounded-2xl bg-emerald-50 p-5">
  {/* Price */}
  <Text className="mb-4 text-center text-3xl font-bold text-emerald-700">
    ${course.price}
  </Text>

  <Row
    icon={<Ionicons name="person-outline" size={18} color="#2e8b57" />}
    label={lang === "ar" ? "المدرس" : "Instructor"}
    value={course.instructor?.fullName || "-"}
    isRTL={isRTL}
  />

  <Row
    icon={<Ionicons name="time-outline" size={18} color="#2e8b57" />}
    label={lang === "ar" ? "المدة" : "Duration"}
    value={course.totalDuration || "—"}
    isRTL={isRTL}
  />

  <Row
    icon={<MaterialIcons name="menu-book" size={18} color="#2e8b57" />}
    label={lang === "ar" ? "المحاضرات" : "Lectures"}
    value={course.totalLectures || 0}
    isRTL={isRTL}
  />

  <Row
    icon={<Feather name="bar-chart-2" size={18} color="#2e8b57" />}
    label={lang === "ar" ? "المستوى" : "Level"}
    value={course.level || "-"}
    isRTL={isRTL}
  />

  <Row
    icon={<Ionicons name="language-outline" size={18} color="#2e8b57" />}
    label={lang === "ar" ? "اللغة" : "Language"}
    value={course.language || "English"}
    isRTL={isRTL}
  />

  <Row
    icon={<Ionicons name="ribbon-outline" size={18} color="#2e8b57" />}
    label={lang === "ar" ? "شهادة" : "Certificate"}
    value={course.hasCertificate ? "Yes" : "No"}
    isRTL={isRTL}
  />

  {/* Button */}
  <TouchableOpacity className="mt-6 rounded-xl bg-emerald-700 py-4">
    <Text className="text-center text-base font-bold text-white">
      {lang === "ar" ? "سجل الآن" : "Enroll Now"}
    </Text>
  </TouchableOpacity>
</View>





       
        </View>
        </ScrollView>
  );
}


