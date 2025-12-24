import React, { useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Ionicons, Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { LanguageContext } from "context/LanguageContext";
import SectionTitle from "common/SectionTitle";


const inputClassName = `
                      w-full h-[60px] px-6 
                      text-[15px] text-[#52565b] 
                      border border-[rgba(48,146,85,0.2)] 
                      rounded-[10px] bg-white 
                      transition-all duration-300 
                      focus:border-main focus:outline-none
`;

const textareaClassName = `
                      w-full h-40 px-6 py-4
                      text-[15px] text-[#52565b]
                      border border-[rgba(48,146,85,0.2)]
                      rounded-[10px] bg-white
                      transition-all duration-300
                      focus:border-main focus:outline-none
                      resize-none
`;

export default function ContactScreen() {
  const { language } = useContext(LanguageContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(
        "https://darreb-academy-backend.vercel.app/api/contact-us/create-email",
        data
      )
      .then(() => {
        Toast.show({
          type: "success",
          text1: language === "en" ? "Success" : "تم بنجاح",
          text2:
            language === "en"
              ? "Message sent successfully"
              : "تم إرسال الرسالة بنجاح",
        });
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: language === "en" ? "Error" : "خطأ",
          text2:
            language === "en"
              ? "Something went wrong, try again"
              : "حصل خطأ، حاول مرة أخرى",
        });
      });
  };

  return (
    <ScrollView
      className="bg-white"
      contentContainerStyle={{
        direction: language === "ar" ? "rtl" : "ltr",
      }}
    >
      {/* TITLE */}
      <SectionTitle
        title={language === "en" ? "Get in Touch With Us" : "تواصل معنا"}
      />

      {/* CARD */}
      <View className="mx-4 my-10 border border-[rgba(48,146,85,0.2)] rounded-[30px] overflow-hidden">

        {/* CONTACT INFO */}
        <View className="bg-[#e9f8ef] px-6 py-10 gap-8">

          {/* Phone */}
          <View
            className={`flex-row items-center gap-5 ${
              language === "ar" ? "flex-row-reverse" : ""
            }`}
          >
            <View className="w-16 h-16 rounded-full border border-[#bde5cc] bg-white items-center justify-center">
              <Feather name="phone" size={24} color="#309255" />
            </View>
            <View>
              <Text className="text-sm text-gray-500">
                {language === "en" ? "Phone No." : "رقم الهاتف"}
              </Text>
              <Text className="text-lg font-medium text-[#212832]">
                (88) 193 326 867
              </Text>
            </View>
          </View>

          {/* Email */}
          <View
            className={`flex-row items-center gap-5 ${
              language === "ar" ? "flex-row-reverse" : ""
            }`}
          >
            <View className="w-16 h-16 rounded-full border border-[#bde5cc] bg-white items-center justify-center">
              <Ionicons name="mail-outline" size={24} color="#309255" />
            </View>
            <View>
              <Text className="text-sm text-gray-500">
                {language === "en" ? "Email Address" : "البريد الإلكتروني"}
              </Text>
              <Text className="text-lg font-medium text-[#212832]">
                edule100@gmail.com
              </Text>
            </View>
          </View>

          {/* Address */}
          <View
            className={`flex-row items-center gap-5 ${
              language === "ar" ? "flex-row-reverse" : ""
            }`}
          >
            <View className="w-16 h-16 rounded-full border border-[#bde5cc] bg-white items-center justify-center">
              <Ionicons name="location-outline" size={24} color="#309255" />
            </View>
            <View>
              <Text className="text-sm text-gray-500">
                {language === "en" ? "Office Address" : "عنوان المكتب"}
              </Text>
              <Text className="text-lg font-medium text-[#212832]">
                Talga, Alabama, USA
              </Text>
            </View>
          </View>
        </View>

        {/* FORM */}
        <View className="px-6 py-10 gap-4">

          {/* Name */}
          <Controller
            control={control}
            name="name"
            rules={{
              required:
                language === "en" ? "Name is required" : "الاسم مطلوب",
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder={language === "en" ? "Name" : "الاسم"}
                value={value}
                onChangeText={onChange}
                className={inputClassName}
              />
            )}
          />
          {errors.name && (
            <Text className="text-red-500">{errors.name.message}</Text>
          )}

          {/* Email */}
          <Controller
            control={control}
            name="email"
            rules={{
              required:
                language === "en"
                  ? "Email is required"
                  : "البريد الإلكتروني مطلوب",
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder={language === "en" ? "Email" : "البريد الإلكتروني"}
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                className={inputClassName}
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-500">{errors.email.message}</Text>
          )}

          {/* Subject */}
          <Controller
            control={control}
            name="subject"
            rules={{
              required:
                language === "en" ? "Subject is required" : "الموضوع مطلوب",
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder={language === "en" ? "Subject" : "الموضوع"}
                value={value}
                onChangeText={onChange}
                className={inputClassName}
              />
            )}
          />
          {errors.subject && (
            <Text className="text-red-500">{errors.subject.message}</Text>
          )}

          {/* Message */}
          <Controller
            control={control}
            name="message"
            rules={{
              required:
                language === "en" ? "Message is required" : "الرسالة مطلوبة",
              minLength: {
                value: 20,
                message:
                  language === "en"
                    ? "Message must be at least 20 characters"
                    : "الرسالة يجب ألا تقل عن 20 حرف",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder={language === "en" ? "Message" : "الرسالة"}
                value={value}
                onChangeText={onChange}
                multiline
                textAlignVertical="top"
                className={textareaClassName}
              />
            )}
          />
          {errors.message && (
            <Text className="text-red-500">{errors.message.message}</Text>
          )}

          {/* Submit */}
          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="bg-[#309255] py-4 rounded-lg"
          >
            <Text className="text-white text-lg font-medium text-center">
              {language === "en" ? "Send Message" : "إرسال الرسالة"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
