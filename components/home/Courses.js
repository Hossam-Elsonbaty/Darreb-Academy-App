// import {
//   View,
//   Text,
//   TextInput,
//   ScrollView,
//   Pressable,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';
// import React, { useContext, useEffect, useState } from 'react';
// import { LanguageContext } from 'context/LanguageContext';
// import SectionTitle from 'common/SectionTitle';
// import { Ionicons } from '@expo/vector-icons';
// import CourseCard from 'common/CourseCard';
// import api from '../../api/axios';

// export default function Courses() {
//   // const { t } = useTranslation();
//   const { language } = useContext(LanguageContext);
//   const [courses, setCourses] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [cate, setCate] = useState('');
//   const [searchItem, setSearchItem] = useState('');
//   const fetchCourses = async () => {
//     try {
//       const res = await api.get('/courses');
//       setCourses(res.data);
//       console.log(res);
      
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

//   // useEffect(() => {
//   //   setCate(language === 'en' ? 'UX/UI Design' : 'تصميم UX/UI');
//   // }, [language]);
//   return (
//     <View className={` bg-white px-4 items-center`}>
//       <SectionTitle
//         title={
//           language === 'en' ? (
//             <Text className="  py-4  text-3xl font-medium capitalize text-main">
//               all courses of edule
//             </Text>
//           ) : (
//             <Text className="py-4  text-3xl font-medium text-main">جميع كورسات داررب اكاديمي</Text>
//           )
//         }
//       />

//       {/* Search Input  */}
//       <View
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
//           placeholder={language === 'en' ? 'Search...' : 'بحث...'}
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

//       {/* Scrolled Links title */}
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
//         {categories.map((cat,index) => {
//           const isActive = cate === cat;
//           return (
//             <Pressable
//               key={index}
//               onPress={() => setCate(cat)}
//               className={`mr-3 rounded-xl border px-5 py-2 ${
//                 isActive ? 'border-main bg-main/10' : 'border-lightGreen bg-white'
//               }`}>
//               <Text className={`text-lg ${isActive ? 'font-medium text-main' : 'text-gray-700'}`}>
//                 {isRTL ? cat.name_ar : cat.name}
//               </Text>
//             </Pressable>
//           );
//         })}
//       </ScrollView>

//       {/* Cards */}
//       <FlatList
//         data={filteredCourses}
//         keyExtractor={(item) => item._id}
//         ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
//         renderItem={({ item }) => <CourseCard c={item} key={item._id}/>}
//         contentContainerStyle={{
//           paddingTop: 40,
//           paddingBottom: 40,
//         }}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={
//           <Text className="text-gray-500 py-10 text-center text-xl">
//             {language === 'en'
//               ? 'No courses found matching your search'
//               : 'لم يتم العثور على كورسات مطابقة لبحثك'}
//           </Text>
//         }
//       />
//     </View>
//   );
// }
// import React, { useState, useEffect } from "react";
// import { View, Text, TouchableOpacity, TextInput, FlatList, ScrollView, Image } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCourses } from "../../Store/Slices/coursesSlice"; // Adjust the path as necessary
// import CourseCard from "../../common/CourseCard";
// import { useLanguage } from "../../context/LanguageContext";
// import { fetchCategories } from "../../Store/Slices/categoriesSlice";
// import Loader from "../../components/Loader";
// import { Ionicons } from 'react-native-vector-icons'; // Icon library

// const Courses = () => {
//   const { lang } = useLanguage();
//   const [cate, setCate] = useState(0);
//   const [searchTerm, setSearchTerm] = useState("");
//   const dispatch = useDispatch();
//   const { courses, loading, error } = useSelector((state) => state.courses);
//   const { categories } = useSelector((state) => state.categories);
//   const isLoading = useSelector(state => state.loader.isLoading);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     dispatch(fetchCourses());
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   // Filter courses based on the selected category and search term
//   const filteredCourses = courses?.filter((c) => {
//     const matchesCategory = cate === 0 || c.category?._id === String(cate);
//     const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//                 <View className=" h-[30vh] justify-center bg-lightGreen px-6">
//                   {/* Content */}
//                   <View className="flex-row items-center">
//                     {/* Left content */}
//                     <View className="flex-1 gap-4">
//                       {/* Breadcrumbs */}
//                       {/* Title */}
//                       {lang === 'en' ? (
//                         <View className="flex-row items-center gap-2">
//                           <Text className="text-2xl font-medium">Course</Text>
//                           <Text className="text-2xl font-medium text-[#309255]">details</Text>
//                         </View>
//                       ) : (
//                         <View className="flex-row items-center gap-2">
//                           <Text className="text-4xl font-medium">
//                             تفاصيل
//                             <Text className="text-[#309255]">الدوره</Text>
//                           </Text>
//                         </View>
//                       )}
//                     </View>
          
//                     {/* Right Image */}
//                     <View className="flex-1 items-end">
//                       <Image
//                         source={require('../assets/author-04.jpg')}
//                         className="h-40 w-40 rounded-full"
//                         resizeMode="cover"
//                       />
//                     </View>
//                   </View>
//                 </View>

//           <View className="flex flex-row justify-between items-center py-5 px-4 bg-[#eefbf3] rounded-xl mt-6">
//             <TouchableOpacity className="bg-white py-2 px-6 rounded-full border border-[#ddd]" onPress={() => setCate(0)}>
//               <Text className="text-lg text-gray-700">
//                 {lang === "en" ? "All Courses" : "كل الكورسات"}
//               </Text>
//             </TouchableOpacity>

//             {categories?.map((cat) => (
//               <TouchableOpacity
//                 key={cat._id}
//                 className="bg-white py-2 px-6 rounded-full border border-[#ddd] ml-2"
//                 onPress={() => setCate(cat._id)}
//               >
//                 <Text className="text-lg text-gray-700">{lang === "en" ? cat.name : cat.name_ar}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           <View className="flex flex-row items-center mt-6 py-3 px-5 border border-[#ddd] rounded-xl">
//             <TextInput
//               className="flex-1 py-3 px-3 text-lg"
//               placeholder={lang === "en" ? "Search for courses" : "ابحث عن كورسات"}
//               value={searchTerm}
//               onChangeText={setSearchTerm}
//             />
//             <TouchableOpacity className="bg-[#309255] rounded-full p-3">
//               <Ionicons name="search" size={24} color="white" />
//             </TouchableOpacity>
//           </View>

//           {loading && (
//             <View className="py-5 text-center text-xl text-gray-500">
//               <Text>{lang === "en" ? "Loading courses..." : "جاري تحميل الكورسات..."}</Text>
//             </View>
//           )}

//           {error && (
//             <View className="py-5 text-center text-xl text-red-500">
//               <Text>{lang === "en" ? "Error fetching courses!" : "حدث خطأ أثناء جلب الكورسات!"}</Text>
//             </View>
//           )}

//           {/* Courses Cards */}
//           <FlatList
//             contentContainerStyle="px-5 py-10"
//             data={filteredCourses}
//             keyExtractor={(item) => item._id}
//             renderItem={({ item }) => <CourseCard c={item} />}
//             ListEmptyComponent={
//               <View className="text-center py-10 text-gray-500 text-xl">
//                 <Text>{lang === "en" ? "No courses found matching your search" : "لم يتم العثور على كورسات مطابقة لبحثك"}</Text>
//               </View>
//             }
//           />
//         </ScrollView>
//       )}
//     </>
//   );
// };

// export default Courses;

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { fetchCourses } from '../../Store/Slices/coursesSlice';
import { fetchCategories } from '../../Store/Slices/categoriesSlice';
import CourseCard from '../../common/CourseCard';
import { useLanguage } from '../../context/LanguageContext';
import Loader from '../../components/Loader';

const Categories = ({navigation}) => {
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

  // Filter courses based on category and search term
  const filteredCourses = (courses || []).filter((c) => {
    const matchesCategory = cate === 0 || String(c.category?._id) === String(cate);
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderHeader = () => (
    <View className="bg-white px-4 py-5">
      {/* Title */}
      <View className="mb-6">
        {language === 'en' ? (
          <Text className="text-4xl font-medium capitalize">
            all <Text className="text-[#309255]">courses</Text> of Darreb Academy
          </Text>
        ) : (
          <Text className="text-4xl font-medium">
            جميع <Text className="text-[#309255]">كورسات</Text> داررب اكاديمي
          </Text>
        )}
      </View>

      {/* Search Bar */}
      <View className="border rounded-2xl border-[#ddd] px-3 py-1 flex-row justify-between items-center mb-6">
        <TextInput
          className="flex-1 py-3 px-2 text-base"
          placeholder={language === 'en' ? 'Search for courses' : 'ابحث عن كورسات'}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity className="bg-[#309255] rounded p-3">
          <Ionicons name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Categories Horizontal Scroll */}
      <View className="bg-[#eefbf3] rounded-2xl py-5 mb-6">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {/* All Courses Button */}
          <TouchableOpacity
            className={`px-6 py-3 rounded-2xl bg-white border mr-3 ${
              cate === 0 ? 'text-[#309255] border-[#309255]' : 'border-[#ddd]'
            }`}
            onPress={() => setCate(0)}
          >
            <Text 
              className={`text-lg text-center ${
                cate === 0 ? 'text-[#309255]' : 'text-gray-700'
              }`}
            >
              {language === 'en' ? 'All Courses' : 'كل الكورسات'}
            </Text>
          </TouchableOpacity>

          {/* Category Buttons */}
          {categories?.map((cat) => (
            <TouchableOpacity
              key={cat._id}
              className={`px-6 py-3 rounded-2xl bg-white border mr-3 ${
                cate === cat._id ? 'border-[#309255]' : 'border-[#ddd]'
              }`}
              onPress={() => setCate(cat._id)}
            >
              <Text
                className={`text-lg text-center ${
                  cate === cat._id ? 'text-[#309255]' : 'text-gray-700'
                }`}
              >
                {language === 'en' ? cat.name : cat.name_ar}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Loading State */}
      {loading && (
        <View className="py-5">
          <Text className="text-center text-xl text-gray-500">
            {language === 'en' ? 'Loading courses...' : 'جاري تحميل الكورسات...'}
          </Text>
        </View>
      )}

      {/* Error State */}
      {error && (
        <View className="py-5">
          <Text className="text-center text-xl text-red-500">
            {language === 'en' ? 'Error fetching courses!' : 'حدث خطأ أثناء جلب الكورسات!'}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          ListHeaderComponent={renderHeader}
          data={filteredCourses}
          keyExtractor={(item) => item._id}
          numColumns={1}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View className="mb-6">
              <CourseCard c={item} navigation={navigation}/>
            </View>
          )}
          ListEmptyComponent={
            !loading && (
              <View className="py-10">
                <Text className="text-center text-xl text-gray-500">
                  {language === 'en'
                    ? 'No courses found matching your search'
                    : 'لم يتم العثور على كورسات مطابقة لبحثك'}
                </Text>
              </View>
            )
          }
        />
      )}
    </View>
  );
};

export default Categories;