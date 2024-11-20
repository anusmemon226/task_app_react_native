import { View, Text, ScrollView } from "react-native";
import TaskCard from "./TaskCard";
import { useStore } from "../store";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
const VerticalTab = () => {
  const { tasks, setTasks } = useStore();
  const db = useSQLiteContext();
  const getTasks = async () => {
    let tasks = await db.getAllAsync(
      "Select * from tasks as t inner join category as c where t.category = c.category_id"
    );
    setTasks(tasks);
  };
  useEffect(() => {
    getTasks();
  }, [setTasks]);

  return (
    <View className={`h-[50%] mt-8`}>
      <ScrollView className="px-5" showsVerticalScrollIndicator={false}>

        { (tasks != "") ? tasks.map(
          ({
            id,
            value,
            category_name,
            status,
            date,
          }: {
            id: number;
            value: string;
            category_name: string;
            status: number;
            date: string;
          }) => {
            return (
              <TaskCard
                key={id}
                title={value}
                dueDate={date}
                status={status == 0 ? "Pending" : "Completed"}
                cardStyle=""
                cardTextStyle=""
              />
            );
          }
        ) : 
        <View className="py-40">
        <Text className="text-center text-xl font-bold">No Tasks Found</Text>
      </View>}
      </ScrollView>
    </View>
  );
};
export default VerticalTab;
