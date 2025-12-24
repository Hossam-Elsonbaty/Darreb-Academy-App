import { View } from 'react-native';
import React from 'react';
import EnrollVideo from 'components/enroll/EnrollVideo';
import AccordionList from 'components/enroll/AccordionList';
import CourseDetails from 'components/enroll/CourseDetails';

export default function AfterEnroll() {
  return (
    <View className="mt-5 px-3">
      <EnrollVideo />
      <CourseDetails />
      <AccordionList />
    </View>
  );
}
