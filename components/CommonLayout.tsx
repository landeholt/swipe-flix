import { LinearGradient } from "expo-linear-gradient";
import { Box, IBoxProps, usePropsResolution, useSafeArea } from "native-base";
import React from "react";

interface Props extends IBoxProps {
  gradient?: boolean;
  primary?: boolean;
  secondary?: boolean;
}

export default function CommonLayout({
  children,
  primary,
  secondary,
  gradient,
  ...rest
}: Props) {
  const gradientConfig = {
    linearGradient: {
      colors: ["red.500", "amber.300"],
      start: [0, 0],
      end: [1, 1],
    },
  };

  const bg = primary
    ? "warmGray.900"
    : secondary
    ? "lightGray.100"
    : "warmGray.900";

  if (gradient) {
    return (
      <LinearGradient
        colors={["#f87171", "#fcd34d"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <Box flex={1} p={6} mx="auto" w="full" h="full" {...rest}>
          {children}
        </Box>
      </LinearGradient>
    );
  }
  return (
    <Box flex={1} mx="auto" pb={8} w="full" h="full" bg={bg} {...rest}>
      {children}
    </Box>
  );
}
