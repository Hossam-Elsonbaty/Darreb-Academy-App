import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from 'context/LanguageContext';
import SectionTitle from 'common/SectionTitle';
import { Ionicons } from '@expo/vector-icons';
import CourseCard from 'common/CourseCard';

export default function Courses() {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const { title, cards } = t('courses', { returnObjects: true });

  const [cate, setCate] = useState(`${language === 'en' ? 'UX/UI Design' : 'تصميم UX/UI'}`);
  const [searchItem, setSearchItem] = useState('');

  // Filter cards based on category and search term
  const filteredCards = cards.filter((c) => {
    const matchesCategory = c.category.toLowerCase() === cate.toLowerCase();
    const matchesSearch = c.title.toLowerCase().includes(searchItem.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    setCate(language === 'en' ? 'UX/UI Design' : 'تصميم UX/UI');
  }, [language]);
  return (
    <View className={` bg-white px-4 ${language === 'en' ? 'items-start' : 'items-end '}`}>
      <SectionTitle
        title={
          language === 'en' ? (
            <Text className="  py-4  text-3xl font-medium capitalize text-main">
              all courses of edule
            </Text>
          ) : (
            <Text className="py-4  text-3xl font-medium text-main">جميع كورسات داررب اكاديمي</Text>
          )
        }
      />

      {/* Search Input  */}
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

      {/* Scrolled Links title */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
        {title.map((cat) => {
          const isActive = cate === cat;

          return (
            <Pressable
              key={cat}
              onPress={() => setCate(cat)}
              className={`mr-3 rounded-xl border px-5 py-2 ${
                isActive ? 'border-main bg-main/10' : 'border-lightGreen bg-white'
              }`}>
              <Text className={`text-lg ${isActive ? 'font-medium text-main' : 'text-gray-700'}`}>
                {cat}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

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
  );
}
