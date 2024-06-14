import React, { useState, useMemo, useEffect } from "react";

import AuthApi from "@/api/AuthApi/AuthApi";
import TokensService from "@/api/TokensService";

import AuthContext from "./context";

function AuthProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [user, setUser] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const init = async (): Promise<void> => {
      await TokensService.init();
      if (!TokensService.accessToken) {
        setUser(null);
        return;
      }

      try {
        const userData = await AuthApi.getUser();
        setUser(userData);
      } catch {
        setUser(null);
      }
    };
    init();
  }, []);

  const authContext = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
