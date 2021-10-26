import { FormControl, HStack } from "native-base";
import React from "react";
import { Controller, Control } from "react-hook-form";
import DateTimePicker, {
  DatePickerOptions,
} from "@react-native-community/datetimepicker";

interface Props extends DatePickerOptions {
  control: Control;
  required?: boolean;
}

export default function ControlledDateTimePicker({
  control,
  required,
  value: _value,
  onChange: _onChange,
  ...rest
}: Props) {
  return (
    <Controller
      name="birth"
      control={control}
      defaultValue={_value}
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <FormControl isRequired>
          <HStack alignItems="center">
            <FormControl.Label _text={{ color: "warmGray.600" }} flex={1}>
              Date of birth
            </FormControl.Label>
            <DateTimePicker
              value={value}
              mode="date"
              is24Hour
              style={{
                width: "33%",
              }}
              onChange={(event: any, date: Date | undefined) => onChange(date)}
              {...rest}
            />
          </HStack>

          <FormControl.HelperText></FormControl.HelperText>
          <FormControl.ErrorMessage></FormControl.ErrorMessage>
        </FormControl>
      )}
    />
  );
}
