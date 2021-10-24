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
import { useSignUp } from "../providers/auth";

interface Props {}

export default function (props: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating },
    watch,
  } = useForm();

  const [signUpState, signUp] = useSignUp();
  const [show, setShow] = useState(false);

  function toggle() {
    setShow(!show);
  }

  function submit(data: FieldValues) {
    if (data.email && data.password) {
      signUp(data.email.toLowerCase() + "@kth.se", data.password);
    }
  }

  useEffect(() => {
    console.log(signUpState);
  }, [signUpState]);

  return (
    <CommonLayout primary>
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
        <Button
          colorScheme="white"
          isLoading={isSubmitting || isValidating}
          isFullWidth
          onPress={handleSubmit(submit)}
        >
          Sign up
        </Button>
      </VStack>
    </CommonLayout>
  );
}
