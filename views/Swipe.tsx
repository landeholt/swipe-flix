import { Box, Button, Flex, Spacer } from "native-base";
import React from "react";
import { useAuth } from "../providers/auth";

import sb from "../providers/supabase";

export default function Swipe() {
  const auth = useAuth();
  async function insert() {
    if (auth?.user) {
      console.log("INSERTING");

      await sb.from("test_table").insert({
        id: 100,
        content: "yas queen",
      });
    }
  }
  return (
    <Flex h="full" w="full">
      <Spacer />
      <Button onPress={insert}>click me</Button>
    </Flex>
  );
}
