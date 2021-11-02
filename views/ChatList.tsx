import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { differenceInSeconds, format, formatDistanceToNow } from "date-fns";
import { sv } from "date-fns/locale";
import _ from "lodash";
import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  ScrollView,
  Avatar,
  Pressable,
  Spacer,
  Stack,
} from "native-base";
import React, { useMemo } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { useRecoilState, useRecoilValue } from "recoil";
import MatchCard from "../components/MatchCard";
import { useAuth } from "../providers/auth";
import {
  chatMetaStore,
  chatStore,
  ExtendedMatch,
  IMatch,
  matchStore,
} from "../providers/state";
import { MainParamsList, MainRoutes } from "../types/main";

export default function ChatList() {
  const auth = useAuth();

  const navigator = useNavigation();

  const [matches, setMatches] = useRecoilState(matchStore);
  const chats = useRecoilValue(chatMetaStore);

  const matchesWithConversations = useMemo(
    () => matches.filter((p) => p.conversation === null),
    [matches]
  );

  function openMatch(match: ExtendedMatch) {
    if (match.isFresh) {
      const otherMatches = matches.filter((p) => p.id !== match.id);

      setMatches([...otherMatches, { ...match, isFresh: false }]);
    }
  }

  function navigate(id: number, recipient: number) {
    /* @ts-ignore */
    navigator.navigate(MainRoutes.Chat, { id, recipientId: recipient });
  }

  function dateDiff({ matched_at }: ExtendedMatch) {
    return differenceInSeconds(new Date(), matched_at);
  }

  return (
    <ScrollView bg="white.50">
      <Flex h="full" w="full">
        <Box px={2} safeAreaTop h="250px">
          <Text mb={4} color="red.400" fontWeight="bold" fontSize="lg">
            Your matches
          </Text>
          <Box>
            <ScrollView w="full" horizontal alwaysBounceHorizontal>
              {_.sortBy(matchesWithConversations, dateDiff).map(
                (match, key) => (
                  <Pressable
                    key={key.toString()}
                    onPress={() => openMatch(match)}
                  >
                    <MatchCard
                      isFresh={match.isFresh}
                      match={{
                        name: match.name,
                        image: { src: match.image.src },
                      }}
                    />
                  </Pressable>
                )
              )}
            </ScrollView>
          </Box>
        </Box>
        <Box h="full" mb={64}>
          <Text
            px={4}
            mt={4}
            mb={4}
            color="red.400"
            fontWeight="bold"
            fontSize="lg"
          >
            Messages
          </Text>
          <SwipeListView
            overScrollMode="auto"
            scrollEnabled={false}
            data={chats}
            renderItem={(data, rowMap) => (
              <Pressable
                key={data.item.id}
                onPress={() => navigate(data.item.id, data.item.recipient)}
              >
                <HStack
                  pl={4}
                  bg="white.50"
                  alignItems="center"
                  space={3}
                  py={4}
                >
                  <Avatar
                    source={{ uri: data.item.image.src }}
                    size="lg"
                    bg="warmGray.200"
                    borderColor="warmGray.200"
                  ></Avatar>
                  <VStack
                    py={2}
                    ml={2}
                    w="full"
                    h="full"
                    borderBottomWidth={1}
                    borderBottomColor="warmGray.200"
                  >
                    <Stack direction="row" alignItems="baseline">
                      <Text
                        color="warmGray.600"
                        fontSize="lg"
                        fontWeight="medium"
                      >
                        {data.item.name}{" "}
                      </Text>
                      <Text
                        ml={2}
                        color="warmGray.500"
                        fontSize="xs"
                        fontWeight="semibold"
                      >
                        {data.item.sent_at &&
                          formatDistanceToNow(data.item.sent_at, {
                            locale: sv,
                            addSuffix: true,
                          })}
                      </Text>
                    </Stack>
                    <Spacer />
                    <Text color="warmGray.500" fontSize="md" fontWeight="light">
                      {data.item.message}
                    </Text>
                  </VStack>
                </HStack>
              </Pressable>
            )}
            renderHiddenItem={(data, rowMap) => (
              <Box>
                <Text color="black">Left</Text>
                <Text color="black">Right</Text>
              </Box>
            )}
          />
        </Box>
      </Flex>
    </ScrollView>
  );
}
