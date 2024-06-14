import React, {useEffect, useState} from 'react';

import {useNavigation} from 'expo-router';

import type {NavigationReadyProviderProps} from './types';

export const NavigationReadyContext = React.createContext<boolean>(false);

const NavigationReadyProvider: React.FC<NavigationReadyProviderProps> = ({
  children,
}) => {
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () =>
      setIsNavigationReady(true),
    );
    return unsubscribe;
  }, [navigation]);

  return (
    <NavigationReadyContext.Provider value={isNavigationReady}>
      {children}
    </NavigationReadyContext.Provider>
  );
};

export default NavigationReadyProvider;
