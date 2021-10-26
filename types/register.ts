import { IFormControlLabelProps, IInputProps } from "native-base";
import { Control, ControllerProps } from "../node_modules/react-hook-form/dist";

export interface FormData {
  email: string;
  password: string;
}

export interface IInputItem extends IInputProps {
  label: string;
  control: Control;
  rules?: ControllerProps["rules"];
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  name: string;
  labelProps?: IFormControlLabelProps;
  type: IInputProps["type"];
  rightElement?: JSX.Element | JSX.Element[] | undefined;
  leftElement?: JSX.Element | JSX.Element[] | undefined;
}
