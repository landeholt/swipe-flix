import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { MainParamsList, MainRoutes } from "../types/main";
import ChatList from "../views/ChatList";
import ChatView from "../views/Chat";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { navigationStore } from "../providers/state";

const ChatStack = createNativeStackNavigator<MainParamsList>();

export default function Chat() {
  return (
    <ChatStack.Navigator
      initialRouteName={MainRoutes.ChatList}
      screenOptions={{
        headerShown: false,
      }}
    >
      <ChatStack.Screen name={MainRoutes.ChatList} component={ChatList} />
      <ChatStack.Screen name={MainRoutes.Chat} component={ChatView} />
    </ChatStack.Navigator>
  );
}
