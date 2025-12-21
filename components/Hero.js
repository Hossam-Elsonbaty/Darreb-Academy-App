import { View, Text, Button, TouchableOpacity, Image } from 'react-native';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from 'context/LanguageContext';

export default function Hero() {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const hero = t('hero', { returnObjects: true });
  return (
    <View className={` px-4 ${language === 'en' ? 'items-start' : 'items-end '}`}>
      <Text className="text-lg font-medium text-main">{hero.subTitle}</Text>

      <Text
        className={`leading-13 my-5  text-3xl font-semibold ${language === 'en' ? 'text-left' : 'text-right '}`}>
        {language === 'ar' ? (
          <>
            تعلم الان من اى مكان وابنى
            <Text className="text-main">مستقبلك المشرق</Text>
          </>
        ) : (
          <>
            Now learning from anywhere, and build your{' '}
            <Text className="text-main">bright career.</Text>
          </>
        )}
      </Text>

      <Text
        className={`mx-auto max-w-md text-base text-gray ${language === 'en' ? 'text-left' : 'text-right '}`}>
        {hero.desc}
      </Text>

      <TouchableOpacity className=" mt-5 w-max items-center justify-center rounded-lg bg-main px-8 py-2">
        <Text className="text-lg font-semibold text-white">{hero.btn}</Text>
      </TouchableOpacity>

      <Image
        source={require('../assets/hero-img.png')}
        resizeMode="contain"
        className="mx-auto my-10 h-[250px] w-[250px]"
      />
    </View>
  );
}
