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
  Circle,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
import MessageFeedback from "../components/MessageFeedback";
import _ from "lodash";
import IceBreaker from "../components/IceBreaker";
import MovieSelection from "../components/MovieSelection";
interface Props {}

export default function Chat(props: Props) {
  const navigator = useNavigation();
  const params = getParams(props);
  const [chat, setChat] = useRecoilState(chatSelector(params.id));
  const recipient = getRecipient(params.id);
  const me = useRecoilValue(userIdStore);

  const [isWriting, setIsWriting] = useState(false);

  const [showMovieSelection, setShowMovieSelection] = useState(false);

  const setStore = useSetRecoilState(navigationStore);

  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState<string>();

  const ref = useRef(null);

  function sendMessage(byPass: boolean = false) {
    const newMessage = {
      message: byPass ? "Har du set dirty dancing?" : message,
      sent_at: new Date(),
      sent_by: byPass ? recipient.id : me,
    };
    if (chat?.conversation) {
      setChat({
        ...chat,
        conversation: {
          ...chat.conversation,
          /* @ts-ignore */
          content: [...chat.conversation?.content, newMessage],
        },
      });
    } else {
      setChat({
        ...chat,
        conversation: {
          id: nanoid(),
          /* @ts-ignore */
          owner: chat.owner,
          /* @ts-ignore */
          content: [newMessage],
        },
      });
    }

    if (!byPass) {
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

  useEffect(() => {
    setTimeout(() => {
      const lastMessage = _.last(chat?.conversation?.content);
      if (lastMessage?.sent_by === recipient.id) {
        console.log("aborting write mechanism");
        return;
      }

      setIsWriting(true),
        setTimeout(() => {
          setIsWriting(false);
          sendMessage(true);
        }, 8500);
    }, 7500);
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding">
      <VStack bg="coolGray.800" h="full">
        <HStack
          bg="coolGray.700"
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
                color="coolGray.500"
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
            icon={<Icon as={Ionicons} name="ios-shield" color="red.500" />}
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
            {chat?.conversation && <IceBreaker />}
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
            {isWriting && <MessageFeedback />}
          </VStack>
        </ScrollView>
        <VStack
          pb={!isFocused ? 10 : 2}
          bg="coolGray.700"
          py={4}
          shadow="2"
          px={2}
        >
          {showMovieSelection && (
            <MovieSelection
              genres={recipient.uniqueGenres}
              onClose={() => setShowMovieSelection(false)}
            />
          )}
          {!showMovieSelection && (
            <HStack w="full">
              <TextArea
                flexGrow={1}
                _focus={{
                  borderColor: "coolGray.300",
                }}
                onChangeText={setMessage}
                color="black"
                variant="filled"
                w="full"
                h="full"
                px={2}
                fontSize="lg"
                placeholderTextColor="black"
                selectionColor="red.400"
                ref={ref}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                bg="coolGray.500"
                borderColor="coolGray.400"
                borderWidth={1}
                InputRightElement={
                  <Button
                    onPress={() => sendMessage()}
                    variant="ghost"
                    _text={{ fontSize: "lg", color: "coolGray.50" }}
                  >
                    Send
                  </Button>
                }
              />
            </HStack>
          )}
          <HStack py={2}>
            <IconButton
              onPress={() => setShowMovieSelection(!showMovieSelection)}
              _icon={{
                as: MaterialCommunityIcons,
                name: "movie-search-outline",
                size: "sm",
                color: "coolGray.700",
              }}
              p={2}
              _focus={{
                bg: "coolGray.500",
              }}
              _pressed={{
                bg: "coolGray.500",
              }}
              bg={showMovieSelection ? "red.500" : "coolGray.500"}
              size="sm"
              variant="solid"
              rounded="full"
            />
          </HStack>
        </VStack>
      </VStack>
    </KeyboardAvoidingView>
  );
}
