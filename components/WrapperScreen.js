import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView } from 'react-native';


export default function ScreenWrapper({ children }) {
  return (
    <SafeAreaView className="bg-lightGreen flex-1">
      <ScrollView>
        <View>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
