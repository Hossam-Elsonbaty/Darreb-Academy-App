import { View, Text, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { useLanguage } from 'context/LanguageContext';
import { useNavigation } from '@react-navigation/native';

const coursesImages = [
  require('../assets/courses-01.jpg'),
  require('../assets/courses-02.jpg'),
  require('../assets/courses-03.jpg'),
  require('../assets/courses-04.jpg'),
  require('../assets/courses-05.jpg'),
  require('../assets/courses-06.jpg'),
];

const profileImages = [
  require('../assets/author-01.jpg'),
  require('../assets/author-02.jpg'),
  require('../assets/author03.jpg'),
  require('../assets/author-04.jpg'),
  require('../assets/author-05.jpg'),
  require('../assets/author-06.jpg'),
];

export default function CourseCard({ c, status }) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const courseImg = useMemo(
    () => coursesImages[Math.floor(Math.random() * coursesImages.length)],
    []
  );
  const profileImg = useMemo(
    () => profileImages[Math.floor(Math.random() * profileImages.length)],
    []
  );
  const navigation = useNavigation();
// console.log(navigation.getState());

  return (
     <Pressable
      onPress={() =>
        navigation.navigate('CourseDetails', {
          course: c,
          status,
        })
      }
      className="mb-10 rounded-2xl border border-main bg-white shadow-md active:opacity-90"
    >

    
    <View className="mb-10 rounded-2xl border border-main bg-white shadow-md">
      {/* Course Image */}
      <View className="overflow-hidden rounded-xl p-3">
        <Image source={courseImg} contentFit="cover" style={{ height: 200, width: '100%' }} />
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
            {c.instructor}
          </Text>
        </View>

        <View className="rounded-lg bg-lightGreen px-4 py-2">
          <Text
            className="text-sm font-medium text-main"
            style={{ textAlign: isRTL ? 'right' : 'left' }}>
            {c.category}
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
                {c.time}
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
                {c.lectures}
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
            <Text className="text-xl font-bold text-main">$385.00</Text>
            <Text
              className="text-gray line-through"
              style={{
                marginLeft: isRTL ? 0 : 8,
                marginRight: isRTL ? 8 : 0,
              }}>
              $440.00
            </Text>
          </View>

          <View
            className="flex-row items-center gap-1"
            style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <Text
              className="font-medium text-dark"
              style={{
                marginLeft: isRTL ? 4 : 0,
                marginRight: isRTL ? 0 : 4,
              }}>
              4.9
            </Text>
            {[1, 2, 3, 4, 5].map((i) => (
              <Ionicons
                key={i}
                name={i <= Math.round(c.rating) ? 'star' : 'star-outline'}
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
    </Pressable>
  );
}
