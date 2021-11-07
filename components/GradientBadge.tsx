import { LinearGradient } from "expo-linear-gradient";
import _ from "lodash";
import { Box, Text } from "native-base";
import React, { PropsWithChildren } from "react";
import { atRandom } from "../utils/array";

interface Props {}

const PALETTES = [
  { start: "#FC466B", end: "#3F5EFB" },
  { start: "#c94b4b", end: "#4b134f" },
  { start: "#302b63", end: "#24243e" },
  { start: "#ff9966", end: "#ff5e62" },
  { start: "#800080", end: "#ffc0cb" },
  { start: "#74ebd5", end: "#ACB6E5" },
];

export default function GradientBadge({ children }: PropsWithChildren<Props>) {
  const colors = atRandom(PALETTES);
  return (
    <Box>
      <LinearGradient
        colors={[colors.start, colors.end]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          paddingHorizontal: 8,
          width: "100%",
          paddingVertical: 3,
          borderRadius: 9,
        }}
      >
        <Text fontWeight="semibold">{children}</Text>
      </LinearGradient>
    </Box>
  );
}
