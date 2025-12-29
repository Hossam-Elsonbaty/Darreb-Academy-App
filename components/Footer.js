import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // or 'react-native-vector-icons/Ionicons'
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { language } = useLanguage();

  return (
    <View className="">
      <View className="bg-[#eefbf3] p-5">
        <View className="flex-row flex-wrap justify-center gap-8">
          {/* Left Column */}
          <View className="flex-1 min-w-[250px]">
            <View className="space-y-6">
              <Image 
                source={require("../assets/logo.webp")} 
                className="w-32 h-12"
                resizeMode="contain"
              />
              <Text className="font-medium text-2xl">
                {language === "ar" ? "شارع الكاريبي" : "Caribbean Ct"}
              </Text>
              <Text className="text-[#309255] font-light">
                {language === "ar" ? "هايماركت، فيرجينيا (VA)" : "Haymarket, Virginia (VA)."}
              </Text>
              <View className="flex-row gap-3 items-center">
                <Ionicons name="mail-outline" size={20} color="#309255" />
                <Text className="text-gray-500">address@gmail.com</Text>
              </View>
              <View className="flex-row gap-3 items-center">
                <Ionicons name="call-outline" size={20} color="#309255" />
                <Text className="text-gray-500">(970) 262-1413</Text>
              </View>
              <View className="flex-row gap-5">
                <TouchableOpacity>
                  <Ionicons name="logo-facebook" size={24} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="logo-twitter" size={24} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="logo-skype" size={24} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="logo-instagram" size={24} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Middle Column - Categories */}
          <View className="flex-1 min-w-[200px]">
            <View className="space-y-5">
              <Text className="font-medium text-2xl mb-3">
                {language === "ar" ? "التصنيفات" : "Category"}
              </Text>
              <Text className="text-gray-600 mb-2">
                {language === "ar" ? "الكتابة الإبداعية" : "Creative Writing"}
              </Text>
              <Text className="text-gray-600 mb-2">
                {language === "ar" ? "الأفلام والفيديو" : "Film & Video"}
              </Text>
              <Text className="text-gray-600 mb-2">
                {language === "ar" ? "التصميم الجرافيكي" : "Graphic Design"}
              </Text>
              <Text className="text-gray-600 mb-2">
                {language === "ar" ? "تصميم UI/UX" : "UI/UX Design"}
              </Text>
              <Text className="text-gray-600 mb-2">
                {language === "ar" ? "تحليل الأعمال" : "Business Analytics"}
              </Text>
              <Text className="text-gray-600 mb-2">
                {language === "ar" ? "التسويق" : "Marketing"}
              </Text>
            </View>
          </View>

          {/* Right Column - Quick Links */}
          <View className="flex-1 min-w-[200px]">
            <View className="space-y-5">
              <Text className="font-medium text-2xl mb-3">
                {language === "ar" ? "روابط سريعة" : "Quick Links"}
              </Text>
              <Text className="text-gray-600 mb-2">
                {language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
              </Text>
              <Text className="text-gray-600 mb-2">
                {language === "ar" ? "المناقشة" : "Discussion"}
              </Text>
              <Text className="text-gray-600 mb-2">
                {language === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
              </Text>
              <Text className="text-gray-600 mb-2">
                {language === "ar" ? "دعم العملاء" : "Customer Support"}
              </Text>
              <Text className="text-gray-600 mb-2">
                {language === "ar" ? "الأسئلة الشائعة للدورات" : "Course FAQ's"}
              </Text>
            </View>
          </View>

          {/* Last Column - Subscribe */}
          <View className="flex-1 min-w-[250px] max-w-[300px]">
            <View className="space-y-5">
              <Text className="font-medium text-2xl mb-3">
                {language === "ar" ? "اشترك" : "Subscribe"}
              </Text>
              <Text className="text-gray-600 mb-3">
                {language === "ar"
                  ? "لوريم إيبسوم هو ببساطة نص شكلي يُستخدم في صناعة الطباعة والنشر."
                  : "Lorem Ipsum has been them an industry printer took a galley make book."}
              </Text>
              <TextInput
                placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Email here"}
                className="border border-gray-400 rounded-2xl p-3 bg-white mb-3"
                value={email}
                onChangeText={setEmail}
              />
              <TouchableOpacity className="bg-[#309255] rounded-full px-6 py-3 items-center">
                <Text className="text-white font-medium">
                  {language === "ar" ? "اشترك الآن" : "Subscribe Now"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom Footer */}
      <View className="bg-gray-800 py-4 px-4">
        <View className="flex-col md:flex-row justify-between items-center gap-3">
          {/* Left Text */}
          <Text className="text-sm text-gray-300 text-center">
            © {new Date().getFullYear()}{" "}
            <Text className="text-[#309255] font-medium">Edule</Text>
            {" "}{language === "ar" ? "جميع الحقوق محفوظة." : "All Rights Reserved."}
          </Text>

          {/* Footer Links */}
          <View className="flex-row gap-5">
            <TouchableOpacity>
              <Text className="text-gray-300 text-sm">
                {language === "ar" ? "الخصوصية" : "Privacy"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-gray-300 text-sm">
                {language === "ar" ? "الشروط" : "Terms"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-gray-300 text-sm">
                {language === "ar" ? "الدعم" : "Support"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Footer;