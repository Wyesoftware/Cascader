import { FocusEvent, Ref } from "react";

export interface Props {
  /**
   * Set direction attribute
   * @param "ltr" | "rtl"
   * @default "ltr"
   */
  dir?: "ltr" | "rtl";
  /**
   * Set direction from outside element
   * @param "html" | "body" | string
   * @summary type string is the id of the element you want to get the dir attribute from
   */
  dirFromElement?: "html" | "body" | string;
  /**
   * Ref for input
   */
  inputRef?: Ref<HTMLInputElement>;
  /**
   * Input form name
   */
  name?: string;
  /**
   * Input value
   * @summary string | Dayjs - for "date" | "datetime" | "time" mode
   * @summary string[] | Dayjs[] - for "range" mode
   */
  value?: string | number | undefined;
  /**
   * Input placeholder
   */
  placeholder?: string;
  /**
   * Input onChange callback
   * @summary Dayjs | undefined - for "date" | "datetime" | "time" mode
   * @summary Dayjs[] | undefined - for "range" mode
   */
  onChange?: (value: string | number | undefined) => void;
  /**
   * Input onBlur callback
   */
  onBlur?: (e?: FocusEvent<HTMLInputElement>) => void;
  /**
   * Nested object of "label", "value" and "children"
   * @see example
   */
  options: IOption[];
  /**
   * Disabled mod for input
   * @default false
   */
  disabled?: boolean;
  /**
   * ReadOnly mod for input
   * @default false
   */
  readOnly?: boolean;
  /**
   * Show clear button to reset input
   * @default false
   */
  allowClear?: boolean;
  /**
   * onClear callback for clear button
   */
  onClear?: () => void;
  /**
   * Classes for main container
   */
  className?: string;
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
  allowClear: boolean;
  onClear: () => void;
}

export interface IFlat {
  [x: string]: string;
}
