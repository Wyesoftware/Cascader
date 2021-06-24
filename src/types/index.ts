import { Ref } from "react";

export interface Props {
  name?: string;
  placeholder?: string;
  options: IOption[];
  value?: string | number | undefined;
  onChange?: (value: string | number | undefined) => void;
  allowClear?: boolean;
}

export interface IOption {
  uid?: string;
  label: string;
  value?: string | number | undefined;
  children?: IOption[];
  onClick?: (value: string | number) => void;
}

export interface ITreeItem {
  uid: string;
  depth: number;
  isOpen: boolean;
}

export interface IInput {
  inputRef: Ref<HTMLInputElement>;
  name?: string;
  placeholder?: string;
  options: IOption[];
  inputValue: string | number | undefined;
  onChange: (value: string | number | undefined) => void;
  allowClear: boolean;
}
