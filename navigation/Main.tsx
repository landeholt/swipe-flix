import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainRoutes } from "../types/main";
import { Avatar, Badge, Box, Icon, Text, VStack } from "native-base";
import { useAuth, useSignOut } from "../providers/auth";
import Swipe from "../views/Swipe";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import TabWrapper from "../components/TabWrapper";
import LogoTabIcon from "../components/LogoTabIcon";
import { useRecoilCallback, useRecoilValue } from "recoil";
import {
  navigationStore,
  notificationStore,
  userStore,
} from "../providers/state";

import ChatList from "../views/ChatList";
import Chat from "./Chat";
import Profile from "../views/Profile";
import SwipeNavigation from "./Swipe";
const MainStack = createBottomTabNavigator();

export default function () {
  const auth = useAuth();

  const store = useRecoilValue(navigationStore);

  const { newMatches } = useRecoilValue(notificationStore);

  return (
    <MainStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          display: store.showBottomTab ? "flex" : "none",
          justifyContent: "space-evenly",
        },

        tabBarIcon: ({ focused, color, size }) => {
          let IconBase: React.FunctionComponent = () => <></>;
          let notifications = false;
          switch (route.name) {
            case MainRoutes.SwipeNavigation:
              IconBase = () => (
                /*<Icon
                  as={AntDesign}
                  name="home"
                  color={focused ? "red.400" : "warmGray.500"}
                />*/
                <LogoTabIcon
                  focused={focused}
                  bg={"warmGray.500"}
                  color={focused ? "red.400" : "warmGray.500"}
                />
              );
              break;
            case MainRoutes.Profile:
              IconBase = () => (
                <Avatar
                  size="sm"
                  bg="red.100"
                  borderWidth={focused ? "2px" : "0"}
                  borderColor="red.400"
                ></Avatar>
              );
              break;
            case MainRoutes.ChatNavigation:
              IconBase = () => (
                <Icon
                  as={Ionicons}
                  name="chatbubbles-outline"
                  color={focused ? "red.400" : "warmGray.500"}
                />
              );
              notifications = newMatches;
              break;
            case MainRoutes.Explore:
              IconBase = () => (
                <Icon
                  as={MaterialCommunityIcons}
                  name="movie-search-outline"
                  color={focused ? "red.400" : "warmGray.500"}
                />
              );
              break;
          }

          return (
            <TabWrapper canReceieveNotifications={notifications}>
              <IconBase />
            </TabWrapper>
          );
        },
        tabBarShowLabel: false,
      })}
    >
      <MainStack.Screen
        name={MainRoutes.SwipeNavigation}
        component={SwipeNavigation}
      />
      <MainStack.Screen name={MainRoutes.ChatNavigation} component={Chat} />
      <MainStack.Screen name={MainRoutes.Profile} component={Profile} />
    </MainStack.Navigator>
  );
}
