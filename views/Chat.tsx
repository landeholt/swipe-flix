import {
  Avatar,
  Box,
  HStack,
  Icon,
  IconButton,
  Input,
  ScrollView,
  Spacer,
  VStack,
  Button,
  TextArea,
  KeyboardAvoidingView,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getParams } from "../utils/params";
import { getUser } from "../models/user";
import { getChat } from "../models/chat";
import ChatMessage from "../components/ChatMessage";
import { useRecoilState, useSetRecoilState } from "recoil";
import { chatSelector, navigationStore } from "../providers/state";
import { nanoid } from "nanoid/non-secure";

interface Props {}

export default function Chat(props: Props) {
  const navigator = useNavigation();
  const params = getParams(props);
  //const data = getChat(params.id);
  const [chat, setChat] = useRecoilState(chatSelector(params.id));
  const recipient = getUser(params.recipientId);
  const sender = chat?.owners.find((p) => p !== params.recipientId);

  const setStore = useSetRecoilState(navigationStore);

  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState<string>();

  const ref = useRef(null);

  function sendMessage() {
    if (message && chat && sender !== undefined && message.length > 0) {
      setChat({
        ...chat,
        conversation: [
          ...chat.conversation,
          {
            content: message,
            sent_at: new Date(),
            sent_by: sender,
          },
        ],
      });
      /* @ts-ignore */
      ref.current.clear();
      setMessage("");
    }
  }

  useEffect(() => {
    setStore((s) => ({ ...s, showBottomTab: false }));
    return () => {
      setStore((s) => ({ ...s, showBottomTab: true }));
    };
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding">
      <VStack bg="white.50" h="full">
        <HStack
          bg="white.50"
          safeAreaTop
          shadow="2"
          w="full"
          px={1}
          pb={4}
          zIndex={1}
        >
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
        <ScrollView flexGrow={1}>
          <VStack space={3} px={2}>
            {chat?.conversation.map((message, key) => (
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
        <HStack
          pb={!isFocused ? 10 : 2}
          bg="white.50"
          py={4}
          shadow="2"
          w="full"
          px={2}
        >
          <TextArea
            flexGrow={1}
            _focus={{
              borderColor: "warmGray.300",
            }}
            onChangeText={setMessage}
            color="black"
            variant="filled"
            w="full"
            h="full"
            px={2}
            fontSize="lg"
            placeholderTextColor="black"
            selectionColor="red.300"
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            bg="warmGray.100"
            borderColor="warmGray.200"
            borderWidth={1}
            InputRightElement={
              <Button
                onPress={sendMessage}
                variant="ghost"
                _text={{ fontSize: "lg", color: "warmGray.600" }}
              >
                Send
              </Button>
            }
          />
        </HStack>
      </VStack>
    </KeyboardAvoidingView>
  );
}
