import { View, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
const SearchBar = () => {
  return (
    <View className="bg-white shadow-black shadow-sm py-1 px-1 mx-5 mt-8 flex flex-row rounded-2xl">
      <TextInput className="text-base flex-1" placeholder="Search Your Task" />
      <View className="m-auto px-2">
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;
