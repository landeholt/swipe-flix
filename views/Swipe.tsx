import { Box, Button, Flex, Spacer, Text } from "native-base";
import React, { useEffect, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import { useAuth } from "../providers/auth";
import { userIdStore } from "../providers/state";

import sb from "../providers/supabase";

export default function Swipe() {
  const auth = useAuth();
  const setUserId = useSetRecoilState(userIdStore);
  const userid = useMemo(() => auth && auth.session?.user?.id, [auth]);

  const username = useMemo(
    () => auth && auth.session?.user?.user_metadata.name,
    [auth]
  );
  async function changeUser() {
    setUserId(userid === "0" ? 1 : 0);
  }
  useEffect(() => {
    console.log(auth);
  }, [auth]);
  return (
    <Flex h="full" w="full">
      <Spacer />
      <Text color="black">{username}</Text>
      <Button onPress={changeUser}>click me</Button>
    </Flex>
  );
}
