import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';

const teamMembers = [
 { name: { en: 'Alice Johnson', ar: 'أليس جونسون' }, role: { en: 'Project Manager', ar: 'مدير المشروع' }, imageUrl: require('../assets/author-01.jpg'), rating: 4.9 },
  { name: { en: 'Mohamed Ali', ar: 'محمد علي' }, role: { en: 'Frontend Developer', ar: 'مطور الواجهة الأمامية' }, imageUrl: require('../assets/author-02.jpg'), rating: 4.5 },
  { name: { en: 'Sara Hassan', ar: 'سارة حسن' }, role: { en: 'UI/UX Designer', ar: 'مصمم واجهات وتجربة المستخدم' }, imageUrl: require('../assets/author-04.jpg'), rating: 5 },
  { name: { en: 'Sara Hassan', ar: 'سارة حسن' }, role: { en: 'UI/UX Designer', ar: 'مصمم واجهات وتجربة المستخدم' }, imageUrl: require('../assets/author03.jpg'), rating: 2 },
  { name: { en: 'Omar Ibrahim', ar: 'عمر إبراهيم' }, role: { en: 'Backend Developer', ar: 'مطور الواجهة الخلفية' }, imageUrl: require('../assets/author-05.jpg'), rating: 4.2 },
  { name: { en: 'Omar Ibrahim', ar: 'عمر إبراهيم' }, role: { en: 'Backend Developer', ar: 'مطور الواجهة الخلفية' }, imageUrl: require('../assets/author-06.jpg'), rating: 3 },
  { name: { en: 'Omar Ibrahim', ar: 'عمر إبراهيم' }, role: { en: 'Backend Developer', ar:'مطور الواجهة الخلفية' }, imageUrl: require('../assets/author-01.jpg'), rating: 3.5 },
  { name: { en: 'Alice Johnson', ar: 'أليس جونسون' }, role: { en: 'Project Manager', ar: 'مدير المشروع' }, imageUrl: require('../assets/author-02.jpg'), rating: 4.1 },
];

function renderStars(rating) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) stars.push(<FontAwesome key={`full${i}`} name="star" size={16} color="#FBBF24" />);
  if (halfStar) stars.push(<FontAwesome key="half" name="star-half-full" size={16} color="#FBBF24" />);
  for (let i = 0; i < emptyStars; i++) stars.push(<FontAwesome key={`empty${i}`} name="star-o" size={16} color="#D1D5DB" />);
  return stars;
}

export default function TeamSection() {
  const { language } = useLanguage();

  return (
    <ScrollView className="bg-white py-8 px-4">
      <View className="items-center mb-8">
        <Text className="text-[#309255] text-lg mb-2">
          {language === 'ar' ? 'فريق العمل' : "Team Member's"}
        </Text>
        <Text className="text-3xl font-bold text-center">
          {language === 'ar' ? 'مدربو Edule ' : 'Edule Skilled '}
          <Text className="text-[#309255]"> {language === 'ar' ? 'المهرة' : 'Instructor'} </Text>
        </Text>
      </View>

      <View className="flex-row flex-wrap justify-between">
        {teamMembers.map((member, idx) => (
          <View key={idx} className="items-center p-4 w-[48%] mb-6">
            <View className="border border-[#22C55E] p-1 rounded-full">
              <Image source={member.imageUrl} className="w-24 h-24 rounded-full" />
            </View>
            <View className="flex-row items-center mt-2 space-x-1">
              {renderStars(member.rating)}
              <Text className="text-gray-600 font-medium ml-1">{member.rating.toFixed(1)}</Text>
            </View>
            <Text className="text-xl font-semibold mt-1">{language === 'ar' ? member.name.ar : member.name.en}</Text>
            <Text className="text-[#309255]">{language === 'ar' ? member.role.ar : member.role.en}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
