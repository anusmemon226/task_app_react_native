import { useSQLiteContext } from "expo-sqlite";
import { Text, Pressable } from "react-native";
import { useStore } from "../store";

const TabLink = ({handleCurrentTab, tabText,tabStyle,tabTextStyle}:{handleCurrentTab:any,tabText:string,tabStyle:string,tabTextStyle:string}) => {
  const db = useSQLiteContext();
  const {tasks,setTasks} = useStore()
  const handleChangeTab = async (selectedTab:string)=>{
    handleCurrentTab(selectedTab)
    if(selectedTab=="Pending"){
      const res = await db.getAllAsync(`Select * from tasks as t inner join category as c where t.category=c.category_id and t.status = 0`)
      setTasks(res)
    }else if(selectedTab=="Completed"){
      const res = await db.getAllAsync(`Select * from tasks as t inner join category as c where t.category=c.category_id and t.status = 1`)
      setTasks(res)
    }else if(selectedTab=="All"){
      const res = await db.getAllAsync(`Select * from tasks as t inner join category as c where t.category=c.category_id`)
      setTasks(res)
    }else{
      const res = await db.getAllAsync(`Select * from tasks as t inner join category as c where t.category=c.category_id and c.category_name = '${selectedTab}'`)
      setTasks(res)
    }
  }
  return (
    <Pressable onPress={()=>handleChangeTab(tabText)} className={`px-4 py-2 mx-1 rounded-lg ${tabStyle}`}>
      <Text className={`${tabTextStyle}`}>{tabText}</Text>
    </Pressable>
  );
};

export default TabLink;
