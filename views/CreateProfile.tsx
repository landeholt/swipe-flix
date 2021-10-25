import { useNavigation, useRoute } from "@react-navigation/native";
import { Center, Spinner, Text } from "native-base";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import CommonLayout from "../components/CommonLayout";
import { useAuth, useSetSession, useSignIn } from "../providers/auth";
import { registerState } from "../providers/state";

interface Props {}

export default function CreateProfile(props: Props) {
  const registerFlow = useRecoilValue(registerState);
  const auth = useAuth();

  const { params } = useRoute();
  /** @ts-ignore */
  const user = params?.user ?? null;

  const [signInState, signIn] = useSignIn();

  useEffect(() => {
    const { email, otp } = registerFlow;
    console.log(registerFlow);
    if (email && otp) {
      const prefixEmail = email.split("@")[0];
      signIn(prefixEmail, otp);
    }
  }, []);

  if (auth?.loading && !auth.session) {
    return (
      <CommonLayout>
        <Center>
          <Spinner />
        </Center>
      </CommonLayout>
    );
  }
  return (
    <CommonLayout>
      <Text>{auth?.session?.user?.user_metadata.name}</Text>
    </CommonLayout>
  );
}
