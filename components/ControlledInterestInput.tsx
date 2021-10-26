import {
  FormControl,
  Box,
  Modal,
  useDisclose,
  Text,
  Badge,
  Flex,
} from "native-base";
import { Control, Controller } from "react-hook-form";
import React, { useState } from "react";
import { Pressable } from "react-native";
import { Dimensions } from "react-native";

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
    if (isChosen(interest)) {
      setChosenInterests([
        ...chosenInterests.filter((i) => i.value !== interest.value),
      ]);
      return;
    }
    setChosenInterests([...chosenInterests, interest]);
  }

  return (
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
            borderBottomColor="warmGray.100"
            _text={{
              color: "warmGray.600",
              fontWeight: "bold",
              fontSize: "2xl",
            }}
          >
            Interests
          </Modal.Header>
          <Modal.CloseButton />

          <Modal.Body h={`${height}px`} p={4}>
            <Text fontSize="md" color="warmGray.600">
              Choose the interests you want to share.
            </Text>
            <Flex flexWrap="wrap" flexDirection="row" mt={8}>
              {interestArray.map((interest, key) => {
                return (
                  <Pressable key={key} onPress={() => selectOption(interest)}>
                    <Badge
                      mr={2}
                      mb={2}
                      rounded="md"
                      variant="outline"
                      borderWidth={2}
                      _text={{ fontSize: "lg", fontWeight: "bold" }}
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
      <Controller
        control={props.control}
        name=""
        render={() => (
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
                p={2}
              >
                <Text color="warmGray.600" fontSize="md">
                  {chosenInterests.map((interest) => interest.label).join(", ")}
                </Text>
              </Box>
            </Pressable>
          </FormControl>
        )}
      />
    </>
  );
}
