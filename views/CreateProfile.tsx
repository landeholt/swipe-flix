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
import React, { useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import CommonLayout from "../components/CommonLayout";
import ControlledInput from "../components/ControlledInput";
import { useAuth, useSetSession, useSignIn } from "../providers/auth";
import { registerState } from "../providers/state";
import { getMetadata } from "../utils/user";
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

  //const { params } = useRoute();

  const [signInState, signIn] = useSignIn();

  const data = getMetadata(auth);

  const name = useMemo(() => data?.name ?? "Anon", [data.name]);

  const minDate = useMemo(() => subYears(new Date(), 18), []);

  useEffect(() => {
    const { email, otp } = registerFlow;
    if (email && otp && !auth?.session) {
      const prefixEmail = email.split("@")[0];
      signIn(prefixEmail, otp);
    }
  }, []);

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
          <Box safeArea w="full" p={6} pb={16}>
            <Text fontSize="4xl" fontWeight="thin">
              Finally,{" "}
              <Text fontSize="4xl" bold>
                {name}!
              </Text>
            </Text>

            <VStack space={1}>
              <Text fontSize="md" fontWeight="light">
                KTH's network have been missing you!
              </Text>
              <Text fontSize="md" fontWeight="light">
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
                disabled={name !== "Anon" ? true : false}
                _disabled={{
                  bg: "warmGray.100",
                  color: "warmGray.700",
                }}
                color="warmGray.700"
                defaultValue={name}
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
            </VStack>
          </Box>
        </KeyboardAvoidingView>
      </ScrollView>
    </CommonLayout>
  );
}
