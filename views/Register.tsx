import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  Box,
  Center,
  FormControl,
  Input,
  Text,
  VStack,
  IconButton,
  Icon,
  Flex,
  useDisclose,
  Heading,
  Spacer,
} from "native-base";
import { useForm, Controller, FieldValues, FieldValue } from "react-hook-form";
import { Entypo } from "@expo/vector-icons";
import { FormData, IInputItem } from "../types/register";
import LogoIcon from "../components/LogoIcon";
import CommonLayout from "../components/CommonLayout";
import ControlledInput from "../components/ControlledInput";
import Button from "../components/Button";
import { useAuth, useSignUp } from "../providers/auth";
import * as Linking from "expo-linking";
import { useSetRecoilState } from "recoil";
import { registerState } from "../providers/state";
import PopupModal from "../components/PopupModal";
import { Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Props {}

export default function (props: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating },
    watch,
  } = useForm();

  const navigator = useNavigation();
  const { onOpen, onClose, isOpen } = useDisclose();

  const [signUpState, signUp] = useSignUp();
  const setRegisterState = useSetRecoilState(registerState);

  const auth = useAuth();
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<
    "pending" | "error" | "success" | "idle"
  >("idle");
  const [popupContent, setPopupContent] = useState<{
    status: string;
    message: string;
  }>({ status: "idle", message: "" });

  function toggle() {
    setShow(!show);
  }

  function submit(data: FieldValues) {
    Keyboard.dismiss();
    setStatus("idle");
    if (data.email) {
      setStatus("pending");
      signUp(data.email, "OTP-THIS-BISH");
    }
  }

  useEffect(() => {
    if (signUpState?.error) {
      setPopupContent({
        message: signUpState.error.message,
        status: "error",
      });
      setStatus("error");
      onOpen();
      return;
    }
    if (
      signUpState?.user &&
      signUpState.otp &&
      !signUpState.session &&
      !signUpState.error
    ) {
      const {
        user: { id, confirmed_at },
      } = signUpState;
      setRegisterState({
        email: signUpState.user.email as string,
        id,
        validated: confirmed_at ? true : false,
        otp: signUpState.otp,
      });
      setStatus("success");
      setPopupContent({
        message: `We have sent an email to ${signUpState.user.email}. \nYou must continue on this device.`,
        status: "success",
      });
      onOpen();
      return;
    }

    setStatus("idle");
  }, [signUpState]);

  return (
    <>
      <PopupModal onClose={onClose} isOpen={isOpen}>
        <Box mb={4} mt={6} w="full" px={1}>
          {popupContent.status === "error" && (
            <Flex h="200px">
              <Text color="red.500" fontSize="2xl" fontWeight="bold" mb={4}>
                Error
              </Text>
              <Text color="white.50" fontSize="xl" fontWeight="normal">
                {popupContent.message}
              </Text>
              <Spacer />
              <Button onPress={onClose}>Close</Button>
            </Flex>
          )}
          {popupContent.status === "success" && (
            <Flex h="200px">
              <Text color="warmGray.50" fontSize="2xl" fontWeight="bold" mb={4}>
                Please validate your email
              </Text>
              <Text color="white.50" fontSize="xl" fontWeight="normal">
                {popupContent.message}
              </Text>
              <Spacer />
              <Button
                onPress={() => {
                  onClose();
                  setTimeout(() => {
                    Linking.openURL("https://webmail.kth.se/");
                    navigator.goBack();
                  }, 350);
                }}
              >
                Continue to KTH webmail
              </Button>
            </Flex>
          )}
        </Box>
      </PopupModal>
      <CommonLayout primary safeArea>
        <VStack space={3} mt={5} alignItems="center" w="full">
          <LogoIcon />
          <Text>{JSON.stringify(watch())}</Text>
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
          {false && (
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
          )}
          <Button
            colorScheme="white"
            //isLoading={isSubmitting || isValidating}
            isLoading={status === "pending"}
            isFullWidth
            onPress={handleSubmit(submit)}
            //onPress={onOpen}
          >
            {status === "pending" ? "Claiming your profile" : "Claim profile"}
          </Button>
        </VStack>
      </CommonLayout>
    </>
  );
}
