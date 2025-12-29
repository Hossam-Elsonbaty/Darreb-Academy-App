import { View, Text, Image, FlatList, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import SectionTitle from 'common/SectionTitle';
import Rating from 'common/Rating';
import api from 'api/axios';
import { useLanguage } from "../../context/LanguageContext";
export default function Testimonials() {
  const [reviews, setReviews] = useState()
  const handelGetReviews = async()=> {
    try{
      const response = await api.get('/reviews')
      setReviews(response.data)
    }
    catch(err){
      console.log(err);
    }
  }
  const authorImages = [
  require('../../assets/author-04.jpg'),
  require('../../assets/author-05.jpg'),
  require('../../assets/author-06.jpg'),
];
  useEffect(() => {
    handelGetReviews();
  }, []);
  const { language } = useLanguage();
  return (
    <View className="bg-white p-5 items-center mb-5" >
      <SectionTitle
        title={
          language === 'en' ? (
            <Text className="  py-4  text-3xl font-medium capitalize text-main">
              Feedback from strudents
            </Text>
          ) : (
            <Text className="py-4  text-3xl font-medium text-main">اراء طلابنا</Text>
          )
        }
      />
      <ScrollView horizontal className='flex gap-4'>
        {reviews?.map(item=>(
          <View key={item._id} className="mr-4 w-72 rounded-lg border border-gray/10 bg-white p-4">
            <Image
              source={{uri : item.user.profilePic}}
              className="mx-auto mb-4 h-20 w-20 rounded-full border-2 border-main/20"
            />

            <Rating value={item.rating} />

            <Text className="text-gray-600 mt-3 text-sm leading-relaxed text-center">{item.user.fullName}</Text>
            <Text className="text-gray-600 mt-3 text-sm leading-relaxed text-center">{item.comment}</Text>
            <Text className="text-gray-600 mt-3 text-sm leading-relaxed text-center">{item.course.title}</Text>
          </View>
        )
        )}
      </ScrollView>
      {/* <FlatList
        data={reviews}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        renderItem={({ item, index }) => (
          <View className="mr-4 w-72 rounded-lg border border-gray/10 bg-white p-4">
            <Image
              source={item.user?.profilePic || require('../../assets/author-04.jpg')}
              className="mx-auto mb-4 h-20 w-20 rounded-full border-2 border-main/20"
            />

            <Rating value={item.rating} />

            <Text className="text-gray-600 mt-3 text-sm leading-relaxed text-center">{item.user.fullName}</Text>
            <Text className="text-gray-600 mt-3 text-sm leading-relaxed text-center">{item.comment}</Text>
            <Text className="text-gray-600 mt-3 text-sm leading-relaxed text-center">{item.course.title}</Text>
          </View>
        )}
      /> */}
    </View>
  );
}
