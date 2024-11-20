
import { View, Image, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
const App = () => {
 

  return (
    <View className="h-full">
      <LinearGradient colors={["#3787EB", "#fff"]} start={[0.5,0]}>
        <View className="w-full h-2/3 flex justify-end items-center">
          <Image
            source={require("../assets/todo_avatar.webp")}
            style={{ width: 300, height: 300 }}
          />
        </View>
        <View className="h-1/3 flex justify-center">
          <Text className="p-4 text-lg text-center text-black">
            Effortlessly manage your tasks in one place. Create, update, and
            organize everything you need to stay on top of your day.
          </Text>
          <TouchableOpacity
            onPress={() => router.push("./screens/list")}
            className="bg-[#3787EB] rounded-lg p-4 m-4 flex flex-row justify-between items-center"
          >
            <Text className="text-xl text-white">Get Started</Text>
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};
export default App;
