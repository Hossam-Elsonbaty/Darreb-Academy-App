import { useContext } from "react";
import ToasterContext from "../context/ToasterContext";
import { Pressable, Text, View } from "react-native";

const Toaster = () => {
  const { showModal, setShowModal, modalType, modalMessage } = useContext(ToasterContext);
  if (!showModal) return null;
  return (
    <View className="fixed bg-black/50 flex items-center justify-center z-50 min-w-screen min-h-screen" >
      <View className="bg-white p-6 rounded-lg w-96 text-center">
        <Text
          className={`text-xl font-bold mb-3 ${
            modalType === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {modalType === "success" ? "Success" : "Error"}
        </Text>
        <Text className="mb-4">{modalMessage}</Text>
        <Pressable
          onPress={() => setShowModal(false)}
          className="px-4 py-2 bg-main rounded"
        >
          <Text className="text-white text-center">Ok</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default Toaster;