import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../providers/auth";
import Onboarding from "./Onboarding";

export default function () {
  const auth = useAuth();
  const user = auth?.user;

  return (
    <NavigationContainer>
      {/*user === null && <Loading/>*/}
      {user === false && <Onboarding />}
      {/*user === null && <Main/>*/}
    </NavigationContainer>
  );
}
