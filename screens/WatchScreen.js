// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
// import api from "../api/axios";
// import { Share2, Users, ChevronDown, ChevronUp, PlayCircle, CheckCircle, Circle } from 'lucide-react-native';
// import { useParams } from '@react-navigation/native'; // React Navigation
// import { useLanguage } from '../context/LanguageContext';
// import Video from 'react-native-video'; // Add the react-native-video package

// const CourseWatch = () => {
//   const { id } = useParams(); // React Navigation param
//   const [courseData, setCourseData] = useState(null);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [expandedChapters, setExpandedChapters] = useState({});
//   const [currentVideo, setCurrentVideo] = useState(null);
//   const [completedLectures, setCompletedLectures] = useState(new Set());
//   const [loading, setLoading] = useState(true);
//   const { lang } = useLanguage();
//   const apiKey = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchCourseDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get(`/users/me/courses/${id}`);
//         setCourseData(response.data.data);
        
//         if (response.data.data.chapters?.[0]?.chapter?.lectures?.[0]?.lecture) {
//           setCurrentVideo(response.data.data.chapters[0].chapter.lectures[0].lecture);
//         }

//         if (response.data.data.chapters?.[0]?.chapter?._id) {
//           setExpandedChapters({ [response.data.data.chapters[0].chapter._id]: true });
//         }

//         setLoading(false);
//       } catch (error) {
//         setError(error.response?.data?.message || "An error occurred");
//         setLoading(false);
//       }
//     };

//     fetchCourseDetails();
//   }, [id, apiKey]);

//   const toggleChapter = (chapterId) => {
//     setExpandedChapters(prev => ({
//       ...prev,
//       [chapterId]: !prev[chapterId]
//     }));
//   };

//   const handleLectureClick = (lecture) => {
//     setCurrentVideo(lecture);
//   };

//   const toggleLectureComplete = (lectureId) => {
//     setCompletedLectures(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(lectureId)) {
//         newSet.delete(lectureId);
//       } else {
//         newSet.add(lectureId);
//       }
//       return newSet;
//     });
//   };

//   const formatDuration = (minutes) => {
//     if (!minutes) return '0 minutes';
//     const hours = Math.floor(minutes / 60);
//     const mins = minutes % 60;
//     if (hours > 0) {
//       return `${String(hours).padStart(2, '0')} hour ${String(mins).padStart(2, '0')} minutes`;
//     }
//     return `${String(mins).padStart(2, '0')} minutes`;
//   };

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Loading course...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text style={{ color: 'red' }}>{error}</Text>
//       </View>
//     );
//   }

//   if (!courseData) return null;

//   return (
//     <View style={{ flex: 1, backgroundColor: '#f9f9f9', marginTop: 20 }}>
//       <View style={{ flexDirection: 'row', flex: 1 }}>
//         {/* Left Side - Video and Course Info */}
//         <View style={{ flex: 2, backgroundColor: 'white' }}>
//           {/* Video Player */}
//           <View style={{ position: 'relative', aspectRatio: 16 / 9 }}>
//             {currentVideo ? (
//               <Video
//                 source={{ uri: currentVideo.videoUrl }}
//                 controls
//                 style={{ width: '100%', height: '100%' }}
//               />
//             ) : (
//               <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
//                 <PlayCircle size={64} style={{ opacity: 0.5 }} />
//                 <Text>No video selected</Text>
//               </View>
//             )}
//           </View>

//           {/* Course Title and Stats */}
//           <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
//             <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 }}>
//               {lang == "en" ? courseData.title : courseData.title_ar}
//             </Text>
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <Users size={18} />
//               <Text style={{ color: '#666', marginLeft: 5 }}>
//                 {courseData.totalEnrollments || 8350} {lang == "en" ? "Students are watching" : "طالب تم شراؤه من قبل"}
//               </Text>
//             </View>
//           </View>

//           {/* Tabs */}
//           <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
//             <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 20 }}>
//               {['overview', 'description', 'instructor'].map((tab,index) => (
//                 <TouchableOpacity
//                   key={index}
//                   onPress={() => setActiveTab(tab)}
//                   style={{
//                     paddingVertical: 10,
//                     paddingHorizontal: 20,
//                     borderBottomWidth: activeTab === tab ? 2 : 0,
//                     borderBottomColor: activeTab === tab ? 'green' : 'transparent'
//                   }}
//                 >
//                   <Text style={{ fontSize: 14, color: activeTab === tab ? 'green' : '#666' }}>
//                     {tab}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </View>

//           {/* Tab Content */}
//           <ScrollView contentContainerStyle={{ padding: 20 }}>
//             {activeTab === 'overview' && (
//               <View>
//                 <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
//                   {lang == "en" ? "Course Details" : "تفاصيل الكورس"}
//                 </Text>
//                 <Text style={{ color: '#333', lineHeight: 24 }}>
//                   {lang == "en" ? courseData.description : courseData.description_ar}
//                 </Text>
//               </View>
//             )}

//             {activeTab === 'description' && (
//               <View>
//                 <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
//                   {lang == "en" ? "Description" : "وصف الكورس"}
//                 </Text>
//                 <Text style={{ color: '#333', lineHeight: 24 }}>
//                   {lang == "en" ? courseData.description : courseData.description_ar}
//                 </Text>
//               </View>
//             )}

//             {activeTab === 'instructor' && (
//               <View>
//                 <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Instructor</Text>
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                   <Text style={{ fontSize: 40, backgroundColor: '#e0e0e0', width: 60, height: 60, justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 30 }}>
//                     {courseData.instructor.fullName.charAt(0).toUpperCase()}
//                   </Text>
//                   <View style={{ marginLeft: 20 }}>
//                     <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{courseData.instructor.fullName}</Text>
//                     <Text style={{ color: '#666' }}>{courseData.instructor.email}</Text>
//                   </View>
//                 </View>
//               </View>
//             )}
//           </ScrollView>
//         </View>

//         {/* Right Side - Chapters and Lectures */}
//         <View style={{ flex: 1, backgroundColor: '#e6f4e6', borderLeftWidth: 1, borderLeftColor: '#ddd' }}>
//           <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{lang == "en" ? "Course Content" : "محتوى الكورس"}</Text>
//             <TouchableOpacity>
//               <Share2 size={20} />
//             </TouchableOpacity>
//           </View>
//           <ScrollView style={{ padding: 20 }}>
//             {courseData.chapters && courseData.chapters.length > 0 ? (
//               courseData.chapters.map((chapterItem, chapterIndex) => {
//                 const chapter = chapterItem.chapter;
//                 const isExpanded = expandedChapters[chapter._id];

//                 return (
//                   <View key={chapter._id} style={{ backgroundColor: 'white', borderRadius: 10, overflow: 'hidden', marginBottom: 10 }}>
//                     <TouchableOpacity onPress={() => toggleChapter(chapter._id)} style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#f9f9f9' }}>
//                       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                         {isExpanded ? (
//                           <ChevronDown size={20} color="green" />
//                         ) : (
//                           <ChevronUp size={20} color="#ccc" />
//                         )}
//                         <Text style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 10 }}>{lang == "en" ? chapter.title : chapter.title_ar}</Text>
//                       </View>
//                     </TouchableOpacity>

//                     {isExpanded && (
//                       <View style={{ paddingLeft: 20 }}>
//                         {chapter.lectures.map((lectureItem, lectureIndex) => {
//                           const lecture = lectureItem.lecture;
//                           const isCompleted = completedLectures.has(lecture._id);
//                           const isActive = currentVideo?._id === lecture._id;

//                           return (
//                             <TouchableOpacity
//                               key={lecture._id}
//                               style={{
//                                 flexDirection: 'row',
//                                 paddingVertical: 15,
//                                 borderBottomWidth: 1,
//                                 borderBottomColor: '#ddd',
//                                 backgroundColor: isActive ? '#e6f4e6' : 'white'
//                               }}
//                               onPress={() => handleLectureClick(lecture)}
//                             >
//                               <TouchableOpacity
//                                 onPress={(e) => {
//                                   e.stopPropagation();
//                                   toggleLectureComplete(lecture._id);
//                                 }}
//                                 style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}
//                               >
//                                 {isCompleted ? (
//                                   <CheckCircle size={20} color="green" />
//                                 ) : (
//                                   <Circle size={20} color="#ccc" />
//                                 )}
//                               </TouchableOpacity>
//                               <View style={{ flex: 1 }}>
//                                 <Text style={{ fontSize: 14, fontWeight: '500', color: isActive ? 'green' : '#333' }}>
//                                   {String(chapterIndex + 1).padStart(2, '0')}. {lang == "en" ? lecture.title : lecture.title_ar}
//                                 </Text>
//                                 <Text style={{ fontSize: 12, color: '#888' }}>{formatDuration(lecture.duration)}</Text>
//                               </View>
//                               {isActive && (
//                                 <PlayCircle size={18} color="green" />
//                               )}
//                             </TouchableOpacity>
//                           );
//                         })}
//                       </View>
//                     )}
//                   </View>
//                 );
//               })
//             ) : (
//               <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
//                 <Text style={{ color: '#888' }}>{lang == "en" ? "No chapters available" : "لا يوجد أقسام"}</Text>
//               </View>
//             )}
//           </ScrollView>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default CourseWatch;
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import api from '../api/axios';
import { useLanguage } from '../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CourseWatch = ({ route }) => {
  const { id } = route.params; // Get course ID from navigation params
  const [courseData, setCourseData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedChapters, setExpandedChapters] = useState({});
  const [currentVideo, setCurrentVideo] = useState(null);
  const [completedLectures, setCompletedLectures] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const { language } = useLanguage();

  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        const response = await api.get(`/users/me/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourseData(response.data.data);

        // Set first lecture as default video
        if (response.data.data.chapters?.[0]?.chapter?.lectures?.[0]?.lecture) {
          setCurrentVideo(response.data.data.chapters[0].chapter.lectures[0].lecture);
        }

        // Expand first chapter by default
        if (response.data.data.chapters?.[0]?.chapter?._id) {
          setExpandedChapters({ [response.data.data.chapters[0].chapter._id]: true });
        }

        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred');
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [id]);

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const handleLectureClick = (lecture) => {
    setCurrentVideo(lecture);
    setShowContent(false); // Hide content panel on mobile when selecting video
  };

  const toggleLectureComplete = (lectureId) => {
    setCompletedLectures((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(lectureId)) {
        newSet.delete(lectureId);
      } else {
        newSet.add(lectureId);
      }
      return newSet;
    });
  };

  const formatDuration = (minutes) => {
    if (!minutes) return '0 minutes';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${String(hours).padStart(2, '0')} hour ${String(mins).padStart(2, '0')} minutes`;
    }
    return `${String(mins).padStart(2, '0')} minutes`;
  };

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <ActivityIndicator size="large" color="#309255" />
        <Text className="mt-4 text-gray-600">Loading course...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center p-8">
        <View className="bg-white p-8 rounded-lg shadow-md">
          <Text className="text-red-600 text-lg">{error}</Text>
        </View>
      </View>
    );
  }

  if (!courseData) return null;

  const tabs = language === 'en' 
    ? ['overview', 'description', 'instructor']
    : ['نظره عامة', 'الوصف', 'المحاضر'];

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView>
        {/* Video Player */}
        <View style={{ width: screenWidth, aspectRatio: 16 / 9 }} className="bg-black">
          {currentVideo ? (
            <Video
              source={{ uri: currentVideo.videoUrl }}
              style={{ width: '100%', height: '100%' }}
              useNativeControls
              resizeMode="contain"
              shouldPlay
            />
          ) : (
            <View className="flex-1 justify-center items-center">
              <Ionicons name="play-circle-outline" size={64} color="white" style={{ opacity: 0.5 }} />
              <Text className="text-white mt-4">No video selected</Text>
            </View>
          )}
        </View>

        {/* Course Title and Stats */}
        <View className="p-6 bg-white border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-900 mb-4">
            {language === 'en' ? courseData.title : courseData.title_ar}
          </Text>
          <View className="flex-row items-center gap-2">
            <Ionicons name="people-outline" size={18} color="#666" />
            <Text className="text-sm text-gray-600">
              {language === 'en'
                ? `${courseData.totalEnrollments || 8350} Students are watching`
                : `طالب ${courseData.totalEnrollments || 8350} تم شراؤه من قبل`}
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <View className="bg-white border-b border-gray-200">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6">
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(language === 'en' ? ['overview', 'description', 'instructor'][index] : tab)}
                className={`px-4 py-3 mr-4 ${
                  (language === 'en' ? ['overview', 'description', 'instructor'][index] : tab) === activeTab
                    ? 'border-b-2 border-green-600'
                    : ''
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    (language === 'en' ? ['overview', 'description', 'instructor'][index] : tab) === activeTab
                      ? 'text-green-600'
                      : 'text-gray-600'
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Tab Content */}
        <View className="p-6 bg-white">
          {activeTab === 'overview' && (
            <View>
              <Text className="text-xl font-bold text-gray-900 mb-4">
                {language === 'en' ? 'Course Details' : 'تفاصيل الكورس'}
              </Text>
              <Text className="text-gray-700 leading-relaxed mb-6">
                {language === 'en' ? courseData.description : courseData.description_ar}
              </Text>
              <View className="flex-row flex-wrap gap-4">
                <View className="bg-gray-50 p-4 rounded-lg flex-1 min-w-[45%]">
                  <Text className="text-sm text-gray-600">{language === 'en' ? 'Level' : 'المستوى'}</Text>
                  <Text className="text-lg font-semibold capitalize">{courseData.level}</Text>
                </View>
                <View className="bg-gray-50 p-4 rounded-lg flex-1 min-w-[45%]">
                  <Text className="text-sm text-gray-600">{language === 'en' ? 'Total Duration' : 'المده الزمنيه'}</Text>
                  <Text className="text-lg font-semibold">{courseData.totalDuration}</Text>
                </View>
                <View className="bg-gray-50 p-4 rounded-lg flex-1 min-w-[45%]">
                  <Text className="text-sm text-gray-600">{language === 'en' ? 'Total Lectures' : 'جميع المحاضرات'}</Text>
                  <Text className="text-lg font-semibold">{courseData.totalLectures}</Text>
                </View>
                <View className="bg-gray-50 p-4 rounded-lg flex-1 min-w-[45%]">
                  <Text className="text-sm text-gray-600">{language === 'en' ? 'Rating' : 'التقييم'}</Text>
                  <Text className="text-lg font-semibold">⭐ {courseData.rating}/5</Text>
                </View>
              </View>
            </View>
          )}

          {activeTab === 'description' && (
            <View>
              <Text className="text-xl font-bold text-gray-900 mb-4">
                {language === 'en' ? 'Description' : 'وصف الكورس'}
              </Text>
              <Text className="text-gray-700 leading-relaxed">
                {language === 'en' ? courseData.description : courseData.description_ar}
              </Text>
            </View>
          )}

          {activeTab === 'instructor' && (
            <View>
              <Text className="text-xl font-bold text-gray-900 mb-4">Instructor</Text>
              <View className="flex-row items-center gap-4">
                <View className="w-16 h-16 rounded-full bg-green-100 justify-center items-center">
                  <Text className="text-green-600 font-bold text-xl">
                    {courseData.instructor.fullName.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View>
                  <Text className="font-semibold text-lg">{courseData.instructor.fullName}</Text>
                  <Text className="text-gray-600">{courseData.instructor.email}</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Course Content Button */}
        <TouchableOpacity
          onPress={() => setShowContent(!showContent)}
          className="bg-green-600 mx-6 my-4 p-4 rounded-lg flex-row justify-between items-center"
        >
          <Text className="text-white font-semibold text-lg">
            {language === 'en' ? 'Course Content' : 'محتوى الكورس'}
          </Text>
          <Ionicons 
            name={showContent ? 'chevron-up' : 'chevron-down'} 
            size={24} 
            color="white" 
          />
        </TouchableOpacity>

        {/* Chapters and Lectures */}
        {showContent && (
          <View className="px-6 pb-6">
            {courseData.chapters && courseData.chapters.length > 0 ? (
              courseData.chapters.map((chapterItem, chapterIndex) => {
                const chapter = chapterItem.chapter;
                const isExpanded = expandedChapters[chapter._id];

                return (
                  <View key={chapter._id} className="bg-white rounded-lg mb-2 overflow-hidden shadow-sm">
                    {/* Chapter Header */}
                    <TouchableOpacity
                      onPress={() => toggleChapter(chapter._id)}
                      className="px-4 py-3 flex-row items-center justify-between"
                    >
                      <View className="flex-row items-center gap-3 flex-1">
                        <Ionicons
                          name={isExpanded ? 'chevron-down' : 'chevron-up'}
                          size={20}
                          color={isExpanded ? '#309255' : '#999'}
                        />
                        <View className="flex-1">
                          <Text className="font-semibold text-gray-900">
                            {language === 'en' ? chapter.title : chapter.title_ar}
                          </Text>
                          <Text className="text-xs text-gray-500">
                            {formatDuration(
                              chapter.lectures.reduce((acc, lec) => acc + (lec.lecture.duration || 0), 0)
                            )}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>

                    {/* Lectures */}
                    {isExpanded && (
                      <View className="border-t border-gray-100">
                        {chapter.lectures.map((lectureItem, lectureIndex) => {
                          const lecture = lectureItem.lecture;
                          const isCompleted = completedLectures.has(lecture._id);
                          const isActive = currentVideo?._id === lecture._id;

                          return (
                            <TouchableOpacity
                              key={lecture._id}
                              onPress={() => handleLectureClick(lecture)}
                              className={`flex-row items-center gap-3 px-4 py-3 border-b border-gray-50 ${
                                isActive ? 'bg-green-50' : ''
                              }`}
                            >
                              <TouchableOpacity
                                onPress={(e) => {
                                  e.stopPropagation();
                                  toggleLectureComplete(lecture._id);
                                }}
                              >
                                <Ionicons
                                  name={isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
                                  size={20}
                                  color={isCompleted ? '#309255' : '#ccc'}
                                />
                              </TouchableOpacity>
                              <View className="flex-1">
                                <Text
                                  className={`text-sm font-medium ${
                                    isActive ? 'text-green-700' : 'text-gray-900'
                                  }`}
                                  numberOfLines={1}
                                >
                                  {String(chapterIndex + 1).padStart(2, '0')}.{' '}
                                  {language === 'en' ? lecture.title : lecture.title_ar}
                                </Text>
                                <Text className="text-xs text-gray-500">
                                  {formatDuration(lecture.duration)}
                                </Text>
                              </View>
                              {isActive && (
                                <Ionicons name="play-circle" size={18} color="#309255" />
                              )}
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    )}
                  </View>
                );
              })
            ) : (
              <View className="text-center py-8">
                <Text className="text-gray-500">
                  {language === 'en' ? 'No chapters available' : 'لا يوجد أقسام'}
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CourseWatch;