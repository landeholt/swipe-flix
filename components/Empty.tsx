import { Center, Text } from "native-base";
import * as React from "react";
import { Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";

interface Props {
  width: number;
  height: number;
  message: string;
}

const { height: h } = Dimensions.get("window");

function SvgComponent({ width, height, message }: Props) {
  return (
    <Center h={h * 0.5}>
      <Svg width={width} height={height} fill="none" viewBox="0 0 512 448">
        <Path
          d="M480 0H32C14.328 0 0 14.326 0 32v384c0 17.674 14.328 32 32 32h448c17.672 0 32-14.326 32-32V32c0-17.674-14.328-32-32-32zm-32 288h-80c-17.672 0-32 14.326-32 32v32H176v-32c0-17.674-14.328-32-32-32H64V64h384v224z"
          fill="#374151"
        />
      </Svg>

      <Text pt={4} color="white.50" textAlign="center" fontSize="xl">
        {message}
      </Text>
    </Center>
  );
}

export default SvgComponent;
