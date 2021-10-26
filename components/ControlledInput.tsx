import { FormControl, Input } from "native-base";
import React from "react";
import { IInputItem } from "../types/register";
import { Controller } from "react-hook-form";

export default function ControlledInput({
  label,
  required,
  disabled,
  name,
  control,
  rules,
  defaultValue,
  type,
  placeholder,
  rightElement,
  leftElement,
  labelProps,
  ...rest
}: IInputItem) {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { invalid, isTouched, isDirty, error },
      }) => (
        <FormControl
          isInvalid={invalid}
          isRequired={required}
          isDisabled={disabled}
        >
          <FormControl.Label
            _text={{ color: "white.100", fontSize: "sm", fontWeight: "medium" }}
            {...labelProps}
          >
            {label}
          </FormControl.Label>
          <Input
            type={type}
            isFullWidth
            size="2xl"
            variant="underlined"
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            borderColor="warmGray.400"
            _focus={{
              borderColor: "red.400",
            }}
            color="white.100"
            placeholderTextColor="white.600"
            InputRightElement={rightElement}
            InputLeftElement={leftElement}
            {...rest}
          />
          <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
        </FormControl>
      )}
    />
  );
}
