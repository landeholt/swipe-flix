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
import ChatMessage from "../components/ChatMessage";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { chatSelector, navigationStore, userIdStore } from "../providers/state";
import { nanoid } from "nanoid/non-secure";
import { getRecipient } from "../utils/user";

interface Props {}

export default function Chat(props: Props) {
  const navigator = useNavigation();
  const params = getParams(props);
  const [chat, setChat] = useRecoilState(chatSelector(params.id));
  const recipient = getRecipient(params.id);
  const me = useRecoilValue(userIdStore);

  const setStore = useSetRecoilState(navigationStore);

  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState<string>();

  const ref = useRef(null);

  function sendMessage() {
    if (message && chat && message.length > 0) {
      const newMessage = {
        message,
        sent_at: new Date(),
        sent_by: me,
      };
      if (chat.conversation) {
        setChat({
          ...chat,
          conversation: {
            ...chat.conversation,
            content: [...chat.conversation?.content, newMessage],
          },
        });
      } else {
        setChat({
          ...chat,
          conversation: {
            id: nanoid(),
            owner: chat.owner,
            content: [newMessage],
          },
        });
      }

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

  const scrollViewRef = useRef();

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
            source={{ uri: chat?.image.src }}
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
        <ScrollView
          ref={scrollViewRef}
          flexGrow={1}
          onContentSizeChange={() => {
            /* @ts-ignore */
            scrollViewRef.current.scrollToEnd({ animated: true });
          }}
        >
          <VStack space={3} px={2} py={4}>
            {chat?.conversation &&
              chat.conversation.content.map((content, key) => (
                <ChatMessage
                  key={key}
                  recieved={content.sent_by !== me}
                  userData={chat}
                  sent_at={content.sent_at}
                  content={content.message}
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
