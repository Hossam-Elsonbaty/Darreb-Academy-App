import { View, Text, Image } from 'react-native';
import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from 'context/LanguageContext';
import SectionTitle from 'common/SectionTitle';

const iconImages = [
  require('../../assets/transparency.png'),
  require('../../assets/exam.png'),
  require('../../assets/achieve.png'),
];

export default function Works() {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  let work = t('work', { returnObjects: true });

  return (
    <View className={` bg-white px-4 ${language === 'en' ? 'items-start' : 'items-end '}`}>
      <SectionTitle
        title={
          language === 'en' ? (
            <Text className="  py-4  text-3xl font-medium capitalize text-main">How it works</Text>
          ) : (
            <Text className="py-4  text-3xl font-medium text-main"> كيف تعمل المنصة</Text>
          )
        }
      />

      {work.map((w) => (
        <View key={w.id} className="my-3 flex-col items-center gap-3 bg-lightGreen p-4">
          <View className=" rounded-full bg-white p-5">
            <Image source={iconImages[w.id - 1]} contentFit="cover" className="h-10 w-10" />
          </View>
          <Text className="text-2xl font-medium text-main">{w.title}</Text>
          <Text className="text-center text-dark">{w.desc}</Text>
        </View>
      ))}
    </View>
  );
}
