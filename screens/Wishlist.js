import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  if (wishlist.length === 0) {
    return (
      <Text className="mt-10 text-center text-lg text-gray-500">
        {isRTL ? 'القائمة المفضلة فارغة' : 'Wishlist is empty'}
      </Text>
    );
  }
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="mb-4 text-3xl font-bold">
        {isRTL ? 'قائمة الرغبات' : 'Wishlist'}
      </Text>

      {wishlist.map(item => (
        <View
          key={item._id}
          className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-md border-[#ddd]"
        >
          <Image
            source={{ uri: item.course.thumbnail }}
            className="h-48 w-full rounded-t-2xl"
            resizeMode="cover"
          />

          <View className="p-4">
            <Text className="text-lg font-bold text-center">
              {item.course.title}
            </Text>

            <Text className="mt-1 text-center text-gray-500">
              {item.course.instructor?.fullName}
            </Text>

            {/* <Text className="mt-1 text-center text-gray-500">
              {item.course.totalDuration} • {item.course.totalLectures}
            </Text> */}

            <Text className="mt-3 text-center text-xl font-bold text-main">
              £E{item.course.price}
            </Text>
          </View>

          <View className="flex-row justify-center pb-4">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => removeFromWishlist(item.course._id)}
            >
              <Ionicons name="trash-outline" size={20} color="red" />
              <Text className="ml-2 text-red-500">
                {isRTL ? 'حذف' : 'Remove'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
