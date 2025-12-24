import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useLanguage } from "../context/LanguageContext";
import SectionTitle from "common/SectionTitle";

export default function ContactScreen() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");

  const { lang } = useLanguage();

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
        setModalType("success");
        setModalMessage(
          lang === "en"
            ? "Message sent successfully"
            : "تم إرسال الرسالة بنجاح"
        );
        setShowModal(true);
      })
      .catch(() => {
        setModalType("error");
        setModalMessage(
          lang === "en"
            ? "Something went wrong, try again"
            : "حصل خطأ، حاول مرة أخرى"
        );
        setShowModal(true);
      });
  };

  return (
    <ScrollView className="bg-white">


       <SectionTitle
  title={lang === "en" ? "Get in Touch With Us" : "تواصل معنا"}
/> 

      {/* CARD */}
      <View className="mx-4 my-10 border border-[rgba(48,146,85,0.2)] rounded-[30px] overflow-hidden">

        {/* LEFT INFO */}
        <View className="bg-[#e9f8ef] px-6 py-10 gap-8">
          {/* Phone */}
          <View className="flex-row items-center gap-5">
            <View className="w-16 h-16 rounded-full border border-[#bde5cc] bg-white items-center justify-center">
              <Feather name="phone" size={24} color="#309255" />
            </View>
            <View>
              <Text className="text-sm text-gray-500">Phone No.</Text>
              <Text className="text-lg font-medium text-[#212832]">
                (88) 193 326 867
              </Text>
            </View>
          </View>

          {/* Email */}
          <View className="flex-row items-center gap-5">
            <View className="w-16 h-16 rounded-full border border-[#bde5cc] bg-white items-center justify-center">
<Ionicons name="mail-outline" size={24} color="#309255" />
            </View>
            <View>
              <Text className="text-sm text-gray-500">Email Address</Text>
              <Text className="text-lg font-medium text-[#212832]">
                edule100@gmail.com
              </Text>
            </View>
          </View>

          {/* Address */}
          <View className="flex-row items-center gap-5">
            <View className="w-16 h-16 rounded-full border border-[#bde5cc] bg-white items-center justify-center">
              <Ionicons name="location-outline" size={24} color="#309255" />
            </View>
            <View>
              <Text className="text-sm text-gray-500">Office Address</Text>
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
              required: lang === "en" ? "Name is required" : "الاسم مطلوب",
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder={lang === "en" ? "Name" : "الاسم"}
                value={value}
                onChangeText={onChange}
                className="h-[60px] px-5 border border-[rgba(48,146,85,0.2)] rounded-lg"
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
                lang === "en" ? "Email is required" : "البريد الإلكتروني مطلوب",
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder={lang === "en" ? "Email" : "البريد الإلكتروني"}
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                className="h-[60px] px-5 border border-[rgba(48,146,85,0.2)] rounded-lg"
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
                lang === "en" ? "Subject is required" : "الموضوع مطلوب",
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder={lang === "en" ? "Subject" : "الموضوع"}
                value={value}
                onChangeText={onChange}
                className="h-[60px] px-5 border border-[rgba(48,146,85,0.2)] rounded-lg"
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
                lang === "en" ? "Message is required" : "الرسالة مطلوبة",
              minLength: {
                value: 20,
                message:
                  lang === "en"
                    ? "Message must be at least 20 characters"
                    : "الرسالة يجب ألا تقل عن 20 حرف",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder={lang === "en" ? "Message" : "الرسالة"}
                value={value}
                onChangeText={onChange}
                multiline
                textAlignVertical="top"
                className="h-40 px-5 py-4 border border-[rgba(48,146,85,0.2)] rounded-lg"
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
              {lang === "en" ? "Send Message" : "إرسال الرسالة"}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* MODAL */}
      <Modal transparent visible={showModal} animationType="fade">
        <View className="flex-1 bg-black/50 items-center justify-center">
          <View className="bg-white w-[80%] rounded-2xl p-6 items-center">
            <Ionicons
              name={
                modalType === "success"
                  ? "checkmark-circle"
                  : "close-circle"
              }
              size={64}
              color={modalType === "success" ? "green" : "red"}
            />
            <Text className="text-lg text-center my-5">
              {modalMessage}
            </Text>
            <Pressable
              onPress={() => setShowModal(false)}
              className={`px-6 py-2 rounded-lg ${
                modalType === "success" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              <Text className="text-white font-medium">
                {lang === "en" ? "OK" : "حسناً"}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
