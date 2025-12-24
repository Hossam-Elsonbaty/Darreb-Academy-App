import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AccordionItem({ title, isOpen, onToggle, children }) {
  return (
    <View className="border-gray-200 mb-3 overflow-hidden rounded-xl border bg-white">
      <Pressable onPress={onToggle} className="flex-row items-center justify-between px-4 py-4">
        <Text className="text-gray-800 text-lg font-medium">{title}</Text>

        <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#374151" />
      </Pressable>

      {isOpen && <View className="px-4 pb-4">{children}</View>}
    </View>
  );
}
