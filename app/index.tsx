import React, { useContext, useEffect, useState } from "react";

import { Stack, SplashScreen, router } from "expo-router";

import { NavigationReadyContext } from "@/context/navigation/NavigationReadyProvider";
import { useAuth } from "@/hooks/useAuth";

SplashScreen.preventAutoHideAsync();

const useInitialScreen = (): string | undefined => {
  const { user } = useAuth();
  const [initialScreen, setInitialScreen] = useState<undefined | string>(
    undefined
  );

  useEffect(() => {
    if (initialScreen) return;

    if (user === null) {
      setInitialScreen("/login");
    } else if (user) {
      setInitialScreen("/home");
    }
  }, [user, initialScreen]);

  return initialScreen;
};

const Index = (): JSX.Element => {
  const initialScreen = useInitialScreen();
  const isNavigationReady = useContext(NavigationReadyContext);

  useEffect(() => {
    if (initialScreen && isNavigationReady) {
      router.replace(initialScreen);
      SplashScreen.hideAsync();
    }
  }, [isNavigationReady, initialScreen]);

  return <Stack.Screen options={{ animation: "none", headerShown: false }} />;
};

export default Index;
