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
    <div className="input-countainer">
      <input
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
      <div className="icon-container">
        {allowClear && (
          <img
            className="clear noselect"
            src={clear}
            alt="clear"
            onClick={(e) => setValue("")}
          />
        )}
        <img className="noselect" src={arrowDown} alt="dropdown" />
      </div>
    </div>
  );
};
