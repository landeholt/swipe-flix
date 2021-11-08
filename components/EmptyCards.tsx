import { Center } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import LogoIcon from "./LogoIcon";

const { height } = Dimensions.get("screen");

export default function EmptyCards() {
  return (
    <Center h={height * 0.8}>
      <LogoIcon />
    </Center>
  );
}
