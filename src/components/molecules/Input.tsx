import React, { useEffect, useState } from "react";
import flat from "flat";
import { IInput, IOption } from "../../types";
import { arrowDown, clear } from "../atoms/icons";

export const Input = ({
  inputRef,
  name,
  placeholder,
  options,
  inputValue,
  onChange,
  allowClear,
  onClear,
}: IInput) => {
  const [textValue, setTextValue] = useState<string>("");
  const [value, setValue] = useState<string | number>(
    inputValue ? inputValue : ""
  );

  useEffect(() => {
    setValue(inputValue ? inputValue : "");
  }, [inputValue]);

  const findLabel = (valueToFind: string | number, options: IOption[]) => {
    const key = Object.entries(flat(options)).filter(
      ([_, value]) => value === valueToFind
    )[0][0];
    const prefix = key.split(".value");
    return (flat(options) as any)[prefix[0] + ".label"];
  };

  useEffect(() => {
    if (value) {
      const label = findLabel(value, options);
      setTextValue(label);
    } else {
      setTextValue("");
    }
    onChange(value ? value : undefined);
  }, [value]);

  return (
    <div className="flex flex-row justify-between items-center border border-[#e5e7eb] rounded-[0.125rem] p-[0.3rem] cursor-pointer focus-within:border-[#90caf9]">
      <input
        className="w-full bg-transparent outline-none border-0 cursor-pointer"
        autoComplete="off"
        ref={inputRef}
        type="text"
        name={name}
        placeholder={placeholder}
        value={textValue}
        readOnly={true}
        onChange={(e) => setTextValue(e.currentTarget.value)}
      />
      <input type="hidden" value={value} />
      <div className="flex flex-row justify-between items-center">
        {allowClear && (
          <img
            className="mx-2 opacity-40 select-none hover:opacity-100"
            src={clear}
            alt="clear"
            onClick={(e) => {
              e.stopPropagation();
              setValue("");
              onClear && onClear();
            }}
          />
        )}
        <img className="select-none" src={arrowDown} alt="dropdown" />
      </div>
    </div>
  );
};
