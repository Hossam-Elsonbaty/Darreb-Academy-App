import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '@react-navigation/native';

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();
  const { toggleWishlist } = useWishlist();
  const { language } = useLanguage();
  const navigation = useNavigation();

  const isRTL = language === 'ar';

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.course?.price || 0),
    0
  );

  return (
    <ScrollView className="flex-1 bg-white px-4 py-4">
      <Text className="mb-4 text-3xl font-bold">
        {isRTL ? 'عربة التسوق' : 'Shopping Cart'}
      </Text>

      {cartItems.length === 0 ? (
        <Text className="text-center text-gray-500 mt-10 text-lg">
          {isRTL ? 'سلة التسوق فارغة' : 'Cart is empty'}
        </Text>
      ) : (
        cartItems.map(item => (
          <View
            key={item._id}
            className="mb-4 rounded-xl border border-gray-200 bg-white p-4"
          >
            <View className="flex-row justify-between">
              <View>
                <TouchableOpacity
                  onPress={() => removeFromCart(item._id)}
                  className="mb-3 flex-row items-center"
                >
                  <Ionicons name="trash-outline" size={20} color="red" />
                  <Text className="ml-2 text-red-500">
                    {isRTL ? 'إزالة' : 'Remove'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={async () => {
                    await toggleWishlist(item.course);
                    await removeFromCart(item._id);
                    navigation.navigate('Wishlist');
                  }}
                >
                  <Text className="text-main">
                    {isRTL ? 'نقل للمفضلة' : 'Move to wishlist'}
                  </Text>
                </TouchableOpacity>
              </View>

              <Image
                source={{ uri: item.course.thumbnail }}
                className="h-24 w-40 rounded-lg"
              />
            </View>

            <Text
              className="mt-4 text-lg font-bold"
              style={{ textAlign: isRTL ? 'left' : 'right' }}
            >
              {item.course.title}
            </Text>

            <Text style={{ textAlign: isRTL ? 'left' : 'right' }}>
              {item.course.instructor?.fullName}
            </Text>

            <Text style={{ textAlign: isRTL ? 'left' : 'right' }}>
              {item.course.category}
            </Text>

            <Text
              className="mt-2 text-xl font-bold text-main"
              style={{ textAlign: isRTL ? 'left' : 'right' }}
            >
              £E{item.course.price}
            </Text>
          </View>
        ))
      )}

      <View className="mt-6">
        <Text style={{ textAlign: isRTL ? 'left' : 'right' }}>
          {isRTL ? 'المجموع:' : 'Total:'}
        </Text>
        <Text
          className="text-2xl font-bold"
          style={{ textAlign: isRTL ? 'left' : 'right' }}
        >
          £E{total.toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity className="mt-5 rounded-lg bg-green-600 py-4 items-center">
        <Text className="text-lg font-bold text-white">
          {isRTL ? 'المتابعة إلى الدفع' : 'Proceed to Checkout'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
