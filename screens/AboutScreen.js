import ScreenWrapper from 'components/WrapperScreen';
import { LanguageContext } from 'context/LanguageContext';
import { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import TeamSection from 'components/TeamSection';
import { FontAwesome } from '@expo/vector-icons';
export default function AboutScreen() {
  const { t } = useTranslation();
  const { language } = useContext(LanguageContext);
  const { width } = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const cards = [
    {
      name: { en: 'Sara Hassan', ar: 'سارة حسن' },
      role: { en: 'UI/UX Designer', ar: 'مصمم واجهات وتجربة المستخدم' },
      imageUrl: require('../assets/author-04.jpg'),
      rating: 2,
      text: {
        en: 'Lorem Ipsum has been the industrys standard dummy text since the when took and scrambled to make type specimen book has survived.',
        ar: '    كان نص لوريم إيبسوم هو النص التجريبي القياسي في الصناعة منذ ذلك الوقت، حيث تم أخذه وتشويشه لإنشاء نموذج للطباعة، وما زال مستخدمًا حتى اليوم.',
      },
    },
    {
      name: { en: 'Omar Ibrahim', ar: 'عمر إبراهيم' },
      role: { en: 'Backend Developer', ar: 'مطور الواجهة الخلفية' },
      imageUrl: require('../assets/author-05.jpg'),
      rating: 4.2,
      text: {
        en: 'Lorem Ipsum has been the industrys standard dummy text since the when took and scrambled to make type specimen book has survived.',
        ar: '    كان نص لوريم إيبسوم هو النص التجريبي القياسي في الصناعة منذ ذلك الوقت، حيث تم أخذه وتشويشه لإنشاء نموذج للطباعة، وما زال مستخدمًا حتى اليوم.',
      },
    },
    {
      name: { en: 'Omar Ibrahim', ar: 'عمر إبراهيم' },
      role: { en: 'Backend Developer', ar: 'مطور الواجهة الخلفية' },
      imageUrl: require('../assets/author-06.jpg'),
      rating: 3,
      text: {
        en: 'Lorem Ipsum has been the industrys standard dummy text since the when took and scrambled to make type specimen book has survived.',
        ar: '    كان نص لوريم إيبسوم هو النص التجريبي القياسي في الصناعة منذ ذلك الوقت، حيث تم أخذه وتشويشه لإنشاء نموذج للطباعة، وما زال مستخدمًا حتى اليوم.',
      },
    },
    {
      name: { en: 'Omar Ibrahim', ar: 'عمر إبراهيم' },
      role: { en: 'Backend Developer', ar: 'مطور الواجهة الخلفية' },
      imageUrl: require('../assets/author-01.jpg'),
      rating: 3.5,
      text: {
        en: 'Lorem Ipsum has been the industrys standard dummy text since the when took and scrambled to make type specimen book has survived.',
        ar: '    كان نص لوريم إيبسوم هو النص التجريبي القياسي في الصناعة منذ ذلك الوقت، حيث تم أخذه وتشويشه لإنشاء نموذج للطباعة، وما زال مستخدمًا حتى اليوم.',
      },
    },
  ];
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<AntDesign key={`full-${i}`} name="star" size={20} color="#FACC15" />);
    }

    // Half star
    if (hasHalfStar) {
      stars.push(<FontAwesome key="half" name="star-half-empty" size={20} color="#FACC15" />);
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesome key={`empty-${i}`} name="star-o" size={20} color="#D1D5DB" />);
    }

    return stars;
  };

  const brands = [
    require('../assets/brand-01.png'),
    require('../assets/brand-02.png'),
    require('../assets/brand-03.png'),
    require('../assets/brand-04.png'),
    require('../assets/brand-05.png'),
    require('../assets/brand-06.png'),
  ];
  const pages = [];
  for (let i = 0; i < brands.length; i += 2) {
    pages.push(brands.slice(i, i + 2));
  }
  const { w } = Dimensions.get('window');
  const [Index, setIndex] = useState(0);
  return (
    <ScreenWrapper>
      {/* =============== Hero Section ================*/}
      <View className=" h-[30vh] justify-center bg-lightGreen px-6">
        {/* Content */}
        <View className="flex-row items-center">
          {/* Left content */}
          <View className="flex-1 gap-4">
            {/* Breadcrumbs */}
            {language === 'en' ? (
              <View className="flex-row gap-2">
                <Text className="text-gray-500">Home</Text>
                <Text className="text-gray-400">/</Text>
                <Text className="font-medium text-[#309255]">About</Text>
              </View>
            ) : (
              <View className="flex-row gap-2">
                <Text className="text-gray-500">الرئيسية</Text>
                <Text className="text-gray-400">/</Text>
                <Text className="font-medium text-[#309255]">من نحن</Text>
              </View>
            )}
            {/* Title */}
            {language === 'en' ? (
              <View className="flex-row items-center gap-2">
                <Text className="text-2xl font-medium">About</Text>
                <Text className="text-2xl font-medium text-[#309255]">Edule</Text>
              </View>
            ) : (
              <View className="flex-row items-center gap-2">
                <Text className="text-4xl font-medium">
                  عن
                  <Text className="text-[#309255]">ايدول</Text>
                </Text>
              </View>
            )}
          </View>

          {/* Right Image */}
          <View className="flex-1 items-end">
            <Image
              source={require('../assets/author03.jpg')}
              className="h-40 w-40 rounded-full"
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
      {/* =============== End Hero Section ================*/}
      <View className="bg-white py-10">
        <View className="px-4 ">
          {/* Layout */}
          <View className="flex-col items-center gap-10">
            {/* Image Side */}
            <View className="w-full items-center lg:w-1/2">
              <Image
                source={require('../assets/about.webp')}
                className="h-72 w-full rounded-2xl"
                resizeMode="cover"
              />
            </View>
            {/* Text Side */}
            {language === 'en' ? (
              <View className="w-full items-start gap-6">
                <Text className="text-lg font-medium text-[#309255]">Welcome to Edule</Text>
                <Text className="text-left text-3xl font-medium leading-10">
                  You Can Join With Edule and upgrade your skill for your{' '}
                  <Text className="text-[#309255]">bright future.</Text>
                </Text>
                <Text className="text-gray-500 max-w-md text-left text-base">
                  Lorem Ipsum has been the industrys standard dummy text since the when took and
                  scrambled make
                </Text>
                <TouchableOpacity className="mt-2 rounded-lg bg-[#309255] px-6 py-3">
                  <Text className="text-base font-medium text-white">Start A Course</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="w-full items-end gap-6">
                <Text className="text-lg font-medium text-[#309255]">مرحبًا بكم في إيدول</Text>
                <Text className="text-right text-3xl font-medium leading-10">
                  يمكنك الانضمام إلى{'\n'}إيدول وتطوير مهاراتك{'\n'}
                  <Text className="text-[#309255]">لمستقبل مشرق.</Text>
                </Text>
                <Text className="text-gray-500 max-w-md text-right text-base">
                  كان نص لوريم إيبسوم هو النص التجريبي القياسي في الصناعة منذ أن تم أخذه وتشويهه
                </Text>
                <TouchableOpacity className="mt-2 rounded-lg bg-[#309255] px-6 py-3">
                  <Text className="text-base font-medium text-white">ابدأ دورة</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
      {/* =============== End Second Section ================*/}
      {/* =============== Cards Section ================*/}
      <View className="bg-white px-4 ">
        {/* Card 1 */}
        <View className="border-gray-200 mb-6 rounded-2xl border bg-white p-6 shadow-sm">
          <View
            className={`flex-row items-center gap-4 ${
              language === 'en' ? 'justify-start' : 'justify-end'
            }`}>
            <View className="flex h-12 w-12 items-center justify-center rounded-full bg-[#309255]/10">
              <FontAwesome5 name="chalkboard-teacher" size={18} color="#059669" />
            </View>
            <Text className="text-xl font-semibold">
              {language === 'en' ? 'Top Instructors' : 'أفضل المدربين'}
            </Text>
          </View>
          <Text className={`text-gray-600 mt-4 ${language === 'en' ? 'text-left' : 'text-right'}`}>
            {language === 'en'
              ? "Lorem Ipsum has been the industry's standard dummy text since the when took and scrambled to make type specimen book has survived."
              : ' كان نص لوريم إيبسوم هو النص التجريبي القياسي في الصناعة منذ ذلك الوقت، حيث تم أخذه وتشويشه لإنشاء نموذج للطباعة، وما زال مستخدمًا حتى اليوم.'}
          </Text>
        </View>

        {/* Card 2 */}
        <View className="border-gray-200 mb-6 rounded-2xl border bg-white p-6 shadow-sm">
          <View
            className={`flex-row items-center gap-4 ${
              language === 'en' ? 'justify-start' : 'justify-end'
            }`}>
            <View className="flex h-12 w-12 items-center justify-center rounded-full bg-[#309255]/10">
              <EvilIcons name="calendar" size={24} color="#059669" />
            </View>
            <Text className="text-xl font-semibold">
              {language === 'en' ? 'Portable Program' : 'برنامج محمول'}
            </Text>
          </View>
          <Text className={`text-gray-600 mt-4 ${language === 'en' ? 'text-left' : 'text-right'}`}>
            {language === 'en'
              ? "Lorem Ipsum has been the industry's standard dummy text since the when took and scrambled to make type specimen book has survived."
              : ' كان نص لوريم إيبسوم هو النص التجريبي القياسي في الصناعة منذ ذلك الوقت، حيث تم أخذه وتشويشه لإنشاء نموذج للطباعة، وما زال مستخدمًا حتى اليوم.'}
          </Text>
        </View>

        {/* Card 3 */}
        <View className="border-gray-200 mb-6 rounded-2xl border bg-white p-6 shadow-sm">
          <View
            className={`flex-row items-center gap-4 ${
              language === 'en' ? 'justify-start' : 'justify-end'
            }`}>
            <View className="flex h-12 w-12 items-center justify-center rounded-full bg-[#309255]/10">
              <AntDesign name="rise" size={24} color="#059669" />
            </View>
            <Text className="text-xl font-semibold">
              {language === 'en' ? 'Improve Quickly' : 'تطوّر سريعًا'}
            </Text>
          </View>
          <Text className={`text-gray-600 mt-4 ${language === 'en' ? 'text-left' : 'text-right'}`}>
            {language === 'en'
              ? "Lorem Ipsum has been the industry's standard dummy text since the when took and scrambled to make type specimen book has survived."
              : ' كان نص لوريم إيبسوم هو النص التجريبي القياسي في الصناعة منذ ذلك الوقت، حيث تم أخذه وتشويشه لإنشاء نموذج للطباعة، وما زال مستخدمًا حتى اليوم.'}
          </Text>
        </View>
      </View>
      {/* =============== End Cards Section ================*/}
      <View className=" rounded-2xl px-4 py-16">
        <Image
          source={require('../assets/shape8.webp')}
          className="absolute left-5 top-56 h-10 w-10"
        />
        <Image
          source={require('../assets/shape8.webp')}
          className="absolute right-5 top-20 h-10 w-10"
        />

        <View className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <View className="flex-1 gap-5">
            {language === 'ar' ? (
              <>
                <Text className="mb-2 text-right text-2xl font-medium text-[#309255]">
                  كن مدرباً
                </Text>
                <Text className="text-3xl font-medium">
                  يمكنك الانضمام إلى Edule لتصبح مدرباً وتشارك خبرتك{' '}
                  <Text className="relative text-[#309255]">مع المتعلمين؟</Text>
                </Text>
              </>
            ) : (
              <>
                <Text className="mb-2 font-medium text-[#309255]">Become A Instructor</Text>
                <Text className="text-3xl font-medium">
                  You Can Join With Edule as{' '}
                  <Text className="relative text-[#309255]">a instructor?</Text>
                </Text>
              </>
            )}
          </View>
          <View className="flex-1 items-center justify-center"></View>
          <View className="flex-1 items-center justify-center">
            <TouchableOpacity className="rounded-lg bg-[#309255] px-6 py-3">
              <Text className="text-base font-medium text-white">
                {language === 'ar' ? 'أرسل معلوماتك' : 'Drop Information'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* =============== Start Teams Section =============== */}
      <TeamSection />
      {/* =============== End Teams Section =============== */}
      {/* =============== Ready To Start Section =============== */}
      <View className="relative flex flex-col overflow-hidden bg-[#309255] p-5">
        <View className="absolute left-0 top-0 z-0 h-20 w-20 rounded-full bg-[#22C59E]/10"></View>
        <View className="z-1 absolute bottom-0 right-0 h-24 w-24 rounded-full bg-[#22C52E]/20"></View>
        <View className="z-2 absolute right-20 top-10 h-32 w-32 rounded-full bg-[#22C55E]/30"></View>

        <View className="z-10 mb-6 flex flex-col items-end">
          {language === 'ar' ? (
            <>
              <Text className="mb-5 text-2xl font-medium text-white">جاهز للبدء؟</Text>
              <Text className="text-right text-3xl font-medium text-white">
                قم بتحميل تطبيقك على الهاتف.
              </Text>
              <Text className="text-3xl font-medium text-white">لبدء هذه الدورة بسهولة.</Text>
            </>
          ) : (
            <>
              <Text className="mb-5 pr-48 text-left text-2xl font-medium text-white">
                Ready To Start?
              </Text>
              <Text className="text-3xl font-medium text-white">Download Your Mobile App.</Text>
              <Text className="text-3xl font-medium text-white">
                For easy to start this course.
              </Text>
            </>
          )}
        </View>

        <View className="flex flex-row items-start justify-start gap-2">
          <TouchableOpacity className="flex-row items-center rounded-lg bg-white px-4 py-2 shadow-md ">
            <Image source={require('../assets/google-play.png')} className="w-25 h-10" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center rounded-lg bg-white px-4 py-2 shadow-md">
            <Image source={require('../assets/app-store.webp')} className="w-25 h-10" />
          </TouchableOpacity>
        </View>
      </View>
      {/* =============== End Ready To Start Section =============== */}
      {/* ===============Start Students Testimonials Section =============== */}
      <View className="bg-white py-10">
        {language === 'ar' ? (
          <View className="items-center py-8 ">
            <Text className="mb-2 text-lg text-[#309255]">شهادات الطلاب</Text>
            <Text className="text-center text-3xl font-bold">
              ماذا يقول طلابنا عن <Text className="text-[#309255]">Edule</Text>
            </Text>
          </View>
        ) : (
          <View className="items-center py-8">
            <Text className="mb-2 text-lg text-[#309255]">Students Testimonials</Text>
            <Text className="text-center text-3xl font-bold">
              What Our Students Say About <Text className="text-[#309255]">Edule</Text>
            </Text>
          </View>
        )}
        <FlatList
          ref={flatListRef}
          data={cards}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
          renderItem={({ item }) => (
            <View style={{ width }} className="px-6 py-5">
              <View className="items-center gap-5 rounded-2xl border border-[#309255] bg-white p-4 shadow-lg">
                {/* Image */}
                <View className="rounded-full border border-[#309255] p-2">
                  <Image source={item.imageUrl} className="h-24 w-24 rounded-full" />
                </View>

                <View className="mt-2 flex-row items-center gap-2">
                  <View className="flex-row">{renderStars(item.rating)}</View>
                  <Text className="text-gray-600 font-medium">{item.rating.toFixed(1)}</Text>
                </View>

                {/* Text */}
                <Text className="text-gray-600 text-center">
                  {language === 'ar' ? item.text.ar : item.text.en}
                </Text>

                {/* Name */}
                <Text className="text-xl font-semibold">
                  {language === 'ar' ? item.name.ar : item.name.en}
                </Text>

                {/* Role */}
                <Text className="text-[#309255]">
                  {language === 'ar' ? item.role.ar : item.role.en}
                </Text>
              </View>
            </View>
          )}
        />
        <View className=" flex-row justify-center">
          {cards.map((_, index) => (
            <View
              key={index}
              className={`mx-1 h-4 w-4 rounded-full ${
                currentIndex === index ? 'bg-[#309255]' : 'bg-zinc-500/10'
              }`}
            />
          ))}
        </View>
      </View>
      {/* ===============End Students Testimonials Section =============== */}
      <View className="bg-lightGreen py-10">
        {language === 'ar' ? (
          <View className="items-end px-10 py-10">
            <Text className="text-center text-3xl font-bold">
              أفضل داعم <Text className="text-[#309255]">لإيدول</Text>
            </Text>
          </View>
        ) : (
          <View className=" items-start px-10 py-8">
            <Text className="text-start text-2xl font-bold  ">
              Best Supporter of <Text className="text-[#309255]">Edule</Text>
            </Text>
          </View>
        )}

        <FlatList
          ref={flatListRef}
          data={pages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / w);
            setIndex(index);
          }}
          renderItem={({ item }) => (
            <View
              style={{
                width,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              {item.map((brand, idx) => (
                <Image
                  key={idx}
                  source={brand}
                  style={{ width: 150, height: 100, resizeMode: 'contain' }}
                />
              ))}
            </View>
          )}
        />
      </View>
      {/* =============== Start Best Supporter Section ===================*/}
    </ScreenWrapper>
  );
}
