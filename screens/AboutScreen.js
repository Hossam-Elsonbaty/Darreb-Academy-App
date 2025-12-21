import ScreenWrapper from 'components/WrapperScreen';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

export default function AboutScreen() {
  const { t } = useTranslation();
  return (
    <ScreenWrapper>
      <Text className="text-red-500">{t('about')}</Text>
    </ScreenWrapper>
  );
}
