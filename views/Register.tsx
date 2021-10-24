import React, { useCallback, useMemo, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  Box,
  Center,
  FormControl,
  Input,
  Text,
  VStack,
  Button,
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

interface Props {}

export default function (props: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [show, setShow] = useState(false);

  async function handleImageLibrary() {
    const response = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (response.granted) {
      const library = await ImagePicker.launchImageLibraryAsync({
        exif: false,
        quality: 95,
        aspect: [3, 2],
      });
      console.log(library);
    }
  }
  function toggle() {
    setShow(!show);
  }

  function submit(data: FieldValues) {
    console.log(data);
  }

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
        <Button onPress={handleImageLibrary}>Pick images</Button>
        <Button
          colorScheme="white"
          w="full"
          mt={8}
          h={16}
          onPress={handleSubmit(submit)}
        >
          Sign up
        </Button>
      </VStack>
    </CommonLayout>
  );
}
