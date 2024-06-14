import React, { useEffect } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

import AuthProvider from "@/context/auth";
import NavigationReadyProvider from "@/context/navigation/NavigationReadyProvider";

const Navigation: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <Stack
      screenOptions={{
        animation: "none",
        headerStyle: {
          backgroundColor: "#A38F85",
        },
        headerTitleStyle: {
          fontWeight: "bold",
        },
        title: "FavRecipes",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

const App = (): JSX.Element => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationReadyProvider>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </NavigationReadyProvider>
    </QueryClientProvider>
  );
};

export default App;
