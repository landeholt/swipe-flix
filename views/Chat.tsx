import {
  Avatar,
  Box,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Spacer,
  VStack,
} from "native-base";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getParams } from "../utils/params";
import { getUser } from "../models/user";
import { getChat } from "../models/chat";
import ChatMessage from "../components/ChatMessage";
import { useSetRecoilState } from "recoil";
import { navigationStore } from "../providers/state";

interface Props {}

export default function Chat(props: Props) {
  const navigator = useNavigation();
  const params = getParams(props);
  const data = getChat(params.id);
  const recipient = getUser(params.recipientId);

  const setStore = useSetRecoilState(navigationStore);

  useEffect(() => {
    setStore((s) => ({ ...s, showBottomTab: false }));
    return () => {
      setStore((s) => ({ ...s, showBottomTab: true }));
    };
  }, []);
  return (
    <VStack bg="white.50">
      <HStack safeAreaTop shadow="2" w="full" px={1} pb={4}>
        <IconButton
          _pressed={{
            bg: "transparent",
          }}
          onPress={() => navigator.goBack()}
          icon={
            <Icon
              as={Ionicons}
              name="chevron-back-circle-outline"
              color="warmGray.600"
            />
          }
        />
        <Spacer />
        <Avatar
          size="md"
          borderColor="white.50"
          source={recipient.user_metadata.image.src}
        />
        <Spacer />
        <IconButton
          _pressed={{
            bg: "transparent",
          }}
          onPress={() => navigator.goBack()}
          icon={<Icon as={Ionicons} name="ios-shield" color="red.400" />}
        />
      </HStack>
      <ScrollView h="full">
        <VStack space={3} px={2}>
          {data?.conversation.map((message, key) => (
            <ChatMessage
              key={key}
              recieved={message.sent_by === parseInt(recipient.id)}
              userData={recipient}
              sent_at={message.sent_at}
              content={message.content}
            />
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
}
