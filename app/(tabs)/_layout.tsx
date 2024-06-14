import React, { ReactNode } from "react";

import {
  MaterialIcons,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";

const TabsLayout = (): ReactNode => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#A38F85",
        },
        headerTitleStyle: {
          fontWeight: "bold",
          color: "black",
        },
        title: "RECIPESAPP",
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="recipes"
        options={{
          href: "/recipes",
          tabBarIcon: GroupMenuIcon,
          tabBarActiveTintColor: "#61554f",
          title: "recipes",
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          href: "/home",
          tabBarIcon: MenuIcon,
          tabBarActiveTintColor: "#61554f",
          title: "favorites",
        }}
      />
      <Tabs.Screen
        name="myprofile"
        options={{
          href: "/myprofile",
          tabBarIcon: HomeIcon,
          tabBarActiveTintColor: "#61554f",
          title: "home",
        }}
      />
    </Tabs>
  );
};

const HomeIcon: React.FC<{ color: string }> = ({ color }) => (
  <FontAwesome name="user" size={24} color={color} />
);

const MenuIcon: React.FC<{ color: string }> = ({ color }) => (
  <AntDesign name="heart" size={24} color={color} />
);

const GroupMenuIcon: React.FC<{ color: string }> = ({ color }) => (
  <MaterialCommunityIcons name="chef-hat" size={24} color={color} />
);

export default TabsLayout;
