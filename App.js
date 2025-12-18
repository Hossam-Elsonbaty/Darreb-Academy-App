import './i18n';

import './global.css';
import { Button, I18nManager, Text, View } from 'react-native';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const isRTL = i18n.language === 'ar';

    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
    }
  }, [i18n.language]);

  return (
    <SafeAreaView>
      <View style={{ flexDirection: `${i18n.language === 'en' ? 'row' : 'row-reverse'}` }}>
        <Text>{t('welcome')}</Text>
        <Button
          title="Switch Language"
          onPress={() => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}
        />
      </View>
    </SafeAreaView>
  );
}
