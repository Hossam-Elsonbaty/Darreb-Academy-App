// import { LanguageContext, useLanguage } from "context/LanguageContext";
// import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
// // import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// import { useContext, useEffect, useState,  } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Ionicons } from "@expo/vector-icons";
// import { FlatList } from "react-native-gesture-handler";
// import CourseCard from "../common/CourseCard";
// import ScreenWrapper from "../components/WrapperScreen";
// import api from "api/axios";

// export default function CoursesScreen() {

//   const { language } = useContext(LanguageContext);

//   const { t } = useTranslation();
//   const [courses, setCourses] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [cate, setCate] = useState('');
//   const [searchItem, setSearchItem] = useState('');
//   const fetchCourses = async () => {
//     try {
//       const res = await api.get('/courses');
//       setCourses(res.data);

//       const cats = [...new Set(res.data.map((c) => c.category))];
//       setCategories(cats);
//       if (cats.length > 0) setCate(cats[0]);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     fetchCourses();
//   }, [language]);
//   const filteredCourses = courses.filter((c) => {
//     const matchesCategory = c.category === cate;
//     const matchesSearch = c.title.toLowerCase().includes(searchItem.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   const isRTL = language === 'ar';

//     return (
//        <>
//        <ScreenWrapper>
//             {/* =============== Hero Section ================*/}
//       <View className=" h-[30vh] justify-center bg-lightGreen px-6">
//         {/* Content */}
//         <View className="flex-row items-center">
//           {/* Left content */}
//           <View className="flex-1 gap-4">
//             {/* Breadcrumbs */}
//             {language === 'en' ? (
//               <View className="flex-row gap-2">
//                 <Text className="text-gray-500">Home</Text>
//                 <Text className="text-gray-400">/</Text>
//                 <Text className="font-medium text-[#309255]">Courses</Text>
//               </View>
//             ) : (
//               <View className="flex-row gap-2">
//                 <Text className="text-gray-500">الرئيسية</Text>
//                 <Text className="text-gray-400">/</Text>
//                 <Text className="font-medium text-[#309255]">الكورسات</Text>
//               </View>
//             )}
//             {/* Title */}
//             {language === 'en' ? (
//               <View className="flex-row items-center gap-2">
//                 <Text className="text-2xl font-medium">Our</Text>
//                 <Text className="text-2xl font-medium text-[#309255]">Courses</Text>
//               </View>
//             ) : (
//               <View className="flex-row items-center gap-2">
//                 <Text className="text-4xl font-medium">
//                 كورساتنا

//                 </Text>
//               </View>
//             )}
//           </View>

//           {/* Right Image */}
//           <View className="flex-1 items-end">
//             <Image
//               source={require('../assets/author03.jpg')}
//               className="h-40 w-40 rounded-full"
//               resizeMode="cover"
//             />
//           </View>
//         </View>
//       </View>
//       {/* =============== End Hero Section ================*/}

// {/* =======================second section=============== */}
//      <View className="px-4 py-6 bg-white">

//     {/* search */}
//      <View
//         className="border-gray-200 flex-row items-center rounded-xl
//                      border bg-white px-4
//                      py-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
//         {/* Search Icon */}
//         <Ionicons name="search" size={20} color="#9CA3AF" />

//         {/* Input */}
//         <TextInput
//           value={searchItem}
//           onChangeText={setSearchItem}
//           inputMode="search"
//           placeholder="Search..."
//           placeholderTextColor="#9CA3AF"
//           className="text-gray-900 ml-3 flex-1 dark:text-white"
//           returnKeyType="search"
//         />

//         {/* Clear Button */}
//         {searchItem.length > 0 && (
//           <TouchableOpacity onPress={() => setSearchItem('')}>
//             <Ionicons name="close-circle" size={20} color="#9CA3AF" />
//           </TouchableOpacity>
//         )}
//       </View>

//       <View className= "bg-[#eefbf3] p-3 rounded-2xl flex-row items-center justify-evenly gap-4">
//          <View className="flex-row gap-2">
//     {/* All Courses */}
//     <TouchableOpacity className="px-3 py-3 rounded-lg bg-[#309255]" >
//       <Text className="font-medium text-white">
//         {language === "en" ? "All Courses" : "كل الكورسات"}
//       </Text>
//     </TouchableOpacity>

//     {/* programming */}
//     <TouchableOpacity className="px-3 py-3 rounded-lg bg-white cursor-pointer" >
//       <Text className="font-medium text-black">
//         {language === "en" ? "Programming" : "برمجة"}
//       </Text>
//     </TouchableOpacity>

//     {/* Design */}
//     <TouchableOpacity className="px-3 py-3 rounded-lg bg-white" >
//       <Text className="font-medium text-black">
//         {language === "en" ? "Design" : "تصميم"}
//       </Text>
//     </TouchableOpacity>
//    </View>
//     </View>

//     {/* Cards */}
//      <FlatList
//             data={filteredCourses}
//             keyExtractor={(item) => item._id}
//             ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
//             renderItem={({ item }) => <CourseCard c={item} />}
//             contentContainerStyle={{
//               paddingTop: 40,
//               paddingBottom: 40,
//             }}
//             showsVerticalScrollIndicator={false}
//             ListEmptyComponent={
//               <Text className="text-gray-500 py-10 text-center text-xl">
//                 {language === 'en'
//                   ? 'No courses found matching your search'
//                   : 'لم يتم العثور على كورسات مطابقة لبحثك'}
//               </Text>
//             }
//           />

//       </View>

//     </ScreenWrapper>

//        </>
//     );
// };
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../Store/Slices/coursesSlice'; // Adjust the path as necessary
import CourseCard from '../common/CourseCard';
import { useLanguage } from '../context/LanguageContext';
import { fetchCategories } from '../Store/Slices/categoriesSlice';
import Loader from '../components/Loader';
import { Ionicons } from 'react-native-vector-icons'; // Icon library
import Footer from '../components/Footer';

const Courses = ({navigation}) => {
  const { language } = useLanguage();
  const [cate, setCate] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);
  const { categories } = useSelector((state) => state.categories);
  const isLoading = useSelector((state) => state.loader.isLoading);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Filter courses based on the selected category and search term
  const filteredCourses = courses?.filter((c) => {
    const matchesCategory = cate === 0 || c.category?._id === String(cate);
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View>
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              <View className=" h-[30vh] justify-center bg-lightGreen px-6">
                {/* Content */}
                <View className="flex-row items-center">
                  {/* Left content */}
                  <View className="flex-1 gap-4">
                    {/* Title */}
                    {language === 'en' ? (
                      <View className="flex-row items-center gap-2">
                        <Text className="text-2xl font-medium">Course</Text>
                        <Text className="text-2xl font-medium text-[#309255]">Details</Text>
                      </View>
                    ) : (
                      <View className="flex-row items-center gap-2">
                        <Text className="text-4xl font-medium">
                          تفاصيل
                          <Text className="text-[#309255]">الدورة</Text>
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Right Image */}
                  <View className="flex-1 items-end">
                    <Image
                      source={require('../assets/author-04.jpg')}
                      className="h-40 w-40 rounded-full"
                      resizeMode="cover"
                    />
                  </View>
                </View>
              </View>

              <View className="mt-6 flex flex-row items-center justify-between rounded-xl bg-[#eefbf3] px-4 py-5">
                <TouchableOpacity
                  className="rounded-full border border-[#ddd] bg-white px-6 py-2"
                  onPress={() => setCate(0)}>
                  <Text className="text-gray-700 text-lg">
                    {language === 'en' ? 'All Courses' : 'كل الكورسات'}
                  </Text>
                </TouchableOpacity>

                {categories?.map((cat,index) => (
                  <TouchableOpacity
                    key={index}
                    className="ml-2 rounded-full border border-[#ddd] bg-white px-6 py-2"
                    onPress={() => setCate(cat._id)}>
                    <Text className="text-gray-700 text-lg">
                      {language === 'en' ? cat.name : cat.name_ar}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View className="m-6 flex flex-row items-center rounded-xl border border-[#ddd] px-5 py-3">
                <TextInput
                  className="flex-1 px-3 py-3 text-lg"
                  placeholder={language === 'en' ? 'Search for courses' : 'ابحث عن كورسات'}
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                />
                <TouchableOpacity className="rounded-full bg-[#309255] p-3">
                  <Ionicons name="search" size={24} color="white" />
                </TouchableOpacity>
              </View>

              {loading && (
                <View className="text-gray-500 py-5 text-center text-xl">
                  <Text>{language === 'en' ? 'Loading courses...' : 'جاري تحميل الكورسات...'}</Text>
                </View>
              )}

              {error && (
                <View className="py-5 text-center text-xl text-red-500">
                  <Text>
                    {language === 'en' ? 'Error fetching courses!' : 'حدث خطأ أثناء جلب الكورسات!'}
                  </Text>
                </View>
              )}
            </>
          }
          data={filteredCourses}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <CourseCard c={item}  navigation = {navigation}/>}
          ListEmptyComponent={
            <View className="text-gray-500 py-10 text-center text-xl">
              <Text>
                {language === 'en'
                  ? 'No courses found matching your search'
                  : 'لم يتم العثور على كورسات مطابقة لبحثك'}
              </Text>
            </View>
          }
          ListFooterComponent={<Footer/>}
          />
        )}
        
    </View>
  );
};

export default Courses;
