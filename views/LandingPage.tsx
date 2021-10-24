import React, { useCallback, useMemo, useState } from "react";
import { Box, Center, FormControl, Input, Text, VStack } from "native-base";
import { useForm, Controller, FieldValues, FieldValue } from "react-hook-form";
import { Entypo } from "@expo/vector-icons";
import { FormData, IInputItem } from "../types/register";
import LogoIcon from "../components/LogoIcon";
import Button from "../components/Button";
import CommonLayout from "../components/CommonLayout";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OnboardingNavigation, OnboardingRoutes } from "../types/onboarding";

interface Props {
  navigation: OnboardingNavigation<OnboardingRoutes.LandingPage>;
}

export default function ({ navigation, ...props }: Props) {
  return (
    <CommonLayout gradient>
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
          Create an account
        </Button>
        <Button variant="outline" colorScheme="white" isFullWidth>
          Sign in
        </Button>
      </VStack>
    </CommonLayout>
  );
}
