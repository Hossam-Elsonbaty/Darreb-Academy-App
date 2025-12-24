import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from 'context/LanguageContext';
import { useWishlist } from 'context/WishlistContext';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  if (wishlistItems.length === 0)
    return (
      <Text className="mt-10 text-center">
        {isRTL ? 'القائمة المفضلة فارغة' : 'Wishlist is empty'}
      </Text>
    );
  return (
    <ScrollView className="p-4">
      <Text className="mb-2 text-3xl font-bold">{isRTL ? 'القائمة المفضلة' : 'Wishlist'}</Text>
      {wishlistItems.map((item) => (
        <View key={item.id} className="border-gray-200 mb-6 rounded-2xl border bg-white shadow-md">
          <Image source={item.image} className="h-48 w-full rounded-t-2xl " resizeMode="cover" />
          <View className="items-center p-4">
            <Text className="text-center text-lg font-bold">{item.title}</Text>

            <Text className="text-gray-500 mt-1 text-center text-lg">{item.category}</Text>
            <Text className="text-gray-500 mt-1 text-center text-sm">{item.instructor}</Text>
            <Text
              className="mt-2 text-xl font-bold text-main"
              style={{ textAlign: isRTL ? 'left' : 'right' }}>
              £E {item.price}
            </Text>
          </View>
          <View className="flex-row justify-around px-4 pb-4">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => removeFromWishlist(item.id)}>
              <Ionicons name="trash-outline" size={20} color="red" />
              <Text className="ml-2 text-red-500">{isRTL ? 'إزالة' : 'Remove'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
