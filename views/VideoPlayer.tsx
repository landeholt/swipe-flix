import { Box } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { useSetRecoilState } from "recoil";
import { navigationStore } from "../providers/state";
import { Video, AVPlaybackStatus, VideoFullscreenUpdateEvent } from "expo-av";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

interface Props {
  route: { params: { videoUrl: string } };
}

export default function VideoPlayer({ route: { params } }: Props) {
  const navigator = useNavigation();

  async function changeScreenOrientation(
    orientation: ScreenOrientation.OrientationLock
  ) {
    await ScreenOrientation.lockAsync(orientation);
  }

  const setStore = useSetRecoilState(navigationStore);

  const ref = useRef(null);

  function handleFullscreen(e: VideoFullscreenUpdateEvent) {
    /* leaving fullscreen */
    if (e.fullscreenUpdate === 2) {
      navigator.goBack();
    }
  }
  useEffect(() => {
    changeScreenOrientation(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    setStore((s) => ({ ...s, showBottomTab: false }));
    /* @ts-ignore */
    ref.current.presentFullscreenPlayer();
    return () => {
      setStore((s) => ({ ...s, showBottomTab: true }));
      changeScreenOrientation(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);
  return (
    <Box w="full" h="full" bg="coolGray.800">
      <Video
        ref={ref}
        style={{ width, height }}
        source={{
          uri: params.videoUrl,
        }}
        shouldPlay
        useNativeControls
        resizeMode="contain"
        onFullscreenUpdate={handleFullscreen}
      />
    </Box>
  );
}
