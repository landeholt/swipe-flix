import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainRoutes } from "../types/main";
import { Box, Text } from "native-base";
import { useAuth } from "../providers/auth";

const MainStack = createNativeStackNavigator();

export default function () {
  const auth = useAuth();
  return (
    <MainStack.Navigator
      initialRouteName="tbd"
      screenOptions={{ headerShown: true }}
    >
      {/*<MainStack.Screen
        name={MainRoutes.Swipe}
        component={}
      />*/}
    </MainStack.Navigator>
  );
}
