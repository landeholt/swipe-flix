import { HStack, Circle } from "native-base";
import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

export default function MessageFeedback() {
  const first = useRef(new Animated.Value(0)).current;
  const second = useRef(new Animated.Value(0)).current;
  const third = useRef(new Animated.Value(0)).current;

  function bubble() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(first, {
          toValue: 1,
          duration: 450,
          useNativeDriver: false,
        }),
        Animated.timing(second, {
          toValue: 1,
          duration: 550,
          useNativeDriver: false,
        }),
        Animated.timing(third, {
          toValue: 1,
          duration: 650,
          useNativeDriver: false,
        }),
      ]),
      {
        iterations: -1,
      }
    ).start();
  }

  useEffect(() => {
    bubble();
  }, []);
  return (
    <HStack
      space={2}
      justifyContent="center"
      alignItems="center"
      px={3}
      py={2}
      bg="warmGray.300"
      w={20}
      h={8}
      rounded="lg"
    >
      <Animated.View
        style={{
          backgroundColor: "#c4c4c4",
          height: 12,
          width: 12,
          borderRadius: 9999,
          transform: [
            {
              scale: first.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.8, 1.2, 0.8],
              }),
            },
            {
              translateY: first.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, -1.5, 0],
              }),
            },
          ],
        }}
      />
      <Animated.View
        style={{
          backgroundColor: "#c4c4c4",
          height: 12,
          width: 12,
          borderRadius: 9999,
          transform: [
            {
              scale: second.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.8, 1.2, 0.8],
              }),
            },
            {
              translateY: second.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, -1.5, 0],
              }),
            },
          ],
        }}
      />
      <Animated.View
        style={{
          backgroundColor: "#c4c4c4",
          height: 12,
          width: 12,
          borderRadius: 9999,
          transform: [
            {
              scale: third.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.8, 1.2, 0.8],
              }),
            },
            {
              translateY: third.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, -1.5, 0],
              }),
            },
          ],
        }}
      />
    </HStack>
  );
}
