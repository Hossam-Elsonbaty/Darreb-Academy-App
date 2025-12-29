import { View, Text, Pressable, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from 'context/LanguageContext';

export default function CourseDeatils() {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);

  const links = t('enroll.links', { returnObjects: true });
  const content = t('enroll.content', { returnObjects: true });

  const [active, setActive] = useState(links[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Reset active when language changes
  useEffect(() => {
    setActive(links[0]);
  }, [language]);

  const handleContent = (link) => {
    if (link !== active) {
      setIsAnimating(true);
      setTimeout(() => {
        setActive(link);
        setIsAnimating(false);
      }, 150);
    }
  };

  const currentContent = content.find((c) => c.role === active);

  return (
    <View className="w-full">
      {/* ===== Horizontal Links ===== */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="rounded-xl bg-lightGreen px-4 py-4">
        {links.map((link,index) => {
          const isActive = active === link;

          return (
            <Pressable
              key={index}
              onPress={() => handleContent(link)}
              className={`mr-3 rounded-xl border px-6 py-3
                ${isActive ? 'border-main bg-main' : 'border-gray-200 bg-white'}
              `}>
              <Text
                className={`text-base font-medium
                  ${isActive ? 'text-white' : 'text-gray-700'}
                `}>
                {link}
              </Text>

              {/* Active indicator */}
              {isActive && (
                <View className="absolute bottom-0 left-0 h-1 w-full rounded-b-xl bg-white/50" />
              )}
            </Pressable>
          );
        })}
      </ScrollView>

      {/* ===== Content Section ===== */}
      <View
        className={`my-6 overflow-hidden rounded-xl border-2 border-main bg-white ${language === 'en' ? 'items-start' : 'items-end '}`}>
        <View
          className={`px-5 py-6 transition-all
            ${isAnimating ? 'opacity-0' : 'opacity-100'}
          `}>
          {currentContent ? (
            <>
              {/* Title */}
              <Text className="border-gray-200 mb-4 border-b pb-3 text-2xl font-bold text-main">
                {active}
              </Text>

              {/* Content */}
              <Text className="text-gray-700 text-lg leading-relaxed">{currentContent.title}</Text>
            </>
          ) : (
            <View className="items-center py-10">
              <Text className="text-gray-400 text-lg">No content available</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
