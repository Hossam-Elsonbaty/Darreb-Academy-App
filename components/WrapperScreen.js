import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView } from 'react-native';
import { useContext } from 'react';
import { LanguageContext } from 'context/LanguageContext';

export default function ScreenWrapper({ children }) {
  const { language } = useContext(LanguageContext);
  return (
    <SafeAreaView className="bg-lightGreen flex-1">
      <ScrollView>
        <View>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
