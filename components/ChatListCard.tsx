import { format } from "date-fns";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  HStack,
  Avatar,
  VStack,
  Spacer,
  Pressable,
  Text,
  Icon,
} from "native-base";
import React from "react";

interface ShowProps {
  match: {
    name: string;
    image: {
      src: any;
    };
    last_message_at: Date;
    recentText: string;
  };
  key: number;
}

export function ShowCard({ match, key }: ShowProps) {
  return (
    <Box>
      <Pressable onPress={() => console.log("You touched me")} bg="white">
        <Box pl="4" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <Avatar size="48px" />
            <VStack>
              <Text color="coolGray.800" _dark={{ color: "warmGray.50" }} bold>
                {match.name}
              </Text>
              <Text color="coolGray.600" _dark={{ color: "warmGray.200" }}>
                {match.recentText}
              </Text>
            </VStack>
            <Spacer />
            <Text
              fontSize="xs"
              color="coolGray.800"
              _dark={{ color: "warmGray.50" }}
              alignSelf="flex-start"
            >
              {format(match.last_message_at, "HH:mm bbb")}
            </Text>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );
}

interface HideProps {
  data: any[];
  rowMap: any[];
}

export function HideCard({ rowMap, data }: HideProps) {
  const closeRow = (rowMap: HideProps["rowMap"], rowKey: number) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: HideProps["rowMap"], rowKey: number) => {
    closeRow(rowMap, rowKey);
    //const newData = [...listData];
    //const prevIndex = listData.findIndex((item) => item.key === rowKey);
    //newData.splice(prevIndex, 1);
    //setListData(newData);
  };

  const onRowDidOpen = (rowKey: number) => {
    console.log("This row opened", rowKey);
  };

  return (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        cursor="pointer"
        bg="coolGray.200"
        justifyContent="center"
        onPress={() => closeRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon
            as={<Entypo name="dots-three-horizontal" />}
            size="xs"
            color="coolGray.800"
          />
          <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
            More
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );
}
