import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { useLanguage } from 'context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from 'context/WishlistContext';
const profileImages = [
  require('../../assets/images/profile1.jpg'),
  require('../../assets/images/profile2.jpg'),
  require('../../assets/images/profile3.jpg'),
  require('../../assets/images/profile4.jpg'),
  require('../../assets/images/profile5.jpg'),
];
const coursesImages = [
  require('../../assets/images/course1.jpg'),
  require('../../assets/images/course2.jpg'),
  require('../../assets/images/course3.jpg'),
  require('../../assets/images/course4.jpg'),
  require('../../assets/images/course5.jpg'),
];
export default function CourseCard({ c, status }) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const { addToCart, isInCart, removeFromCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const courseImage = useMemo(() => ({ uri: c.thumbnail }), [c.thumbnail]);
  const courseImg = useMemo(
    () => coursesImages[Math.floor(Math.random() * coursesImages.length)],
    []
  );
  const profileImg = useMemo(
    () => profileImages[Math.floor(Math.random() * profileImages.length)],
    []
  );
  return (
    <View className="mb-10 rounded-2xl border border-main bg-white ">
      {/* Course Image */}
      <View className="overflow-hidden rounded-xl p-3">
        <Image source={courseImage} contentFit="cover" style={{ height: 200 }} />
      </View>
      <View className="absolute right-0 top-2 flex flex-col gap-2">
        <TouchableOpacity
          className="rounded-full bg-white p-2 "
          onPress={() => {
            if (isInWishlist(c._id)) {
              removeFromWishlist(c._id);
            } else {
              addToWishlist(c);
            }
          }}>
          <Ionicons
            name={isInWishlist(c._id) ? 'heart' : 'heart-outline'}
            size={20}
            color={isInWishlist(c._id) ? '#f00' : '#999'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-full bg-white p-2 "
          onPress={() => {
            if (isInCart(c._id)) {
              removeFromCart(c._id);
            } else {
              addToCart(c);
            }
          }}>
          <Ionicons
            name={isInCart(c._id) ? 'cart' : 'cart-outline'}
            size={20}
            color={isInCart(c._id) ? '#309255' : '#999'}
          />
        </TouchableOpacity>
      </View>
      {/* Instructor + Category */}
      <View
        className="mt-2 flex-row items-center justify-between p-3"
        style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
        <Image
          source={profileImg}
          contentFit="cover"
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <View className="flex-1 font-medium" style={{ paddingHorizontal: 12 }}>
          <Text className="text-center text-gray" style={{ textAlign: isRTL ? 'right' : 'left' }}>
            {c.instructor?.fullName || ''}
          </Text>
        </View>

        <View className="rounded-lg bg-lightGreen px-4 py-2">
          <Text
            className="text-sm font-medium text-main"
            style={{ textAlign: isRTL ? 'right' : 'left' }}>
            {c.category?.name || (language === 'en' ? 'All' : 'جميع الفئات')}
          </Text>
        </View>
      </View>

      {/* Title */}
      <Text
        className="mt-4 px-3 text-center text-lg font-semibold leading-snug text-dark"
        style={{
          textAlign: isRTL ? 'right' : 'left',
          writingDirection: isRTL ? 'rtl' : 'ltr',
        }}>
        {c.title}
      </Text>

      {/* Info Row */}
      <View
        className="mt-4 flex-row items-center justify-between px-3 text-sm"
        style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
        <View
          className="flex-row items-center gap-2"
          style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          {status === 'news' ? (
            <>
              <Ionicons name="calendar-outline" size={18} color="#309255" />
              <Text
                className="text-gray"
                style={{
                  marginLeft: isRTL ? 0 : 8,
                  marginRight: isRTL ? 8 : 0,
                }}>
                21 March, 2021
              </Text>
            </>
          ) : (
            <>
              <Ionicons name="time-outline" size={18} color="#309255" />
              <Text
                className="text-gray"
                style={{
                  marginLeft: isRTL ? 0 : 8,
                  marginRight: isRTL ? 8 : 0,
                }}>
                {c.totalDuration || '—'}
              </Text>
            </>
          )}
        </View>

        <View
          className="flex-row items-center gap-1"
          style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          {status === 'news' ? (
            <>
              <Ionicons name="heart-outline" size={18} color="#309255" />
              <Text
                className="text-gray"
                style={{
                  marginLeft: isRTL ? 0 : 8,
                  marginRight: isRTL ? 8 : 0,
                }}>
                2,568+
              </Text>
            </>
          ) : (
            <>
              <Ionicons name="book-outline" size={18} color="#309255" />
              <Text
                className="text-gray"
                style={{
                  marginLeft: isRTL ? 0 : 8,
                  marginRight: isRTL ? 8 : 0,
                }}>
                {c.totalLectures || 0}
              </Text>
            </>
          )}
        </View>
      </View>

      {/* Price + Rating */}
      {status !== 'news' && (
        <View
          className="mx-3 mt-6 flex-row items-center justify-between rounded-xl bg-lightGreen p-4"
          style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <View
            className="flex-row items-center"
            style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <Text className="text-xl font-bold text-main">${c.price}</Text>
          </View>

          <View
            className="flex-row  items-center gap-1"
            style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <Text
              className="font-medium text-dark"
              style={{
                marginLeft: isRTL ? 4 : 0,
                marginRight: isRTL ? 0 : 4,
              }}>
              {c.totalRatings || 0}
            </Text>
            {[1, 2, 3, 4, 5].map((i) => (
              <Ionicons
                key={i}
                name={i <= Math.round(c.totalRatings) ? 'star' : 'star-outline'}
                size={14}
                color="#facc15"
              />
            ))}
          </View>
        </View>
      )}

      {/* News Button */}
      {status === 'news' && (
        <Pressable
          className="mx-3 mb-3 mt-4 rounded-lg bg-main px-4 py-2 active:opacity-80"
          style={{
            alignSelf: isRTL ? 'flex-end' : 'flex-start',
          }}>
          <Text className="font-medium text-white" style={{ textAlign: isRTL ? 'right' : 'left' }}>
            {language === 'en' ? 'Read More' : 'قراءة المزيد'}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
