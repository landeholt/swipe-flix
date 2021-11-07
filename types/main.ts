import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export enum MainRoutes {
  SwipeNavigation = "swipeNavigation",
  Swipe = "swipe",
  Profile = "Profile",
  Explore = "Explore",
  ChatList = "ChatList",
  Chat = "Chat",
  ChatNavigation = "ChatNavigation",
  VideoPlayer = "VideoPlayer",
}

export interface MainParamsList extends ParamListBase {
  [MainRoutes.Swipe]: undefined;
}

export type MainNavigation<T extends keyof MainParamsList = string> =
  NativeStackNavigationProp<MainParamsList, T>;
