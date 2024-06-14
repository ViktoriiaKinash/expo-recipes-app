import { useContext } from "react";

import AuthContext from "@/context/auth/context";
import { AuthType } from "@/context/auth/types";

export const useAuth = (): AuthType => {
  const currentAuth = useContext(AuthContext);
  if (!currentAuth) {
    throw new Error("No user available within the context");
  }

  return currentAuth;
};
