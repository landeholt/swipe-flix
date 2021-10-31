import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { format, formatDistanceToNow } from "date-fns";
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
import CommonLayout from "../components/CommonLayout";
import MatchCard from "../components/MatchCard";
import { getChatMetadata } from "../models/chat";
import { getOtherUsers } from "../models/user";
import { useAuth } from "../providers/auth";
import { MainParamsList, MainRoutes } from "../types/main";
import Chat from "./Chat";

export default function ChatList() {
  const auth = useAuth();

  const navigator = useNavigation();

  const user = useMemo(() => auth && auth.session?.user, [auth]);

  const matches = useMemo(
    () => _.times(8, () => getOtherUsers(parseInt(user?.id ?? "0"))).flat(),
    [user]
  );

  /*
  const data = matches.map((match, key) => ({
    key,
    id: match.id,
    name: match.name,
    image: match.image,
    last_message_at: new Date(),
    recentText: "fake",
  }));
  */

  const data = getChatMetadata(parseInt(user?.id ?? "0"));

  function navigate(id: number, recipient: number) {
    /* @ts-ignore */
    navigator.navigate(MainRoutes.Chat, { id, recipientId: recipient });
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
              {matches.map((match, key) => (
                <MatchCard
                  key={key.toString()}
                  isNew={_.random(0, 1) ? true : false}
                  match={{
                    name: match.name,
                    image: { src: match.image.src },
                  }}
                />
              ))}
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
            data={data}
            renderItem={(data, rowMap) => (
              <Pressable
                key={data.item.id}
                onPress={() => navigate(data.item.id, data.item.recipient.id)}
              >
                <HStack
                  pl={4}
                  bg="white.50"
                  alignItems="center"
                  space={3}
                  py={4}
                >
                  <Avatar
                    source={data.item.recipient.user_metadata.image.src}
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
                        {data.item.recipient.user_metadata.name}{" "}
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
