import { Box } from "native-base";
import React from "react";
import { useSetRecoilState } from "recoil";
import Button from "../components/Button";
import { userIdStore } from "../providers/state";

export default function Profile() {
  const toggleProfile = useSetRecoilState(userIdStore);
  function changeProfile() {
    toggleProfile((otherId) => {
      return otherId === 0 ? 1 : 0;
    });
  }

  return (
    <Box safeArea h="full" bg="coolGray.800">
      <Button onPress={changeProfile}>change user</Button>
    </Box>
  );
}
