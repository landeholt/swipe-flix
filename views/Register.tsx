import React, { useCallback, useMemo, useState } from "react";
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

interface Props {}

function InputItem(props: IInputItem) {
  return (
    <FormControl>
      <FormControl.Label
        _text={{ color: "red.400", fontSize: "sm", fontWeight: "medium" }}
      >
        {props.label}
      </FormControl.Label>
      <Controller
        name={props.name}
        defaultValue=""
        control={props.control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            type={props.type}
            isFullWidth
            size="2xl"
            variant="underlined"
            placeholder={props.placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            borderColor="warmGray.400"
            _focus={{
              borderColor: "red.400",
            }}
            InputRightElement={props.rightElement}
            InputLeftElement={props.leftElement}
          />
        )}
      />
    </FormControl>
  );
}

export default function (props: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [show, setShow] = useState(false);

  function toggle() {
    setShow(!show);
  }

  function submit(data: FieldValues) {
    console.log(data);
  }

  return (
    <Center safeArea flex={1} p={6} mx="auto" py={8} w="full" bg="warmGray.900">
      <VStack space={3} mt={5} alignItems="center" w="full">
        <LogoIcon />
        <Text>{JSON.stringify(watch())}</Text>
        <InputItem
          label="KTH Email"
          type="email"
          name="email"
          placeholder="John"
          control={control}
          rightElement={
            <Box p={2} position="absolute" right={0}>
              <Text color="warmGray.200">@kth.se</Text>
            </Box>
          }
        />
        <InputItem
          label="Password"
          type={show ? "text" : "password"}
          name="password"
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
                colorScheme="red"
              />
            </Box>
          }
        />
        <Button
          colorScheme="red"
          w="full"
          mt={8}
          h={16}
          onPress={handleSubmit(submit)}
        >
          Sign up
        </Button>
      </VStack>
    </Center>
  );
}
