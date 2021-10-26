import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../views/Register";
import LandingPage from "../views/LandingPage";
import { OnboardingParamsList, OnboardingRoutes } from "../types/onboarding";
import SignIn from "../views/SignIn";
import { useNavigation } from "@react-navigation/native";
import CreateProfile from "../views/CreateProfile";
import * as Linking from "expo-linking";
const OnboardingStack = createNativeStackNavigator<OnboardingParamsList>();

interface Props {
  user: boolean | null;
  profile: string | null;
}

export default function ({ profile, user }: Props) {
  const navigation = useNavigation();

  useEffect(() => {
    if (!profile && user) {
      /** @ts-ignore */
      navigation.navigate(OnboardingRoutes.CreateProfile);
    }
  }, [profile]);
  return (
    <OnboardingStack.Navigator
      //initialRouteName="claim-profile"
      initialRouteName="landing-page"
      screenOptions={{ headerShown: false }}
    >
      <OnboardingStack.Screen
        name={OnboardingRoutes.CreateProfile}
        component={CreateProfile}
      />
      <OnboardingStack.Screen
        name={OnboardingRoutes.LandingPage}
        component={LandingPage}
      />
      <OnboardingStack.Screen
        name={OnboardingRoutes.SignIn}
        component={SignIn}
      />

      <OnboardingStack.Screen
        name={OnboardingRoutes.Register}
        component={Register}
      />
    </OnboardingStack.Navigator>
  );
}
