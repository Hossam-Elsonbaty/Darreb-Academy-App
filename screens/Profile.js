import { View, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import SectionTitle from 'common/SectionTitle';
import { LanguageContext } from 'context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const { language } = useContext(LanguageContext);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUserData = async () => {
      const userData = await AsyncStorage.getItem(JSON.parse('userData'));
      setUser(userData);
    };

    getUserData();
  }, []);
  console.log(user);
  return (
    <View>
      <SectionTitle
        title={
          language === 'en' ? (
            <Text className="  py-4  text-center text-3xl font-medium capitalize text-main">
              User Profile
            </Text>
          ) : (
            <Text className="py-4  text-center text-3xl font-medium text-main">البوفايل </Text>
          )
        }
      />
    </View>
  );
}
