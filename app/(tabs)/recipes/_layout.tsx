import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          display: "none",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
          headerShown: false,
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="recipe"
        options={{
          href: null,
          headerShown: false,
          headerShadowVisible: false,
        }}
      />
    </Tabs>
  );
}
