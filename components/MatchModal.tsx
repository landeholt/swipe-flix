import { LinearGradient } from "expo-linear-gradient";
import { nanoid } from "nanoid/non-secure";
import {
  Image,
  Modal,
  useDisclose,
  Text,
  Box,
  Center,
  Flex,
  Spacer,
  VStack,
  Input,
  Button,
} from "native-base";
import { IModalProps } from "native-base/lib/typescript/components/composites/Modal";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, ImageBackground } from "react-native";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { getMovieFromGenres } from "../models/profile";
import {
  chatSelector,
  ExtendedMatch,
  matchModalStore,
  userIdStore,
} from "../providers/state";

interface Props extends IModalProps {}

const { height } = Dimensions.get("window");

export default function MatchModal({ ...props }: Props) {
  const { onClose, onOpen, isOpen } = useDisclose();

  const modal = useRecoilValue(matchModalStore);
  const [chat, setChat] = useRecoilState(chatSelector(modal.profile?.id ?? 0));

  const me = useRecoilValue(userIdStore);

  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState<string>();
  const [movieOfInterest, setMovieOfInterest] = useState<{
    id: number;
    title: string;
    year: string;
    runtime: string;
    genres: string[];
    director: string;
    actors: string;
    plot: string;
    posterUrl: string;
  } | null>();

  const ref = useRef(null);

  const conversationStarter = "Start a conversation!";

  const suggestion = "you both havn't seen " + movieOfInterest?.title + "!";

  const _sendMessage = useRecoilCallback(({ snapshot, set }) => async () => {
    if (message && modal.profile && modal.profile.id && message.length > 0) {
      const newMessage = {
        message,
        sent_at: new Date(),
        sent_by: me,
      };
      /* @ts-ignore */
      set(chatSelector(modal.profile.id), (oldChat) => {
        console.log(oldChat);
        return {
          ...oldChat,
          conversation: {
            id: nanoid(),
            owner: [me, modal.profile?.id],
            content: [newMessage],
          },
        };
      });
      /* @ts-ignore */
      ref.current.clear();
      setMessage("");
      onClose();
    }
  });
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
      onClose();
    }
  }

  useEffect(() => {
    const movie = getMovieFromGenres(modal.profile?.id);
    setMovieOfInterest(movie);
  }, [modal]);
  useEffect(() => {
    if (modal.profile !== null) {
      onOpen();
    }
  }, [modal]);

  return (
    <Modal
      avoidKeyboard
      size="full"
      isOpen={isOpen}
      px={1}
      onClose={onClose}
      {...props}
    >
      <Modal.Content bg="red.500" top={"-5%"}>
        <Modal.Body h={`${height * 0.7}px`} p={0}>
          <ImageBackground
            source={{ uri: modal.profile?.image.src }}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <LinearGradient
              style={{
                height: "100%",
                width: "100%",
              }}
              colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.6)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 0.6 }}
            >
              <Flex h="full" w="full" px={2} py={8}>
                <Text fontSize="5xl" bold textAlign="center">
                  It's a match!
                </Text>
                <Text
                  fontSize="xl"
                  textAlign="center"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,

                    elevation: 6,
                  }}
                >
                  {suggestion}
                </Text>
                <Spacer />
                <Text>{modal.profile?.name}</Text>
                <Text>
                  {modal.profile?.uniqueGenres.slice(0, 3).join(" | ")}
                </Text>
                {false && (
                  <VStack mt={4}>
                    <Input
                      ref={ref}
                      onChangeText={setMessage}
                      variant="filled"
                      placeholder={conversationStarter}
                      InputRightElement={
                        <Button
                          onPress={_sendMessage}
                          variant="ghost"
                          _text={{ fontSize: "lg", color: "white.50" }}
                        >
                          Send
                        </Button>
                      }
                    />
                  </VStack>
                )}
              </Flex>
            </LinearGradient>
          </ImageBackground>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
