import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from 'context/LanguageContext';
import SectionTitle from 'common/SectionTitle';
import CourseCard from 'common/CourseCard';

export default function News() {
  const { t } = useTranslation();
  const news = t('news', { returnObjects: true });
  const { language } = useContext(LanguageContext);
  return (
    <View className={` bg-white my-3 px-4 ${language === 'en' ? 'items-start' : 'items-end '}`}>
      <SectionTitle
        title={
          language === 'en' ? (
            <Text className="  py-4  text-3xl font-medium capitalize text-main">
              {' '}
              Educational Tips & Tricks
            </Text>
          ) : (
            <Text className="py-4  text-3xl font-medium text-main"> نصائح تعليمية و حيل</Text>
          )
        }
      />

      <View>
        {news.map((c,i) => (
          <View key={i} className='mb-3 '>
            <CourseCard c={c} status="news" />
          </View>
        ))}
      </View>
    </View>
  );
}
