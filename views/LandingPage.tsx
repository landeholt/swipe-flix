import React, { useCallback, useMemo, useState } from "react";
import { Box, Center, FormControl, Input, Text, VStack } from "native-base";
import LogoIcon from "../components/LogoIcon";
import Button from "../components/Button";
import CommonLayout from "../components/CommonLayout";
import { OnboardingNavigation, OnboardingRoutes } from "../types/onboarding";
import * as Linking from "expo-linking";
interface Props {
  navigation: OnboardingNavigation<OnboardingRoutes.LandingPage>;
}

export default function ({ navigation, ...props }: Props) {
  return (
    <CommonLayout gradient safeArea>
      <VStack space={8} top="25%" alignItems="center" w="full" h="full">
        <LogoIcon />
        <Center mb={4}>
          <Text>
            By clicking on sign in you agree to our{" "}
            <Text underline>terms of service.</Text>
            Read more about how we process your information in our{" "}
            <Text underline>privacy policy</Text>
          </Text>
        </Center>
        <Button
          variant="solid"
          colorScheme="white"
          isFullWidth
          onPress={() => navigation.navigate("register")}
        >
          Claim a profile
        </Button>
        <Button
          variant="outline"
          colorScheme="white"
          isFullWidth
          onPress={() => navigation.navigate("sign-in")}
        >
          Sign in
        </Button>
      </VStack>
    </CommonLayout>
  );
}
