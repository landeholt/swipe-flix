import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { MainParamsList, MainRoutes } from "../types/main";
import ChatList from "../views/ChatList";
import ChatView from "../views/Chat";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { navigationStore } from "../providers/state";
import Swipe from "../views/Swipe";
import VideoPlayer from "../views/VideoPlayer";

const SwipeStack = createNativeStackNavigator<MainParamsList>();

export default function SwipeNavigation() {
  return (
    <SwipeStack.Navigator
      initialRouteName={MainRoutes.Swipe}
      screenOptions={{
        headerShown: false,
      }}
    >
      <SwipeStack.Screen name={MainRoutes.Swipe} component={Swipe} />
      <SwipeStack.Screen
        name={MainRoutes.VideoPlayer}
        component={VideoPlayer}
      />
    </SwipeStack.Navigator>
  );
}
