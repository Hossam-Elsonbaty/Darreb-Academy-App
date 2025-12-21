import React, { createContext, useContext, useEffect, useState } from 'react';
import { I18nManager, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import i18n from '../i18n';

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(i18n.language || 'en');
  const [isRTL, setIsRTL] = useState(language === 'ar');

  useEffect(() => {
    initLanguage();
  }, []);

  const initLanguage = async () => {
    const savedLang = await AsyncStorage.getItem('lang');
    if (savedLang) {
      changeLanguage(savedLang, false);
    }
  };

  const changeLanguage = async (lang, reload = true) => {
    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem('lang', lang);

    const rtl = lang === 'ar';
    setLanguage(lang);
    setIsRTL(rtl);

    if (I18nManager.isRTL !== rtl) {
      I18nManager.allowRTL(rtl);
      I18nManager.forceRTL(rtl);

      if (reload) {
        Updates.reloadAsync();
      }
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        isRTL,
        toggleLanguage: () => changeLanguage(language === 'en' ? 'ar' : 'en'),
      }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
