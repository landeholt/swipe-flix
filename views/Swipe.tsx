import { Box, Button, Flex, Spacer, Text } from "native-base";
import React, { useEffect, useMemo } from "react";
import { useAuth } from "../providers/auth";

import sb from "../providers/supabase";

export default function Swipe() {
  const auth = useAuth();
  const userid = useMemo(() => auth && auth.session?.user?.id, [auth]);

  const username = useMemo(
    () => auth && auth.session?.user?.user_metadata.name,
    [auth]
  );

  return (
    <Flex h="full" w="full">
      <Spacer />
    </Flex>
  );
}
