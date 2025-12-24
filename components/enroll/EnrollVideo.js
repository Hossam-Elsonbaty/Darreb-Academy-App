import { View } from 'react-native';
import { Video } from 'expo-av';

export default function EnrollVideo() {
  return (
    <View className="mb-3 h-60 w-full overflow-hidden rounded-xl">
      <Video
        source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
        style={{ width: '100%', height: '100%' }}
        useNativeControls
        resizeMode="cover"
        shouldPlay
      />
    </View>
  );
}
