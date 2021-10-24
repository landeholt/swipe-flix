import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Center,
  FormControl,
  Input,
  Modal,
  Text,
  VStack,
  Button as NativeButton,
  IconButton,
  Icon,
} from "native-base";
import { useForm, Controller, FieldValues, FieldValue } from "react-hook-form";
import { Entypo } from "@expo/vector-icons";
import { FormData, IInputItem } from "../types/register";
import LogoIcon from "../components/LogoIcon";
import CommonLayout from "../components/CommonLayout";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OnboardingNavigation, OnboardingRoutes } from "../types/onboarding";
import Button from "../components/Button";
import ControlledInput from "../components/ControlledInput";
import { useSignIn } from "../providers/auth";

interface Props {
  navigation: OnboardingNavigation<OnboardingRoutes.LandingPage>;
}

const ButtonGroup = NativeButton.Group;

export default function ({ navigation, ...props }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating },
    watch,
  } = useForm();

  const [auth, signIn] = useSignIn();
  function toggle() {
    setShow(!show);
  }

  function handleSignIn(data: FieldValues) {
    if (data.email && data.password) {
      signIn(data.email, data.password);
    }
  }

  return (
    <>
      <Modal
        avoidKeyboard
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="xl"
      >
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Sign in with email</Modal.Header>
          <Modal.Body>
            <ControlledInput
              label="KTH Email"
              type="email"
              name="email"
              required
              placeholder="John"
              control={control}
              rules={{
                minLength: {
                  value: 2,
                  message: "Atleast 2 characters needed",
                },
                required: "This field is required",
                validate: (str: string) => {
                  if (/[^@]{2,}@(ug\.)?kth\.se/.test(str)) {
                    const [user, suffix] = str.split("@");
                    return `Remove @${suffix}`;
                  }
                  if (/\S+@\S+\.\S+/.test(str)) {
                    return "only KTH users are permitted";
                  }
                },
              }}
              rightElement={
                <Box p={2} position="absolute" right={0}>
                  <Text color="warmGray.200">@kth.se</Text>
                </Box>
              }
            />
            <ControlledInput
              label="Password"
              type={show ? "text" : "password"}
              name="password"
              required
              control={control}
              rules={{
                required: "This field is required",
                minLength: 8,
              }}
              rightElement={
                <Box p={2}>
                  <IconButton
                    onPress={toggle}
                    icon={
                      show ? (
                        <Icon as={Entypo} name="eye" size="xs" />
                      ) : (
                        <Icon as={Entypo} name="eye-with-line" size="xs" />
                      )
                    }
                    variant="solid"
                    size="sm"
                    colorScheme="white"
                  />
                </Box>
              }
            />
          </Modal.Body>
          <Modal.Footer>
            <ButtonGroup space={2}>
              <NativeButton
                variant="ghost"
                colorScheme="warmGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </NativeButton>
              <NativeButton
                isLoading={isValidating || isSubmitting}
                colorScheme="red"
                onPress={handleSubmit(handleSignIn)}
              >
                Sign in
              </NativeButton>
            </ButtonGroup>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
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
            variant="outline"
            colorScheme="white"
            isFullWidth
            onPress={() => setShowModal(true)}
          >
            Sign in with email
          </Button>
          <Button variant="outline" colorScheme="white" isFullWidth>
            Sign in with Facebook
          </Button>
        </VStack>
      </CommonLayout>
    </>
  );
}
