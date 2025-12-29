// import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useCart } from '../context/CartContext';
// import { useWishlist } from '../context/WishlistContext';
// import { useLanguage } from '../context/LanguageContext';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';

// export default function Cart() {
//   const { toggleWishlist } = useWishlist();
//   const { language } = useLanguage();
//   const navigation = useNavigation();

//   const isRTL = language === 'ar';

//   const total = cartItems.reduce(
//     (sum, item) => sum + Number(item.course?.price || 0),
//     0
//   );
//   const { setShowModal, setModalType, setModalMessage,removeFromCart, getCart, cartItems,setCartItems } = useCart(); 
//   // const [cartItems, setCartItems] = useState([]);

//   return (
//     <ScrollView className="flex-1 bg-white px-4 py-4">
//       <Text className="mb-4 text-3xl font-bold">
//         {isRTL ? 'عربة التسوق' : 'Shopping Cart'}
//       </Text>

//       {cartItems.length === 0 ? (
//         <Text className="text-center text-gray-500 mt-10 text-lg">
//           {isRTL ? 'سلة التسوق فارغة' : 'Cart is empty'}
//         </Text>
//       ) : (
//         cartItems.map(item => (
//           <View
//             key={item._id}
//             className="mb-4 rounded-xl border border-gray-200 bg-white p-4"
//           >
//             <View className="flex-row justify-between">
//               <View>
//                 <TouchableOpacity
//                   onPress={() => removeFromCart(item._id)}
//                   className="mb-3 flex-row items-center"
//                 >
//                   <Ionicons name="trash-outline" size={20} color="red" />
//                   <Text className="ml-2 text-red-500">
//                     {isRTL ? 'إزالة' : 'Remove'}
//                   </Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   onPress={async () => {
//                     await toggleWishlist(item.course);
//                     await removeFromCart(item._id);
//                     navigation.navigate('Wishlist');
//                   }}
//                 >
//                   <Text className="text-main">
//                     {isRTL ? 'نقل للمفضلة' : 'Move to wishlist'}
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//               <Image
//                 source={{ uri: item.course.thumbnail }}
//                 className="h-24 w-40 rounded-lg"
//               />
//             </View>

//             <Text
//               className="mt-4 text-lg font-bold"
//               style={{ textAlign: isRTL ? 'left' : 'right' }}
//             >
//               {item.course.title}
//             </Text>

//             <Text style={{ textAlign: isRTL ? 'left' : 'right' }}>
//               {item.course.instructor?.fullName}
//             </Text>

//             <Text style={{ textAlign: isRTL ? 'left' : 'right' }}>
//               {item.course.category}
//             </Text>

//             <Text
//               className="mt-2 text-xl font-bold text-main"
//               style={{ textAlign: isRTL ? 'left' : 'right' }}
//             >
//               £E{item.course.price}
//             </Text>
//           </View>
//         ))
//       )}

//       <View className="mt-6">
//         <Text style={{ textAlign: isRTL ? 'left' : 'right' }}>
//           {isRTL ? 'المجموع:' : 'Total:'}
//         </Text>
//         <Text
//           className="text-2xl font-bold"
//           style={{ textAlign: isRTL ? 'left' : 'right' }}
//         >
//           £E{total.toFixed(2)}
//         </Text>
//       </View>

//       <TouchableOpacity className="mt-5 rounded-lg bg-green-600 py-4 items-center">
//         <Text className="text-lg font-bold text-white">
//           {isRTL ? 'المتابعة إلى الدفع' : 'Proceed to Checkout'}
//         </Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
// } from "react-native";
// import { Feather } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { useSelector } from "react-redux";
// import api from "../api/axios";
// import i18n from "../i18n";

// const Cart = () => {
//   const navigation = useNavigation();
//   const {
//     setShowModal,
//     setModalType,
//     setModalMessage,
//     removeFromCart,
//     getCart,
//     cartItems,
//     setCartItems,
//   } = useCart();
//   const { toggleWishlist } = useWishlist();
//   const isLoading = useSelector((state) => state.loader.isLoading);

//   useEffect(() => {
//     getCart();
//   }, []);
//   const makePayment = async () => {
//     const body = {
//       products: cartItems.items,
//     };
//     try {
//       const response = await api.post("/payment/create-checkout-session", body);
//       console.log(response.data);
//       if (response.data.user) {
//         // Store user data using AsyncStorage in React Native
//         // await AsyncStorage.setItem("userData", JSON.stringify(response.data.user));
//       }
//       setCartItems([]);
//       // Open payment URL using Linking or WebView
//       // Linking.openURL(response.data.url);
//     } catch (error) {
//       console.error(
//         "Error in payment checkout:",
//         error.response ? error.response.data : error.message
//       );
//     }
//   };

//   const moveToWishlist = async (course) => {
//     try {
//       await toggleWishlist(course);
//       setModalType("success");
//       setModalMessage(
//         i18n.language === "ar"
//           ? "تم نقل الكورس للمفضلة"
//           : "Course moved to wishlist"
//       );
//       setShowModal(true);
//       navigation.navigate("Wishlist");
//     } catch (error) {
//       console.log(error);
//       setModalType("error");
//       setModalMessage(
//         i18n.language === "ar"
//           ? "حدث خطأ، حاول مرة أخرى"
//           : "Something went wrong, try again"
//       );
//       setShowModal(true);
//     }
//   };

//   if (isLoading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-white">
//         <ActivityIndicator size="large" color="#309255" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView className="flex-1 bg-white">
//       <View className="w-[90%] mx-auto py-10">
//         <Text className="text-3xl font-bold mb-2">
//           {i18n.language === "ar" ? "عربة التسوق" : "Shopping Cart"}
//         </Text>

//         <Text className="text-gray-500 mb-8">
//           {cartItems?.items?.length || 0}{" "}
//           {i18n.language === "ar" ? "دورات في عربة التسوق" : "Courses in Cart"}
//         </Text>

//         {/* CART ITEMS */}
//         <View>
//           {cartItems && cartItems.items?.length > 0 ? (
//             cartItems.items.map((item) => (
//               <View
//                 key={item._id}
//                 className="flex-row gap-4 border-b border-gray-200 py-6"
//               >
//                 <Image
//                   source={{ uri: item.course.thumbnail || "" }}
//                   className="w-40 h-24 rounded"
//                   resizeMode="cover"
//                 />

//                 <View className="flex-1">
//                   <Text className="font-bold text-base">
//                     {item.course.title || ""}
//                   </Text>

//                   <Text className="text-sm text-gray-500 mt-1">
//                     {item.course.instructor?.fullName || ""}
//                   </Text>

//                   <View className="flex-row items-center gap-2 mt-2">
//                     <Text className="font-semibold text-sm">
//                       {item.course.totalRatings || 0}
//                     </Text>
//                     <Text className="text-yellow-500 text-sm">★★★★★</Text>
//                     <Text className="text-gray-500 text-sm">
//                       ({item.course.totalRatings || 0})
//                     </Text>
//                   </View>
//                 </View>

//                 <View className="items-end gap-3">
//                   <TouchableOpacity
//                     onPress={() => removeFromCart(item.course._id)}
//                     className="flex-row items-center gap-1"
//                   >
//                     <Feather name="trash-2" size={16} color="#ef4444" />
//                     <Text className="text-red-500 text-sm">
//                       {i18n.language === "ar" ? "إزالة" : "Remove"}
//                     </Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity onPress={() => moveToWishlist(item.course)}>
//                     <Text className="text-green-500 text-sm">
//                       {i18n.language === "ar"
//                         ? "نقل للمفضلة"
//                         : "Move To Wishlist"}
//                     </Text>
//                   </TouchableOpacity>

//                   <Text className="font-bold text-lg mt-2">
//                     £E{item.course?.price || 0}
//                   </Text>
//                 </View>
//               </View>
//             ))
//           ) : (
//             <View className="w-full items-center justify-center gap-5 py-10">
//               <Text className="font-bold text-xl">Cart is Empty</Text>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate("Courses")}
//                 className="bg-[#309255] px-6 py-3 rounded-lg"
//               >
//                 <Text className="text-white text-xl text-center">
//                   Browse Our Courses
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>

//         {/* TOTAL & CHECKOUT */}
//         <View className="pt-6 gap-4">
//           <View>
//             <Text className="text-gray-500">
//               {i18n.language === "ar" ? "المجموع:" : "Total:"}
//             </Text>
//             <Text className="text-3xl font-bold">
//               £E{cartItems.totalPrice}
//             </Text>
//           </View>
//           {cartItems?.items?.length > 0 && (
//             <TouchableOpacity
//               onPress={makePayment}
//               className="w-full bg-green-500 py-3 rounded items-center active:bg-green-700"
//             >
//               <Text className="text-white font-semibold text-base">
//                 {i18n.language === "ar"
//                   ? "المتابعة إلى الدفع"
//                   : "Proceed to Checkout →"}
//               </Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default Cart;
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Linking,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useSelector } from "react-redux";
import api from "../api/axios";
import i18n from "../i18n";
import ToasterContext from "../context/ToasterContext";

const Cart = () => {
  const navigation = useNavigation();
  const {
    removeFromCart,
    getCart,
    cartItems,
    setCartItems,
  } = useCart();
  const { toggleWishlist, removeFromWishlist } = useWishlist();
  const { setShowModal, setModalType,setModalMessage } = useContext(ToasterContext);
  const isLoading = useSelector((state) => state.loader.isLoading);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  // const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  // const [courseToDelete, setCourseToDelete] = useState(null);

  useEffect(() => {
    getCart();
  }, []);

  // Handle delete confirmation
  const handleDelete = (courseId) => {
    Alert.alert(
      i18n.language === "ar" ? "تأكيد الحذف" : "Confirm Delete",
      i18n.language === "ar"
        ? "هل تريد حذف هذا الكورس من العربة؟"
        : "Are you sure you want to remove this course from cart?",
      [
        {
          text: i18n.language === "ar" ? "إلغاء" : "Cancel",
          style: "cancel",
        },
        {
          text: i18n.language === "ar" ? "حذف" : "Delete",
          onPress: () => confirmDelete(courseId),
          style: "destructive",
        },
      ]
    );
  };

  const confirmDelete = async (courseId) => {
    try {
      await removeFromCart(courseId);
      setModalType("success");
      setModalMessage(
        i18n.language === "ar"
          ? "تم حذف الكورس من العربة"
          : "Course removed from cart"
      );
      setShowModal(true);
    } catch (error) {
      console.error("Error removing from cart:", error);
      setModalType("error");
      setModalMessage(
        i18n.language === "ar"
          ? "حدث خطأ أثناء الحذف"
          : "Error removing course"
      );
      setShowModal(true);
    }
  };

  // Payment with Stripe
  const makePayment = async () => {
    if (!cartItems?.items || cartItems.items.length === 0) {
      Alert.alert(
        i18n.language === "ar" ? "عربة فارغة" : "Empty Cart",
        i18n.language === "ar"
          ? "لا يوجد كورسات في العربة"
          : "No courses in cart"
      );
      return;
    }

    setIsProcessingPayment(true);

    const body = {
      products: cartItems.items,
    };

    try {
      const response = await api.post("/payment/create-checkout-session", body);
      console.log("Payment response:", response.data);

      // Store user data if returned
      if (response.data.user) {
        await AsyncStorage.setItem(
          "userData",
          JSON.stringify(response.data.user)
        );
      }

      // Check if we have a payment URL
      if (response.data.url) {
        // Open Stripe checkout URL
        const supported = await Linking.canOpenURL(response.data.url);

        if (supported) {
          await Linking.openURL(response.data.url);
          
          // Clear cart after successful payment initiation
          setCartItems({ items: [], totalPrice: 0 });
          
          // Show success message
          Alert.alert(
            i18n.language === "ar" ? "جاري التحويل" : "Redirecting",
            i18n.language === "ar"
              ? "جاري تحويلك لصفحة الدفع..."
              : "Redirecting to payment page...",
            [
              {
                text: "OK",
                onPress: () => navigation.navigate("Home"),
              },
            ]
          );
        } else {
          throw new Error("Cannot open payment URL");
        }
      } else {
        throw new Error("No payment URL received");
      }
    } catch (error) {
      console.error(
        "Error in payment checkout:",
        error.response ? error.response.data : error.message
      );

      Alert.alert(
        i18n.language === "ar" ? "خطأ في الدفع" : "Payment Error",
        i18n.language === "ar"
          ? "حدث خطأ أثناء معالجة الدفع. حاول مرة أخرى."
          : "An error occurred while processing payment. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Move course to wishlist
  const moveToWishlist = async (course) => {
    try {
      // Add to wishlist
      await toggleWishlist(course);
      
      // Remove from cart
      await removeFromCart(course._id);

      setModalType("success");
      setModalMessage(
        i18n.language === "ar"
          ? "تم نقل الكورس للمفضلة"
          : "Course moved to wishlist"
      );
      setShowModal(true);

      // Navigate to wishlist
      setTimeout(() => {
        navigation.navigate("Wishlist");
      }, 1000);
    } catch (error) {
      console.error("Error moving to wishlist:", error);
      setModalType("error");
      setModalMessage(
        i18n.language === "ar"
          ? "حدث خطأ، حاول مرة أخرى"
          : "Something went wrong, try again"
      );
      setShowModal(true);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#309255" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="w-[90%] mx-auto py-10">
        <Text className="text-3xl font-bold mb-2">
          {i18n.language === "ar" ? "عربة التسوق" : "Shopping Cart"}
        </Text>

        <Text className="text-gray-500 mb-8">
          {cartItems?.items?.length || 0}{" "}
          {i18n.language === "ar" ? "دورات في عربة التسوق" : "Courses in Cart"}
        </Text>

        {/* CART ITEMS */}
        <View>
          {cartItems && cartItems.items?.length > 0 ? (
            cartItems.items.map((item) => (
              <View
                key={item._id}
                className="flex-row gap-4 border-b border-gray-200 py-6"
              >
                <Image
                  source={{ uri: item.course.thumbnail || "" }}
                  className="w-40 h-24 rounded"
                  resizeMode="cover"
                />

                <View className="flex-1">
                  <Text className="font-bold text-base" numberOfLines={2}>
                    {item.course.title || ""}
                  </Text>

                  <Text className="text-sm text-gray-500 mt-1">
                    {item.course.instructor?.fullName || ""}
                  </Text>

                  <View className="flex-row items-center gap-2 mt-2">
                    <Text className="font-semibold text-sm">
                      {item.course.totalRatings || 0}
                    </Text>
                    <Text className="text-yellow-500 text-sm">★★★★★</Text>
                    <Text className="text-gray-500 text-sm">
                      ({item.course.totalRatings || 0})
                    </Text>
                  </View>
                </View>

                <View className="items-end gap-3 justify-between">
                  <View className="gap-2">
                    <TouchableOpacity
                      onPress={() => handleDelete(item.course._id)}
                      className="flex-row items-center gap-1"
                    >
                      <Feather name="trash-2" size={16} color="#ef4444" />
                      <Text className="text-red-500 text-sm">
                        {i18n.language === "ar" ? "إزالة" : "Remove"}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => moveToWishlist(item.course)}
                    >
                      <Text className="text-green-500 text-sm">
                        {i18n.language === "ar"
                          ? "نقل للمفضلة"
                          : "Move To Wishlist"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Text className="font-bold text-lg">
                    £E{item.course?.price || 0}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View className="w-full items-center justify-center gap-5 py-10">
              <Feather name="shopping-cart" size={64} color="#D1D5DB" />
              <Text className="font-bold text-xl text-gray-700">
                {i18n.language === "ar" ? "العربة فارغة" : "Cart is Empty"}
              </Text>
              <Text className="text-gray-500 text-center px-4">
                {i18n.language === "ar"
                  ? "لم تقم بإضافة أي كورسات بعد"
                  : "You haven't added any courses yet"}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Courses")}
                className="bg-[#309255] px-6 py-3 rounded-lg mt-4"
              >
                <Text className="text-white text-lg text-center font-semibold">
                  {i18n.language === "ar"
                    ? "تصفح الكورسات"
                    : "Browse Our Courses"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* TOTAL & CHECKOUT */}
        {cartItems?.items?.length > 0 && (
          <View className="pt-6 gap-4 border-t border-gray-200 mt-6">
            <View>
              <Text className="text-gray-500 text-base">
                {i18n.language === "ar" ? "المجموع:" : "Total:"}
              </Text>
              <Text className="text-3xl font-bold text-gray-900">
                £E{cartItems?.totalPrice || 0}
              </Text>
            </View>

            <TouchableOpacity
              onPress={makePayment}
              disabled={isProcessingPayment}
              className={`w-full py-4 rounded-lg items-center ${
                isProcessingPayment ? "bg-gray-400" : "bg-green-500"
              }`}
            >
              {isProcessingPayment ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-semibold text-base">
                  {i18n.language === "ar"
                    ? "المتابعة إلى الدفع"
                    : "Proceed to Checkout →"}
                </Text>
              )}
            </TouchableOpacity>

            {/* Security Badge */}
            <View className="flex-row items-center justify-center gap-2 mt-2">
              <Feather name="lock" size={16} color="#6B7280" />
              <Text className="text-sm text-gray-500">
                {i18n.language === "ar"
                  ? "دفع آمن ومشفر"
                  : "Secure encrypted payment"}
              </Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Cart;