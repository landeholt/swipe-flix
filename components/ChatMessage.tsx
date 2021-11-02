import { User } from "@supabase/supabase-js";
import format from "date-fns/format";
import { Avatar, Box, Flex, HStack, Spacer, Text } from "native-base";
import React from "react";
import { Profile } from "../providers/state";

interface Props {
  content: string;
  recieved: boolean;
  sent_at: Date;
  userData: Profile;
}

export default function ChatMessage(props: Props) {
  return (
    <HStack alignItems="flex-end" w="full" space={3}>
      {props.recieved && (
        <Avatar
          borderColor="white.50"
          source={{ uri: props.userData.image.src }}
          size="sm"
        />
      )}
      {!props.recieved && <Spacer />}
      <Box
        borderColor="white.50"
        bg={props.recieved ? "warmGray.300" : "red.300"}
        rounded="lg"
        py={2}
        px={3}
        maxW="65%"
      >
        <Text color="black">{props.content}</Text>
      </Box>

      {props.recieved && (
        <>
          <Spacer />
          <Flex my="auto" justifyContent="center">
            <Text color="black" fontSize="xs">
              {format(props.sent_at, "HH:mm bbb")}
            </Text>
          </Flex>
        </>
      )}
    </HStack>
  );
}
