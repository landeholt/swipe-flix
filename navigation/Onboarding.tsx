import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../views/Register";
import LandingPage from "../views/LandingPage";
import { OnboardingParamsList, OnboardingRoutes } from "../types/onboarding";
import SignIn from "../views/SignIn";

const OnboardingStack = createNativeStackNavigator<OnboardingParamsList>();

export default function () {
  return (
    <OnboardingStack.Navigator
      initialRouteName="landing-page"
      screenOptions={{ headerShown: false }}
    >
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
