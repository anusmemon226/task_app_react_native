import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { RadioButton, Text as TextPaper } from "react-native-paper";

const TaskCard = ({
  title,
  dueDate,
  status,
  cardStyle,
  cardTextStyle,
}: {
  title: string;
  dueDate: string;
  status: string;
  cardStyle: string;
  cardTextStyle: string;
}) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [date, setDate] = useState(new Date(1598051730000));
  const [taskStatus, setTaskStatus] = React.useState("Pending");
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };
  const showDatepicker = () => {
    showMode("date");
  };
  return (
    <Pressable className="shadow-sm shadow-black bg-white p-4 rounded-2xl mb-3">
      <View className="flex flex-row">
        <Text className="flex-1 pb-4 text-black text-[15px]">{title}</Text>
        <View className="my-auto px-1">
          <TouchableOpacity onPress={() => setShowUpdateModal(true)}>
            <Ionicons name="create-outline" size={24} color="#3787EB" />
          </TouchableOpacity>
        </View>
        <View className="my-auto px-1">
          <TouchableOpacity>
            <Ionicons name="trash-outline" size={24} color="#3787EB" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-row justify-between border border-transparent pt-4">
        <View className="bg-[#3787EB] rounded-3xl p-2 px-3">
          <Text className="text-white">{dueDate}</Text>
        </View>
        <View className="bg-[#3787EB] rounded-3xl p-2 px-3">
          <Text className="text-white">{status}</Text>
        </View>
      </View>

      <Modal transparent visible={showUpdateModal} animationType="slide">
        <Pressable
          onPress={() => setShowUpdateModal(false)}
          className="flex justify-center items-center bg-black/40 h-full px-8"
        >
          <View className="bg-white w-full p-5 py-8 rounded-lg">
            <Text className="text-3xl text-center font-bold">Update Task</Text>
            <View className="mt-3">
              <TextInput
                className="border-b-2 text-base border-b-black/10"
                placeholder="Enter Task"
                value={title}
              />
            </View>
            <Pressable className="border-b-2 border-b-black/10">
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }
              >
                <Picker.Item
                  label="Java"
                  value="java"
                  style={{ fontSize: 15 }}
                />
                <Picker.Item
                  label="JavaScript"
                  value="js"
                  style={{ fontSize: 15 }}
                />
              </Picker>
            </Pressable>
            <Pressable
              className="flex flex-row items-center mt-3 py-2 pb-3 border-b-2 border-black/10"
              onPress={() => showDatepicker()}
            >
              <Text className="flex-1">Select Date</Text>
              <View className="">
                <Ionicons name="calendar-outline" size={24} color="black" />
              </View>
            </Pressable>
            <View className="py-2 pb-3">
              <RadioButton.Group
                onValueChange={(newValue) => setTaskStatus(newValue)}
                value={taskStatus}
              >
                <View className="flex flex-row">
                  <RadioButton.Item label="Completed" value="completed" />
                  <RadioButton.Item label="Pending" value="pending" />
                </View>
              </RadioButton.Group>
            </View>
            <TouchableOpacity className="mt-3 p-4 bg-[#3787EB] rounded-md">
              <Text className="text-white text-center font-semibold">
                Update Task
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </Pressable>
  );
};

export default TaskCard;
