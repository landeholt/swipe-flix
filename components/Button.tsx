import { Button, IButtonProps } from "native-base";
import React from "react";

interface Props extends IButtonProps {
  isFullWidth?: boolean;
}

export default function ({ children, isFullWidth, ...rest }: Props) {
  return (
    <Button
      _text={{ fontSize: "xl" }}
      py={4}
      w={isFullWidth ? "full" : rest.w}
      colorScheme="red"
      {...rest}
    >
      {children}
    </Button>
  );
}
