import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export enum OnboardingRoutes {
  LandingPage = "landing-page",
  Register = "register",
  SignIn = "sign-in",
  CreateProfile = "claim-profile",
}

export interface OnboardingParamsList extends ParamListBase {
  [OnboardingRoutes.LandingPage]: undefined;
  [OnboardingRoutes.Register]: undefined;
  [OnboardingRoutes.SignIn]: undefined;
}

export type OnboardingNavigation<
  T extends keyof OnboardingParamsList = string
> = NativeStackNavigationProp<OnboardingParamsList, T>;
