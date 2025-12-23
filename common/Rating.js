import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Rating({ value = 0, size = 16 }) {
  const stars = Array.from({ length: 5 });

  return (
    <View className="flex-row justify-center mb-3">
      {stars.map((_, index) => {
        const starValue = index + 1;
        const isHalf = value >= starValue - 0.5 && value < starValue;
        const isFull = value >= starValue;

        return (
          <Ionicons
            key={index}
            name={
              isFull
                ? 'star'
                : isHalf
                ? 'star-half'
                : 'star-outline'
            }
            size={size}
            color="#fbbf24" 
          />
        );
      })}
    </View>
  );
}
