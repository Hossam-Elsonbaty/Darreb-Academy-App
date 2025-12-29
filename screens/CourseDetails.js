
// import Rating from "common/Rating";

// import { LanguageContext } from "context/LanguageContext";
// import { useContext, useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   Pressable,
//   TouchableOpacity,
// } from "react-native";

// import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

// import { useTranslation } from "react-i18next";

// export default function CourseDetails({ route }) {
//   const Row = ({ icon, label, value }) => (
//   <View className="flex-row items-center border-b border-emerald-200 py-3">
//     {icon}
//     <Text className="ml-2 flex-1 text-[15px] text-gray-700">
//       {label}
//     </Text>
//     <Text className="text-[15px] font-medium text-gray-600">
//       {value}
//     </Text>
//   </View>
// );
//   const { course, courseId } = route.params;
// const { t } = useTranslation();
// const { lang } = useContext(LanguageContext);
//  const [activeTab, setActiveTab] = useState("description");
 
//   const isRTL = lang === 'ar';
//   return (
    
//      <ScrollView className="bg-white">
      
//       {/* Course Image */}
//       <View>
//       <Image
//         source={{uri:course.thumbnail}}
//         className="w-full h-56 "
//         resizeMode="cover"
//       />

//       {/* Title */}
//      <View className="p-4">
//   <Text
//     className="text-2xl font-bold"
//     style={{ textAlign: isRTL ? "right" : "left" }}
//   >
//     {course.title}
//   </Text>

//   <Text
//     className="mt-2 text-gray-600"
//     style={{ textAlign: isRTL ? "right" : "left" }}
//   >
//     {course.description}
//   </Text>
// </View>
//         {/* Rating */}
//         <View className="flex-row items-center mt-3">
//            <Image
//           source={require('../assets/author-06.jpg')}
//           contentFit="cover"
//           style={{ width: 40, height: 40, borderRadius: 20 }}
//         />
//         <Text className="ml-3 text-gray-700"style={{ textAlign: isRTL ? 'right' : 'left' }}>
//           {course.instructor?.fullName || ''}
//         </Text>
//         <Text className="mx-4 text-gray-700"> {course.totalEnrollments}{" "}
//                   {lang === "ar" ? "طالب مسجل":"Enrolled Students" }
//          </Text>
//           <Rating readonly value={course.rating} /> 
//           <Text className="ml-2 text-gray-500">
//             ({course.totalRatings})
//           </Text>
//         </View>

//         {/* Tabs */}
//         <View className="flex-row justify-around bg-green-50 mt-5 p-2 rounded-xl">
//           <Pressable
//             onPress={() => setActiveTab("description")}
//             className={`px-4 py-2 rounded-lg 
//               ${
//               activeTab === "description"
//                 ? "bg-green-600"
//                 : "bg-white"
//             }`}
//           >
//             <Text
//               className={`${
//                 activeTab === "description"
//                   ? "text-white"
//                   : "text-black"
//               }`}
//             >
//               {lang === "ar" ? "الوصف": "Description" }
//             </Text>
//           </Pressable>

//           <Pressable
//             onPress={() => setActiveTab("reviews")}
//             className={`px-4 py-2 rounded-lg ${
//               activeTab === "reviews"
//                 ? "bg-green-600"
//                 : "bg-white"
//             }`}
//           >
//             <Text
//               className={`${
//                 activeTab === "reviews"
//                   ? "text-white"
//                   : "text-black"
//               }`}
//             >
//               {lang === "ar" ?"التقييمات": "Reviews" }
//             </Text>
//           </Pressable>
//         </View>

//         {/* TAB CONTENT */}
//         {activeTab === "description" && (
          

//           <View className="mt-5">
//            < Text className="text-lg font-semibold mb-2">
//               {lang === "ar" ? "المحتوى": "Description" }
//             </Text>
//             <Text className="text-gray-700">{course.description}</Text>
//             <Text className="text-lg font-semibold mb-2">
//               {lang === "ar" ? "المحتوى":"Curriculum" }
//             </Text>

//             {course.chapters?.map((item,index) => (
//               <Text key={index} className="text-gray-600 mb-1">
//                 • {lang === "ar" ? item.chapter.title_ar:item.chapter.title  }
//               </Text>
//             ))}
//             <Text className="text-lg font-semibold mb-2">{lang==="ar"?"الشهادات":"Certificates"}</Text>
//             <Text className="text-gray-700"> {lang === "en"
//                       ? "Certificate available after completion"
//                       : "شهادة متاحة بعد إتمام الدورة"}
//                   </Text>
//           </View>
//         )}

// {/* Table */}

//          <View className="m-5 rounded-2xl bg-emerald-50 p-5">
//   {/* Price */}
//   <Text className="mb-4 text-center text-3xl font-bold text-emerald-700">
//     ${course.price}
//   </Text>

//   <Row
//     icon={<Ionicons name="person-outline" size={18} color="#2e8b57" />}
//     label={lang === "ar" ? "المدرس" : "Instructor"}
//     value={course.instructor?.fullName || "-"}
//     isRTL={isRTL}
//   />

//   <Row
//     icon={<Ionicons name="time-outline" size={18} color="#2e8b57" />}
//     label={lang === "ar" ? "المدة" : "Duration"}
//     value={course.totalDuration || "—"}
//     isRTL={isRTL}
//   />

//   <Row
//     icon={<MaterialIcons name="menu-book" size={18} color="#2e8b57" />}
//     label={lang === "ar" ? "المحاضرات" : "Lectures"}
//     value={course.totalLectures || 0}
//     isRTL={isRTL}
//   />

//   <Row
//     icon={<Feather name="bar-chart-2" size={18} color="#2e8b57" />}
//     label={lang === "ar" ? "المستوى" : "Level"}
//     value={course.level || "-"}
//     isRTL={isRTL}
//   />

//   <Row
//     icon={<Ionicons name="language-outline" size={18} color="#2e8b57" />}
//     label={lang === "ar" ? "اللغة" : "Language"}
//     value={course.language || "English"}
//     isRTL={isRTL}
//   />

//   <Row
//     icon={<Ionicons name="ribbon-outline" size={18} color="#2e8b57" />}
//     label={lang === "ar" ? "شهادة" : "Certificate"}
//     value={course.hasCertificate ? "Yes" : "No"}
//     isRTL={isRTL}
//   />

//   {/* Button */}
//   <TouchableOpacity className="mt-6 rounded-xl bg-emerald-700 py-4">
//     <Text className="text-center text-base font-bold text-white">
//       {lang === "ar" ? "سجل الآن" : "Enroll Now"}
//     </Text>
//   </TouchableOpacity>
// </View>





       
//         </View>
//         </ScrollView>
//   );
// }

import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Modal,
  Alert,
  Share,
  Linking,
  Dimensions,
  Pressable,
} from "react-native";
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import api from "../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swiper from "react-native-swiper";

// Placeholder images - replace with your actual image imports
const profileImages = [
  require("../assets/author-01.jpg"),
  require("../assets/author-02.jpg"),
  require("../assets/author03.jpg"),
  require("../assets/author-04.jpg"),
  require("../assets/author-05.jpg"),
  require("../assets/author-06.jpg"),
];

const { width } = Dimensions.get("window");

const InfoRow = ({ icon, label, value }) => (
  <View className="flex-row items-center justify-between py-4 border-b border-gray-200">
    <View className="flex-row items-center gap-2">
      {icon}
      <Text className="text-black text-sm">{label}</Text>
    </View>
    <Text className="font-medium text-gray-500 text-sm">{value}</Text>
  </View>
);

const CourseDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { courseId} = route.params;
  const { language } = useLanguage();
  const lang = language === "ar" ? "ar" : "en";

  const { addToCart, cartItems, isCartLoading } = useCart();
  const isInCart =
    Array.isArray(cartItems?.items) &&
    cartItems.items.some((item) => item.course?._id === courseId);

  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [isReviewsLoading, setIsReviewsLoading] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");
  console.log(activeTab);
  
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/courses/${courseId}`);
        console.log(response.data);
        
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course:", error);
        Alert.alert("Error", "Failed to load course details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  // Fetch reviews
  const fetchReviews = useCallback(async () => {
    try {
      setIsReviewsLoading(true);
      const res = await api.get(`/reviews/course/${courseId}`);
      console.log(res.data);
      
      setReviews(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("Fetch reviews error:", err.response?.data);
    } finally {
      setIsReviewsLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Add to cart handler
  const handleAddToCart = async () => {
    if (isInCart) return;
    setIsAdding(true);
    try {
      await addToCart(courseId);
      Alert.alert(
        lang === "ar" ? "تم الإضافة" : "Added",
        lang === "ar" ? "تم إضافة الكورس للعربة" : "Course added to cart"
      );
    } catch (error) {
      Alert.alert(
        lang === "ar" ? "خطأ" : "Error",
        lang === "ar" ? "فشل إضافة الكورس" : "Failed to add course"
      );
    } finally {
      setIsAdding(false);
    }
  };

  // Submit review
  const onSubmitReview = async (data) => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      setModalType("error");
      setModalMessage(
        lang === "ar" ? "من فضلك سجل الدخول أولاً" : "Please login first"
      );
      setShowModal(true);
      return;
    }

    try {
      await api.post("/reviews", {
        courseId: courseId,
        comment: data.comment,
        rating: Number(data.rating),
      });
      setModalType("success");
      setModalMessage(
        lang === "ar" ? "تم إرسال التقييم بنجاح" : "Review submitted successfully"
      );
      setShowModal(true);
      reset();
      setIsReviewModalOpen(false);
      fetchReviews();
    } catch (err) {
      console.log("Submit review error:", err.response?.data);
      setModalType("error");
      setModalMessage(err.response?.data.message || "Failed to submit review");
      setShowModal(true);
    }
  };

  // Share course
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this course: ${course?.title}`,
        url: `https://yourapp.com/course/${courseId}`,
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  // Rating stars component
  const RatingStars = ({ rating, size = 16, readonly = true, onRate }) => {
    const stars = [1, 2, 3, 4, 5];
    return (
      <View className="flex-row gap-1">
        {stars.map((star) => (
          <TouchableOpacity
            key={star}
            disabled={readonly}
            onPress={() => !readonly && onRate(star)}
          >
            <Ionicons
              name={star <= rating ? "star" : "star-outline"}
              size={size}
              color="#FFC107"
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#309255" />
      </View>
    );
  }

  if (!course) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-500">Course not found</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView className="flex-1 bg-white">
        {/* Course Image */}
        <Image
          source={{ uri: course.thumbnail }}
          className="w-full h-64"
          resizeMode="cover"
        />

        <View className="px-4 py-6">
          {/* Course Title */}
          <Text className="text-2xl font-bold text-gray-900 mb-3">
            {course.title}
          </Text>

          {/* Instructor & Students Row */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center gap-2">
              <Image
                source={{uri:course.instructor.profilePic}}
                className="w-10 h-10 rounded-full"
              />
              <Text className="text-gray-700 text-sm">
                {course.instructor?.fullName}
              </Text>
            </View>

            <View className="flex-row items-center gap-2">
              <Text className="text-green-600 text-sm font-medium">
                {course.totalEnrollments}{" "}
                {lang === "ar" ? "طالب" : "Students"}
              </Text>
            </View>
          </View>

          {/* Rating */}
          <View className="flex-row items-center gap-2 mb-6">
            <Text className="font-semibold text-gray-700">{course.rating}</Text>
            <RatingStars rating={course.rating} size={18} />
            <Text className="text-gray-500 text-sm">
              ({course.totalRatings} {lang === "ar" ? "تقييم" : "Rating"})
            </Text>
          </View>

          {/* Tabs */}
          <View className="flex-row gap-3 mb-6">
            <Pressable
              onPress={() => setActiveTab("description")}
              className={`flex-1 py-3 rounded-lg border  border-green-600 ${
                activeTab ==="description"
                  ? "bg-main"
                  : "bg-white"
              }`}
            >
              <Text
                className={`text-center font-medium ${
                  activeTab ==="description"
                  ? "text-white" 
                  : "text-black"
                }`}
              >
                {lang === "ar" ? "الوصف" : "Description"}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setActiveTab("reviews")}
              className={`flex-1 py-3 rounded-lg border border-green-600 ${
                activeTab ==="reviews"? " bg-main" : "bg-white"
              }`}
            >
              <Text
                className={`text-center font-medium ${
                  activeTab ==="reviews" ? "text-white" : "text-black"
                }`}
              >
                {lang === "ar" ? "التقييمات" : "Reviews"}
              </Text>
            </Pressable>
          </View>

          {/* Tab Content */}
          {activeTab === "description" ? (
            <View>
              {/* Description */}
              <Text className="text-xl font-bold mb-3">
                {lang === "ar" ? "الوصف" : "Description"}
              </Text>
              <Text className="text-gray-600 mb-6 leading-6">
                {lang === "ar" ? course.description_ar : course.description}
              </Text>

              {/* Curriculum */}
              <Text className="text-xl font-bold mb-3">
                {lang === "ar" ? "المقرر" : "Curriculum"}
              </Text>
              {course.chapters && course.chapters.length > 0 ? (
                <View className="mb-6">
                  {course.chapters.map((item, index) => (
                    <View key={item._id} className="flex-row items-start mb-2">
                      <Text className="text-green-600 mr-2">•</Text>
                      <Text className="text-gray-700 flex-1">
                        {lang === "ar"
                          ? item.chapter.title_ar
                          : item.chapter.title}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text className="text-gray-500 mb-6">
                  {lang === "ar"
                    ? "لا يوجد محتوى للدورة"
                    : "No curriculum available"}
                </Text>
              )}

              {/* Certificate */}
              <Text className="text-xl font-bold mb-3">
                {lang === "ar" ? "الشهادة" : "Certificate"}
              </Text>
              <Text className="text-gray-600 mb-6">
                {lang === "ar"
                  ? "شهادة متاحة بعد إتمام الدورة"
                  : "Certificate available after completion"}
              </Text>
            </View>
          ) : (
            <View>
              {/* Reviews */}
              {isReviewsLoading ? (
                <ActivityIndicator size="large" color="#309255" />
              ) : reviews.length === 0 ? (
                <Text className="text-center text-gray-500 py-8">
                  {lang === "ar" ? "لا يوجد تقييمات بعد" : "No reviews yet"}
                </Text>
              ) : (
                <View style={{ height: 300 }}>
                  <Swiper
                    showsPagination
                    dotColor="#D1D5DB"
                    activeDotColor="#309255"
                    loop={false}
                  >
                    {reviews.map((review) => (
                      <View
                        key={review._id}
                        className="border border-green-200 rounded-2xl p-6 bg-white mx-2"
                      >
                        <View className="flex-row items-center gap-3 mb-4">
                          <Image
                            source={{uri : review.user.profilePic}}
                            className="w-16 h-16 rounded-full"
                          />
                          <View>
                            <Text className="font-semibold text-lg">
                              {review.user?.fullName || "User"}
                            </Text>
                            <RatingStars rating={review.rating} size={16} />
                          </View>
                        </View>
                        <Text className="text-gray-600 leading-6">
                          {review.comment}
                        </Text>
                      </View>
                    ))}
                  </Swiper>
                </View>
              )}

              {/* Write Review Button */}
              <TouchableOpacity
                onPress={() => setIsReviewModalOpen(true)}
                className="bg-green-600 py-3 rounded-lg mt-6"
              >
                <Text className="text-white text-center font-semibold">
                  {lang === "ar" ? "اكتب تقييم" : "Write A Review"}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Course Info Card */}
          <View className="bg-green-50 border border-green-200 rounded-2xl p-6 mt-6">
            {/* Price */}
            <Text className="text-3xl font-bold text-green-700 text-center mb-6">
              ${course.price}
            </Text>

            {/* Info List */}
            <View>
              <InfoRow
                icon={<Ionicons name="person-outline" size={20} color="#309255" />}
                label={lang === "ar" ? "المدرب" : "Instructor"}
                value={course.instructor?.fullName}
              />
              <InfoRow
                icon={<Ionicons name="time-outline" size={20} color="#309255" />}
                label={lang === "ar" ? "المدة" : "Duration"}
                value={course.totalDuration}
              />
              <InfoRow
                icon={<Ionicons name="book-outline" size={20} color="#309255" />}
                label={lang === "ar" ? "المحاضرات" : "Lectures"}
                value={course.totalLectures}
              />
              <InfoRow
                icon={<Ionicons name="bookmark-outline" size={20} color="#309255" />}
                label={lang === "ar" ? "المستوى" : "Level"}
                value={course.level}
              />
              <InfoRow
                icon={<Ionicons name="globe-outline" size={20} color="#309255" />}
                label={lang === "ar" ? "اللغة" : "Language"}
                value={lang}
              />
              <InfoRow
                icon={<Ionicons name="medal-outline" size={20} color="#309255" />}
                label={lang === "ar" ? "الشهادة" : "Certificate"}
                value={lang === "ar" ? "نعم" : "Yes"}
              />
            </View>

            {/* Add to Cart Button */}
            <TouchableOpacity
              onPress={handleAddToCart}
              disabled={isInCart || isCartLoading || isAdding}
              className={`py-4 rounded-lg mt-6 ${
                isInCart || isCartLoading || isAdding
                  ? "bg-gray-400"
                  : "bg-green-600"
              }`}
            >
              {isAdding ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center font-semibold text-base">
                  {isInCart
                    ? lang === "ar"
                      ? "في العربة"
                      : "In Cart"
                    : lang === "ar"
                    ? "أضف إلى العربة"
                    : "Add To Cart"}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Share Course */}
          {/* <View className="mt-6">
            <Text className="text-lg font-semibold mb-3 text-gray-800">
              {lang === "ar" ? "شارك الكورس" : "Share Course"}
            </Text>
            <TouchableOpacity
              onPress={handleShare}
              className="flex-row items-center justify-center gap-2 bg-green-600 py-3 rounded-lg"
            >
              <Ionicons name="share-social-outline" size={20} color="#fff" />
              <Text className="text-white font-medium">
                {lang === "ar" ? "مشاركة" : "Share"}
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>

      {/* Review Modal */}
      <Modal
        visible={isReviewModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsReviewModalOpen(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-4">
          <View className="bg-white rounded-2xl p-6 w-full max-w-md">
            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setIsReviewModalOpen(false)}
              className="absolute top-3 right-3 z-10"
            >
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>

            <Text className="text-xl font-semibold mb-4">
              {lang === "ar" ? "اكتب تقييم" : "Write a Review"}
            </Text>

            {/* Comment Input */}
            <Controller
              control={control}
              name="comment"
              rules={{
                required:
                  lang === "ar" ? "التعليق مطلوب" : "Comment is required",
                minLength: {
                  value: 10,
                  message:
                    lang === "ar"
                      ? "التعليق يجب ألا يقل عن 10 حروف"
                      : "Comment must be at least 10 characters",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={5}
                  placeholder={
                    lang === "ar" ? "اكتب تعليقك..." : "Write your comment..."
                  }
                  className={`border rounded-lg p-4 mb-2 text-base ${
                    errors.comment ? "border-red-500" : "border-green-200"
                  }`}
                  textAlignVertical="top"
                />
              )}
            />
            {errors.comment && (
              <Text className="text-red-500 text-sm mb-4">
                {errors.comment.message}
              </Text>
            )}

            {/* Rating */}
            <View className="items-center mb-4">
              <Controller
                control={control}
                name="rating"
                rules={{
                  validate: (value) =>
                    value > 0 ||
                    (lang === "ar" ? "التقييم مطلوب" : "Rating is required"),
                }}
                render={({ field: { onChange, value } }) => (
                  <RatingStars
                    rating={value}
                    size={32}
                    readonly={false}
                    onRate={onChange}
                  />
                )}
              />
              {errors.rating && (
                <Text className="text-red-500 text-sm mt-2">
                  {errors.rating.message}
                </Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmitReview)}
              disabled={isSubmitting}
              className="bg-green-600 py-3 rounded-lg"
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center font-semibold">
                  {lang === "ar" ? "إرسال التقييم" : "Submit Review"}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success/Error Modal */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-4">
          <View className="bg-white rounded-2xl p-6 w-full max-w-md items-center">
            {/* Icon */}
            <View
              className={`w-16 h-16 rounded-full items-center justify-center mb-4 ${
                modalType === "success" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <Ionicons
                name={modalType === "success" ? "checkmark" : "close"}
                size={32}
                color={modalType === "success" ? "#16A34A" : "#DC2626"}
              />
            </View>

            {/* Message */}
            <Text className="text-center text-gray-700 text-lg mb-6">
              {modalMessage}
            </Text>

            {/* OK Button */}
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              className={`px-6 py-3 rounded-lg ${
                modalType === "success" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              <Text className="text-white font-medium">
                {lang === "ar" ? "حسناً" : "OK"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CourseDetails;
