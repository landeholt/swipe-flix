import { VStack, Box, Icon } from "native-base";
import React, { PropsWithChildren } from "react";

interface Props {
  canReceieveNotifications: boolean;
}

export default function TabWrapper(props: PropsWithChildren<Props>) {
  return (
    <VStack w="45px" h="45px" justifyContent="center" alignItems="center">
      {props.canReceieveNotifications && (
        <Box
          h={2}
          w={2}
          mb={-2}
          mr={1.5}
          zIndex={1}
          rounded="full"
          alignSelf="flex-end"
          bg="danger.400"
          _text={{ color: "white.50" }}
        />
      )}
      {props.children}
    </VStack>
  );
}
