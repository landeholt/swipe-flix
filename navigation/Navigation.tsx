import React, { ReactChild, ReactChildren, useEffect } from "react";
import {
  ParamListBase,
  PathConfig,
  useNavigation,
} from "@react-navigation/native";

import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../providers/auth";
import Onboarding from "./Onboarding";
import Main from "./Main";
import { getProfileId } from "../utils/user";
import * as Linking from "expo-linking";
import { OnboardingParamsList, OnboardingRoutes } from "../types/onboarding";

/** extremely bad practice, but we got 12 days on us.. */
const predefinedPaths = ["sign-in", "claim-profile"];

interface DeeplinkProps {}

function DeeplinkRouter(props: React.PropsWithChildren<DeeplinkProps>) {
  const navigation = useNavigation();
  useEffect(() => {
    function route(event: Linking.EventType) {
      const { path: rawPath, queryParams } = Linking.parse(event.url);

      const path = rawPath?.endsWith("/") ? rawPath.slice(0, -1) : rawPath;
      if (path && predefinedPaths.includes(path)) {
        /* @ts-ignore */
        navigation.navigate(path, queryParams);
      }
    }
    Linking.addEventListener("url", route);
    return () => {
      Linking.removeEventListener("url", route);
    };
  }, []);
  return <>{props.children}</>;
}

export default function () {
  const auth = useAuth();
  const user = auth?.user ?? null;

  const profile = getProfileId(auth);

  const onboardingProps = { profile, user };

  console.log("profile: ", profile);
  return (
    <NavigationContainer>
      <DeeplinkRouter>
        {/*user === null && <Loading/>*/}
        {user && profile && <Main />}
        {(user === false || !profile) && <Onboarding {...onboardingProps} />}
      </DeeplinkRouter>
    </NavigationContainer>
  );
}
