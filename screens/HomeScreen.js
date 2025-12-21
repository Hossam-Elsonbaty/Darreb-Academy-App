import Hero from 'components/Hero';
import ScreenWrapper from 'components/WrapperScreen';

import { View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScreenWrapper>
      <View>
        <Hero />
      </View>
    </ScreenWrapper>
  );
}
