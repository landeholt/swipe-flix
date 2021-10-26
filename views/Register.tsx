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

interface Props {}

export default function (props: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating },
    watch,
  } = useForm();

  const [signUpState, signUp] = useSignUp();
  const setRegisterState = useSetRecoilState(registerState);

  const auth = useAuth();
  const [show, setShow] = useState(false);

  function toggle() {
    setShow(!show);
  }

  function submit(data: FieldValues) {
    if (data.email) {
      signUp(data.email, "OTP-THIS-BISH");
    }
  }

  useEffect(() => {
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
    }
  }, [signUpState]);

  return (
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
          isLoading={isSubmitting || isValidating}
          isFullWidth
          onPress={handleSubmit(submit)}
        >
          Claim your profile
        </Button>
      </VStack>
    </CommonLayout>
  );
}
