import { FormControl, Input } from "native-base";
import React from "react";
import { IInputItem } from "../types/register";
import { Controller } from "react-hook-form";

export default function ControlledInput(props: IInputItem) {
  return (
    <FormControl isInvalid={props.invalid} isRequired={props.required}>
      <FormControl.Label
        _text={{ color: "white.100", fontSize: "sm", fontWeight: "medium" }}
      >
        {props.label}
      </FormControl.Label>
      <Controller
        name={props.name}
        defaultValue=""
        control={props.control}
        render={({ field: { onChange, onBlur, value } }) => (
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
        )}
      />
      <FormControl.ErrorMessage>ERROR</FormControl.ErrorMessage>
    </FormControl>
  );
}
