import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '@react-navigation/native';
import { useWishlist } from 'context/WishlistContext';

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();
  // const { cartItems, removeFromCart, isCartLoading } = useCart();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  // const total = cartItems.reduce((sum, item) => sum + (item.course.price || 0), 0);
  const total = cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const navigation = useNavigation();
  const { addToWishlist, isInWishlist } = useWishlist();
  // if (isCartLoading) return <ActivityIndicator size="large" color="#000" />;
  return (
    <ScrollView className="flex-1 bg-white px-4 py-4">
      <Text className="mb-2 text-3xl font-bold">{isRTL ? 'عربة التسوق' : 'Shopping Cart'}</Text>
      {/* {cartItems.map(item => (
        <View 
          key={item.course._id} 
          className={`flex-row ${isRTL ? 'flex-row-reverse' : ''} mb-4 border-b border-gray-200 pb-2`}
        >
          <Image 
            source={item.course.thumbnail } 
            className="w-24 h-16 rounded-lg" 
          />
          <View className="flex-1 mx-2">
            <Text className="font-bold">{item.course.title}</Text>
            <Text>{item.course.instructor}</Text>
            <Text className="text-gray-600">{item.course.totalDuration} • {item.course.totalLectures} Lectures</Text>
          </View>
          <View className="justify-between items-end">
            <TouchableOpacity 
              onPress={() => removeFromCart(item.course._id)} 
              className="flex-row items-center"
            >
              <Ionicons name="trash-outline" size={18} color="red" />
              <Text className="text-red-500 ml-1">{isRTL ? 'إزالة' : 'Remove'}</Text>
            </TouchableOpacity>
            <Text className="font-bold">£E{item.course.price}</Text>
          </View>
        </View>
      ))} */}
      {cartItems.length === 0 ? (
        <Text className="text-gray-500 mt-10 text-center text-lg">
          {isRTL ? 'سلة التسوق فارغة' : 'Cart is empty'}
        </Text>
      ) : (
        cartItems.map((item) => (
          <View key={item.id} className="border-gray-200 mb-4 rounded-xl border bg-white p-4">
            <View className="flex flex-row justify-between">
              <View className="mt-4">
                <TouchableOpacity
                  onPress={() => removeFromCart(item.id)}
                  className="mb-3 flex-row items-center">
                  <Ionicons name="trash-outline" size={20} color="red" />
                  <Text className="ml-2 text-red-500">{isRTL ? 'إزالة' : 'Remove'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className=" items-center"
                  onPress={() => {
                    if (!isInWishlist(item.id)) {
                      addToWishlist({
                        ...item,
                        image: item.image,
                        instructor: item.instructor,
                        category: item.category,
                        price: item.price,
                      });
                    }
                    navigation.navigate('Wishlist');
                  }}>
                  <Text className="ml-2 text-main">
                    {isRTL ? 'نقل للمفضلة' : 'Move to wishlist'}
                  </Text>
                </TouchableOpacity>
              </View>
              <Image source={item.image} className=" h-24 w-40 rounded-lg" />
            </View>
            <Text
              className="mt-4 text-lg font-bold"
              style={{ textAlign: isRTL ? 'left' : 'right' }}>
              {item.title}
            </Text>
            <Text className="text-center text-gray" style={{ textAlign: isRTL ? 'left' : 'right' }}>
              {item.instructor}
            </Text>
            <Text className="text-center text-gray" style={{ textAlign: isRTL ? 'left' : 'right' }}>
              {item.category}
            </Text>
            <Text
              className="mt-2 text-xl font-bold text-main"
              style={{ textAlign: isRTL ? 'left' : 'right' }}>
              £E{item.price}
            </Text>
          </View>
        ))
      )}
      <View className="mt-5">
        <Text className="text-gray-700" style={{ textAlign: isRTL ? 'left' : 'right' }}>
          {isRTL ? 'المجموع:' : 'Total:'}
        </Text>
        <Text className="text-2xl font-bold" style={{ textAlign: isRTL ? 'left' : 'right' }}>
          £E{total.toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity className="mt-5 items-center rounded-lg bg-green-600 py-4">
        <Text className="text-lg font-bold text-white">
          {isRTL ? 'المتابعة إلى الدفع' : 'Proceed to Checkout'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
