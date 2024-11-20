import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import TabLink from "./TabLink";
import { useSQLiteContext } from "expo-sqlite";
import { useStore } from "../store";

const HorizontalTab = () => {
  const db = useSQLiteContext();
  const [currentTab, setCurrentTab] = useState("All");
  const {uniqueCategories} = useStore()

  
  return (
    <View className="mx-5 mt-8">
      <ScrollView
        className="rounded-2xl shadow-sm shadow-black py-4 bg-white"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <TabLink
          handleCurrentTab={setCurrentTab}
          tabText="All"
          tabStyle={`ml-4 ${
            currentTab == "All" ? "bg-[#3787EB]" : "bg-[#ECF4FD]"
          }`}
          tabTextStyle={`${currentTab == "All" ? "text-white" : "text-black"}`}
        />
        <TabLink
          handleCurrentTab={setCurrentTab}
          tabText="Pending"
          tabStyle={`ml-4 ${
            currentTab == "Pending" ? "bg-[#3787EB]" : "bg-[#ECF4FD]"
          }`}
          tabTextStyle={`${
            currentTab == "Pending" ? "text-white" : "text-black"
          }`}
        />
        <TabLink
          handleCurrentTab={setCurrentTab}
          tabText="Completed"
          tabStyle={`ml-4 ${
            currentTab == "Completed" ? "bg-[#3787EB]" : "bg-[#ECF4FD]"
          }`}
          tabTextStyle={`${
            currentTab == "Completed" ? "text-white" : "text-black"
          }`}
        />
        {
            uniqueCategories.map(({category_id,category_name}:{category_id:number,category_name:string})=>{
              return <TabLink key={category_id} handleCurrentTab={setCurrentTab} tabText={category_name} tabStyle={`ml-4 ${currentTab==category_name?"bg-[#3787EB]":"bg-[#ECF4FD]"}`} tabTextStyle={`${currentTab==category_name?"text-white":"text-black"}`}/>
            })
          }
      </ScrollView>
    </View>
  );
};

export default HorizontalTab;
