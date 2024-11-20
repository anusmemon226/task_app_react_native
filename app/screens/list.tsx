import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { useSQLiteContext} from 'expo-sqlite';
import Ionicons from "@expo/vector-icons/Ionicons";
import HorizontalTab from "../../components/HorizontalTab";
import SearchBar from "../../components/SearchBar";
import VerticalTab from "../../components/VerticalTab";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useStore } from "../../store";

const list = () => {
  const { setTasks } = useStore();
  const {categories,setCategories} = useStore()
  const {setUniqueCategories} = useStore()
  const [showAddModal, setShowAddModal] = useState(false);
  const [task,setTask] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [date, setDate] = useState({status:false,date: new Date(),formatted:""});
  const db = useSQLiteContext();

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    let formattedDate = currentDate.toDateString().split(" ")
    formattedDate = `${formattedDate[2]} ${formattedDate[1]} ${formattedDate[3]}`
    setDate({...date,status:true,formatted:formattedDate});
  };
  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date.date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };
  const showDatepicker = () => {
    showMode("date");
  };

  const getCategories = async ()=>{
    await db.getAllAsync(`SELECT category_id,category_name from category`).then((data)=>{
      setCategories(data)
    }).catch(()=>{
      console.log("Failed to fetch Categories from Database...!")
    })
  }


  const getUnqiueCat = async () => {
    const res = await db.getAllAsync(
      "Select DISTINCT(category_name),category_id from tasks as t inner join category as c where t.category = c.category_id"
    );
    setUniqueCategories(res);
  };

  const getTasks = async () => {
    let tasks = await db.getAllAsync(
      "Select * from tasks as t inner join category as c where t.category = c.category_id"
    );
    setTasks(tasks);
  };
  
  useEffect(()=>{
    getCategories()
    getUnqiueCat()
  },[setCategories,setUniqueCategories])



  const handleInsertion = async ()=>{
    if (String(date.date)!="",selectedCategory!=null,task!=""){
      let result = await db.execAsync(`INSERT INTO tasks (value,category,date) VALUES ('${task}',${selectedCategory},'${date.formatted}')`)
      getTasks()
      getUnqiueCat()
    }else{
      alert("Please Fill All Required Field...!")
    }
    setTask("")
    setDate({status:false,date:new Date(),formatted:""})
    setSelectedCategory(1)
    setShowAddModal(false)
  }

  return (
    <View className="h-full">
      <View className="flex justify-center items-center py-4 bg-[#3787EB]">
        <Text className="font-bold text-2xl text-white">MANAGE YOUR TASKS</Text>
      </View>
      <SearchBar />
      <HorizontalTab/>
      <VerticalTab />
      <TouchableOpacity
        onPress={() => setShowAddModal(true)}
        className="flex justify-center items-center bg-[#3787EB] fixed inset-6 left-[78%] w-[55px] h-[55px] rounded-full"
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      <Modal transparent visible={showAddModal} animationType="slide">
        <Pressable
          onPress={() => {
            setShowAddModal(false)
            setTask("")
            setSelectedCategory(1)
            setDate({status:false,date: new Date(),formatted:""})
          }}
          className="flex justify-center items-center bg-black/40 h-full px-8"
        >
          <View className="bg-white w-full p-5 py-8 rounded-lg">
            <Text className="text-3xl text-center font-bold">Create Task</Text>
            <View className="mt-3">
              <TextInput
                className="border-b-2 text-base border-b-black/10"
                placeholder="Enter Task"
                onChangeText={(e)=>{setTask(e)}}
                value={task}
              />
            </View>
            <Pressable className="border-b-2 border-b-black/10">
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCategory(itemValue)
                }
              >
                {
                  categories.map(({category_id,category_name}:{category_id:number,category_name:string})=>{
                    return <Picker.Item
                    key={category_id}
                    label={category_name}
                    value={category_id}
                    style={{ fontSize: 15 }}
                  />
                  })
                }
              </Picker>
            </Pressable>
            <Pressable
              className="flex flex-row items-center mt-3 py-2 pb-3"
              onPress={() => showDatepicker()}
            >
              <Text className="flex-1">{(date.status==false) ? "Select Date" : date.formatted}</Text>
              <View className="">
                <Ionicons name="calendar-outline" size={24} color="black" />
              </View>
            </Pressable>
            <TouchableOpacity onPress={handleInsertion} className="mt-3 p-4 bg-[#3787EB] rounded-md">
              <Text className="text-white text-center font-semibold">
                Add Task
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

    </View>
  );
};

export default list;
