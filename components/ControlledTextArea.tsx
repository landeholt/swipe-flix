import {
  Box,
  Flex,
  FormControl,
  IFormControlLabelProps,
  Input,
  Spacer,
  TextArea,
  Text,
} from "native-base";
import React, { useCallback, useState } from "react";
import { IInputItem } from "../types/register";
import { Control, Controller, ControllerProps } from "react-hook-form";
import { ITextAreaProps } from "native-base/lib/typescript/components/primitives/TextArea";

interface Props extends ITextAreaProps {
  label: string;
  control: Control;
  rules?: ControllerProps["rules"];
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  name: string;
  labelProps?: IFormControlLabelProps;
  maxChar?: number;
}

export default function ControlledTextArea({
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
  maxChar,
  ...rest
}: Props) {
  const [len, setLen] = useState(0);

  function handleMaxChar(text: string) {
    const len = text.replaceAll("\n", "").length;
    if (maxChar === undefined) {
      return text;
    }
    if (maxChar - len >= 0) {
      setLen(len);

      return text.trimEnd();
    }
    return text.slice(0, -1).trimEnd();
  }

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
          position="relative"
        >
          <FormControl.Label
            _text={{ color: "white.100", fontSize: "sm", fontWeight: "medium" }}
            {...labelProps}
          >
            {label}
          </FormControl.Label>
          {maxChar && (
            <Flex w="full" h="full" position="absolute" top={0} bottom={0}>
              <Spacer />
              <Flex flexDirection="row">
                <Spacer />
                <Text color="black" py={1} px={2}>
                  {maxChar - len}
                </Text>
              </Flex>
            </Flex>
          )}
          <TextArea
            type={type}
            isFullWidth
            size="2xl"
            variant="outline"
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={(text) => onChange(handleMaxChar(text))}
            value={value}
            borderColor="warmGray.400"
            _focus={{
              borderColor: "red.400",
            }}
            color="white.100"
            placeholderTextColor="white.600"
            {...rest}
          />
          <FormControl.ErrorMessage>{error?.message}</FormControl.ErrorMessage>
        </FormControl>
      )}
    />
  );
}
