
import { LanguageContext, useLanguage } from "context/LanguageContext";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
// import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { useContext, useEffect, useState,  } from 'react';
import { useTranslation } from 'react-i18next';
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import CourseCard from "common/CourseCard";
import ScreenWrapper from "components/WrapperScreen";


export default function CoursesScreen() {
  
  const { language } = useContext(LanguageContext);
  
  const { t } = useTranslation();
  
 const { title, cards } = t('courses', { returnObjects: true });
  const [cate, setCate] = useState(
    `${language === "en" ? "UX/UI Design" : "تصميم UX/UI"}`
  );
 const [searchItem, setSearchItem] = useState('');

  // Filter cards based on category and search term
  const filteredCards = cards.filter((c) => {
    const matchesCategory = c.category.toLowerCase() === cate.toLowerCase();
    const matchesSearch = c.title.toLowerCase().includes(searchItem.toLowerCase());
    return matchesCategory && matchesSearch;
  });


  

  useEffect(() => {
    setCate(language === "en" ? "UX/UI Design" : "تصميم UX/UI");
  }, [language]);
 
    return (
       <>
       <ScreenWrapper>
            {/* =============== Hero Section ================*/}
      <View className=" h-[30vh] justify-center bg-lightGreen px-6">
        {/* Content */}
        <View className="flex-row items-center">
          {/* Left content */}
          <View className="flex-1 gap-4">
            {/* Breadcrumbs */}
            {language === 'en' ? (
              <View className="flex-row gap-2">
                <Text className="text-gray-500">Home</Text>
                <Text className="text-gray-400">/</Text>
                <Text className="font-medium text-[#309255]">Courses</Text>
              </View>
            ) : (
              <View className="flex-row gap-2">
                <Text className="text-gray-500">الرئيسية</Text>
                <Text className="text-gray-400">/</Text>
                <Text className="font-medium text-[#309255]">الكورسات</Text>
              </View>
            )}
            {/* Title */}
            {language === 'en' ? (
              <View className="flex-row items-center gap-2">
                <Text className="text-2xl font-medium">Our</Text>
                <Text className="text-2xl font-medium text-[#309255]">Courses</Text>
              </View>
            ) : (
              <View className="flex-row items-center gap-2">
                <Text className="text-4xl font-medium">
                كورساتنا
                 
                </Text>
              </View>
            )}
          </View>

          {/* Right Image */}
          <View className="flex-1 items-end">
            <Image
              source={require('../assets/author03.jpg')}
              className="h-40 w-40 rounded-full"
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
      {/* =============== End Hero Section ================*/}
     

{/* =======================second section=============== */}
     <View className="px-4 py-6 bg-white">

    {/* search */}
     <View
        className="border-gray-200 flex-row items-center rounded-xl 
                     border bg-white px-4
                     py-3 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        {/* Search Icon */}
        <Ionicons name="search" size={20} color="#9CA3AF" />

        {/* Input */}
        <TextInput
          value={searchItem}
          onChangeText={setSearchItem}
          inputMode="search"
          placeholder="Search..."
          placeholderTextColor="#9CA3AF"
          className="text-gray-900 ml-3 flex-1 dark:text-white"
          returnKeyType="search"
        />

        {/* Clear Button */}
        {searchItem.length > 0 && (
          <TouchableOpacity onPress={() => setSearchItem('')}>
            <Ionicons name="close-circle" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      <View className= "bg-[#eefbf3] p-3 rounded-2xl flex-row items-center justify-evenly gap-4">
         <View className="flex-row gap-2">
    {/* All Courses */}
    <TouchableOpacity className="px-3 py-3 rounded-lg bg-[#309255]" >
      <Text className="font-medium text-white">
        {language === "en" ? "All Courses" : "كل الكورسات"}
      </Text>
    </TouchableOpacity>

    {/* programming */}
    <TouchableOpacity className="px-3 py-3 rounded-lg bg-white cursor-pointer" >
      <Text className="font-medium text-black">
        {language === "en" ? "Programming" : "برمجة"}
      </Text>
    </TouchableOpacity>

    {/* Design */}
    <TouchableOpacity className="px-3 py-3 rounded-lg bg-white" >
      <Text className="font-medium text-black">
        {language === "en" ? "Design" : "تصميم"}
      </Text>
    </TouchableOpacity>
   </View>
    </View> 

    {/* Cards */}
    <FlatList
            data={filteredCards}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            renderItem={({ item }) => <CourseCard c={item} />}
            contentContainerStyle={{
              paddingTop: 40,
              paddingBottom: 40,
            }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text className="text-gray-500 py-10 text-center text-xl">
                {language === 'en'
                  ? 'No courses found matching your search'
                  : 'لم يتم العثور على كورسات مطابقة لبحثك'}
              </Text>
            }
          />
         
      </View>


    </ScreenWrapper>
      
       </>
    );
};
