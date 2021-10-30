import { format } from "date-fns";
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
} from "native-base";
import React, { useMemo } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { HideCard, ShowCard } from "../components/ChatListCard";
import MatchCard from "../components/MatchCard";
import { getOtherUsers } from "../models/user";
import { useAuth } from "../providers/auth";

export default function Chat() {
  const auth = useAuth();

  const user = useMemo(() => auth && auth.session?.user, [auth]);

  const matches = useMemo(
    () => _.times(8, () => getOtherUsers(parseInt(user?.id ?? "0"))).flat(),
    [user]
  );

  const data = matches.map((match, key) => ({
    key,
    name: match.name,
    image: match.image,
    last_message_at: new Date(),
    recentText: "fake",
  }));
  return (
    <ScrollView>
      <Flex h="full" w="full" bg="white.50" safeAreaBottom>
        <Box px={2} safeArea h="30%">
          <Text mb={4} color="red.400" fontWeight="bold" fontSize="lg">
            Your matches
          </Text>
          <Box>
            <ScrollView w="full" horizontal alwaysBounceHorizontal>
              {matches.map((match, key) => (
                <MatchCard
                  key={key}
                  isNew={_.random(0, 1) ? true : false}
                  match={{ name: match.name, image: { src: match.image.src } }}
                />
              ))}
            </ScrollView>
          </Box>
        </Box>
        <Box>
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
            scrollEnabled
            overScrollMode="auto"
            data={data}
            renderItem={(data, rowMap) => (
              <HStack pl={4} bg="white.50" alignItems="center" space={3} py={4}>
                <Avatar
                  source={data.item.image.src}
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
                  <Text color="warmGray.600" fontSize="lg" fontWeight="medium">
                    {data.item.name}
                  </Text>
                  <Spacer />
                  <Text color="warmGray.500" fontSize="md" fontWeight="light">
                    {data.item.recentText}
                  </Text>
                </VStack>
              </HStack>
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
