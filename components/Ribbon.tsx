import { LinearGradient } from "expo-linear-gradient";
import { HStack, Box, IBoxProps, Flex, Text } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import React, { PropsWithChildren } from "react";
import { justifyContent } from "styled-system";
import { atRandom } from "../utils/array";

interface Props extends IBoxProps {
  type: "SUGGESTION" | "AD" | "PROFILE";
}

const PALETTES = [
  { start: "#c94b4b", end: "#4b134f", type: "SUGGESTION" },
  { start: "#302b63", end: "#24243e", type: "AD" },
  { start: "#ff9966", end: "#ff5e62", type: "PROFILE" },
];

export default function Ribbon({
  children,
  type,
  ...props
}: PropsWithChildren<Props>) {
  const colors = PALETTES.find((p) => p.type === type) || PALETTES[0];

  return (
    <HStack top={0} position="absolute" w="45%" h="45px" zIndex={10}>
      <LinearGradient
        colors={[colors.start, colors.end]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "center",
          paddingLeft: 25,
          width: "100%",
        }}
      >
        <Text bold italic fontSize="2xl">
          {children}
        </Text>
      </LinearGradient>

      <Box
        borderTopColor={colors.end}
        borderRightColor="transparent"
        borderTopWidth="45px"
        borderRightWidth="25px"
        h="45px"
        w="45px"
      ></Box>
    </HStack>
  );
}
