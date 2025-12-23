import { View, Text, Image, FlatList } from 'react-native';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import SectionTitle from 'common/SectionTitle';
import { LanguageContext } from 'context/LanguageContext';
import Rating from 'common/Rating';

const authorImages = [
  require('../../assets/author-04.jpg'),
  require('../../assets/author-05.jpg'),
  require('../../assets/author-06.jpg'),
];

export default function Testimonials() {
  const { t } = useTranslation();
  const testimonials = t('testimonials', { returnObjects: true });
  const { language } = useContext(LanguageContext);
  return (
    <View className={` bg-white px-4 ${language === 'en' ? 'items-start' : 'items-end '}`}>
      <SectionTitle
        title={
          language === 'en' ? (
            <Text className="  py-4  text-3xl font-medium capitalize text-main">
              Feedback from strudents
            </Text>
          ) : (
            <Text className="py-4  text-3xl font-medium text-main">اراء طلابنا</Text>
          )
        }
      />
      <FlatList
        data={testimonials}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        renderItem={({ item, index }) => (
          <View className="mr-4 w-72 rounded-lg border border-gray/10 bg-white p-4">
            <Image
              source={authorImages[index % authorImages.length]}
              className="mx-auto mb-4 h-20 w-20 rounded-full border-2 border-main/20"
            />

            <Rating value={item.rating} />

            <Text className="text-gray-600 mt-3 text-sm leading-relaxed text-center">{item.desc}</Text>
          </View>
        )}
      />
    </View>
  );
}
