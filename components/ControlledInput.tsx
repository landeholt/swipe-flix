import { FormControl, Input } from "native-base";
import React from "react";
import { IInputItem } from "../types/register";
import { Controller } from "react-hook-form";

export default function ControlledInput(props: IInputItem) {
  return (
    <Controller
      name={props.name}
      defaultValue=""
      control={props.control}
      rules={props.rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { invalid, isTouched, isDirty, error },
      }) => (
        <FormControl isInvalid={invalid} isRequired={props.required}>
          <FormControl.Label
            _text={{ color: "white.100", fontSize: "sm", fontWeight: "medium" }}
          >
            {props.label}
          </FormControl.Label>
          <Input
            type={props.type}
            isFullWidth
            size="2xl"
            variant="underlined"
            placeholder={props.placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            borderColor="warmGray.400"
            _focus={{
              borderColor: "red.400",
            }}
            color="white.100"
            placeholderTextColor="white.600"
            InputRightElement={props.rightElement}
            InputLeftElement={props.leftElement}
          />
          <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
        </FormControl>
      )}
    />
  );
}
