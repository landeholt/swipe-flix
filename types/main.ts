import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export enum MainRoutes {
  Swipe = "swipe",
  TBD = "tbd",
}

export interface MainParamsList extends ParamListBase {
  [MainRoutes.Swipe]: undefined;
}

export type MainNavigation<T extends keyof MainParamsList = string> =
  NativeStackNavigationProp<MainParamsList, T>;
