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
        bg={props.recieved ? "coolGray.500" : "red.500"}
        rounded="lg"
        py={2}
        px={3}
        maxW="65%"
      >
        <Text color="white.50">{props.content}</Text>
      </Box>

      {props.recieved && (
        <>
          <Spacer />
          <Flex my="auto" justifyContent="center">
            <Text color="coolGray.200" bold fontSize="xs">
              {format(props.sent_at, "HH:mm bbb")}
            </Text>
          </Flex>
        </>
      )}
    </HStack>
  );
}
