import {
  FormControl,
  Box,
  Modal,
  useDisclose,
  Text,
  Badge,
  Flex,
  IconButton,
  Icon,
  Button,
} from "native-base";
import { Control, Controller } from "react-hook-form";
import React, { useState } from "react";
import { Pressable } from "react-native";
import { Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";

interface Props {
  control: Control;
}

interface InterestOption {
  value: string;
  label: string;
}

const { height } = Dimensions.get("window");

// should be stored on supabase pref.
const interestArray: InterestOption[] = [
  {
    label: "Foodie",
    value: "foodie",
  },
  {
    label: "Coffee",
    value: "coffee",
  },
  {
    label: "Thriller",
    value: "thriller",
  },

  {
    label: "Horror",
    value: "horror",
  },
  {
    label: "Popcorn",
    value: "popcorn",
  },
  {
    label: "SF1514",
    value: "lolk",
  },
  {
    label: "Reading",
    value: "reading",
  },
  {
    label: "Netflix",
    value: "netflix",
  },
];
export default function ControlledInterestInput(props: Props) {
  const [chosenInterests, setChosenInterests] = useState<InterestOption[]>([]);
  const { onOpen, isOpen, onClose } = useDisclose();

  function isChosen(interest: InterestOption) {
    return chosenInterests.find((i) => i.value === interest.value);
  }

  function selectOption(interest: InterestOption) {
    let currentInterests = [];

    if (isChosen(interest)) {
      currentInterests = chosenInterests.filter(
        (i) => i.value !== interest.value
      );
      setChosenInterests([...currentInterests]);
    } else {
      currentInterests = [...chosenInterests, interest];
      setChosenInterests([...currentInterests]);
    }
    return currentInterests.map((interest) => interest.value);
  }

  return (
    <Controller
      control={props.control}
      name="interests"
      render={({ field: { onChange, value } }) => (
        <>
          <Modal
            onClose={onClose}
            isOpen={isOpen}
            size="full"
            animationPreset="slide"
            safeArea={false}
          >
            <Modal.Content bg="warmGray.100">
              <Modal.Header
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                borderBottomColor="warmGray.100"
                _text={{
                  color: "warmGray.600",
                  fontWeight: "bold",
                  fontSize: "2xl",
                }}
              >
                Interests
                <Button colorScheme="red" onPress={onClose}>
                  Done
                </Button>
              </Modal.Header>

              <Modal.Body h={`${height}px`} p={4}>
                <Text fontSize="md" color="warmGray.600">
                  Choose the interests you want to share.
                </Text>
                <Flex flexWrap="wrap" flexDirection="row" mt={8}>
                  {interestArray.map((interest, key) => {
                    return (
                      <Pressable
                        key={key}
                        onPress={() => onChange(selectOption(interest))}
                      >
                        <Badge
                          mr={2}
                          mb={2}
                          rounded="md"
                          variant="outline"
                          borderWidth={2}
                          _text={{ fontSize: "xl", fontWeight: "bold" }}
                          colorScheme={isChosen(interest) ? "red" : "gray"}
                        >
                          {interest.label}
                        </Badge>
                      </Pressable>
                    );
                  })}
                </Flex>
              </Modal.Body>
            </Modal.Content>
          </Modal>
          <FormControl>
            <FormControl.Label _text={{ color: "warmGray.600" }}>
              Interests
            </FormControl.Label>
            <Pressable onPress={onOpen}>
              <Box
                rounded="sm"
                borderWidth={1}
                borderColor="warmGray.400"
                minH={20}
                position="relative"
              >
                <Flex
                  position="absolute"
                  top={0}
                  h="full"
                  justifyContent="center"
                  bottom={0}
                  right={0}
                  pr={1}
                >
                  <Icon as={Entypo} name="chevron-right" color="warmGray.300" />
                </Flex>
                <Text color="warmGray.600" fontSize="md" p={2}>
                  {chosenInterests.map((interest) => interest.label).join(", ")}
                </Text>
              </Box>
            </Pressable>
          </FormControl>
        </>
      )}
    />
  );
}
