import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Center,
  Container,
  Flex,
  FormControl,
  Heading,
  HStack,
  KeyboardAvoidingView,
  ScrollView,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "native-base";
import { Platform } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import CommonLayout from "../components/CommonLayout";
import ControlledInput from "../components/ControlledInput";
import { useAuth, useSetMetadata, useSignIn } from "../providers/auth";
import { registerState } from "../providers/state";
import { getMetadata, getUserId } from "../utils/user";
import {
  useForm,
  Controller,
  FieldValues,
  FieldValue,
  EventType,
} from "react-hook-form";
import { subYears } from "date-fns";
import ControlledTextArea from "../components/ControlledTextArea";
import ControlledDateTimePicker from "../components/ControlledDateTimePicker";
import ControlledInterestInput from "../components/ControlledInterestInput";
import Button from "../components/Button";
import { MainRoutes } from "../types/main";

interface Props {}

export default function CreateProfile(props: Props) {
  const registerFlow = useRecoilValue(registerState);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating },
    watch,
  } = useForm();

  const auth = useAuth();
  const setMeta = useSetMetadata();

  const navigator = useNavigation();

  const [signInState, signIn] = useSignIn();

  const data = getMetadata(auth);

  const minDate = useMemo(() => subYears(new Date(), 18), []);

  const [status, setStatus] = useState<
    "pending" | "success" | "error" | "idle"
  >("idle");

  function submit(data: FieldValues) {
    if (auth?.user) {
      setStatus("pending");
      setMeta({ ...data, profileId: getUserId(auth) });
    }
  }

  useEffect(() => {
    setStatus("idle");
    const { email, otp } = registerFlow;
    if (email && otp && !auth?.session) {
      setStatus("pending");
      const prefixEmail = email.split("@")[0];
      signIn(prefixEmail, otp);
      setStatus("idle");
      return;
    }
    setStatus("error");
  }, []);

  useEffect(() => {
    if (auth?.event === "USER_UPDATED") {
      setTimeout(() => {
        setStatus("success");
        /** @ts-ignore */
        navigator.navigate(MainRoutes.Swipe);
      }, 350);
    }
  }, [auth]);

  if (auth?.loading && !auth.session) {
    return (
      <CommonLayout gradient>
        <Center w="full" h="full">
          <Spinner />
        </Center>
      </CommonLayout>
    );
  }
  return (
    <CommonLayout gradient p={0}>
      <ScrollView>
        <KeyboardAvoidingView h="full" behavior={"position"}>
          <Box safeArea w="full" p={6} pb={8}>
            <Text fontSize="4xl" fontWeight="thin">
              Finally,{" "}
              <Text fontSize="4xl" bold>
                {data?.name ?? "Anon"}!
              </Text>
            </Text>

            <VStack space={1}>
              <Text fontSize="md" fontWeight="light">
                Check whether people from KTH already have liked you!
              </Text>
              <Text fontSize="md" fontWeight="light" mt={4}>
                What's left for you now is to complete your awesome profile!
              </Text>
            </VStack>
          </Box>

          <Box w="full" h="full" bg="white.50" p={6}>
            <Text color="black">{JSON.stringify(watch(), null, 2)}</Text>

            <VStack space={4} flex={1}>
              <ControlledInput
                labelProps={{
                  _text: { color: "warmGray.600" },
                }}
                control={control}
                label="Name"
                type="text"
                name="name"
                required
                disabled={data.name ? true : false}
                _disabled={{
                  bg: "warmGray.100",
                  color: "warmGray.700",
                }}
                value={data.name ? data.name : "Anon"}
                color="warmGray.700"
                defaultValue={data.name as string}
                variant="outline"
              />
              <ControlledTextArea
                labelProps={{ _text: { color: "warmGray.600" } }}
                color="warmGray.600"
                control={control}
                label="Express yourself"
                type="text"
                name="about"
                maxChar={500}
              />

              <ControlledDateTimePicker
                control={control}
                required
                value={minDate}
                maximumDate={minDate}
              />
              <ControlledInterestInput control={control} />
              <Button
                isLoading={status === "pending"}
                colorScheme="red"
                onPress={handleSubmit(submit)}
              >
                {status !== "pending" && "Start swiping"}
                {status === "pending" && "Updating profile"}
              </Button>
            </VStack>
          </Box>
        </KeyboardAvoidingView>
      </ScrollView>
    </CommonLayout>
  );
}
