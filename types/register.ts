import { IInputProps } from "native-base";
import { Control } from "../node_modules/react-hook-form/dist";

export interface FormData {
  email: string;
  password: string;
}

export interface IInputItem {
  label: string;
  control: Control;
  placeholder?: string;
  name: string;
  type: IInputProps["type"];
  rightElement?: JSX.Element | JSX.Element[] | undefined;
  leftElement?: JSX.Element | JSX.Element[] | undefined;
}
