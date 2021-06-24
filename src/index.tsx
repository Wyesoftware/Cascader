import React, { useEffect, useState } from "react";
import "./styles/index.scss";
import { IOption, Props } from "./types";
import { useLayer } from "react-laag";
import { Input } from "./components/molecules/Input";
import { Option } from "./components/molecules/Option";
import { useController } from "./components/atoms/hooks/useController";
import { useTree } from "./components/atoms/globals";
import { getDir } from "./components/atoms/hooks/useDirection";

const CascaderComponent = ({
  name,
  placeholder,
  options,
  value,
  onChange,
  allowClear = false,
}: Props) => {
  const { setTree } = useTree();
  const { generate } = useController();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [genOptions, setGenOptions] = useState<IOption[]>([]);
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string | number | undefined>(
    undefined
  );

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    generate(options);
    setGenOptions(options);
    if (!isOptionsOpen) {
      setTree([]);
    }
  }, [options, isOptionsOpen]);

  const { triggerProps, layerProps, renderLayer } = useLayer({
    container: "wyesoftware-cascader",
    isOpen: isOptionsOpen,
    onOutsideClick: () => setIsOptionsOpen(false),
    placement: getDir() === "rtl" ? "bottom-end" : "bottom-start",
    auto: true,
    overflowContainer: false,
    possiblePlacements: getDir() === "rtl" ? ["top-end"] : ["top-start"],
  });

  const setValue = (value: string | number) => {
    setInputValue(value);
  };

  return (
    <div id="wyesoftware-cascader">
      <div
        {...triggerProps}
        onClick={() => {
          inputRef.current?.focus();
          setIsOptionsOpen(!isOptionsOpen);
        }}
      >
        <Input
          inputRef={inputRef}
          name={name}
          placeholder={placeholder}
          options={options}
          inputValue={inputValue}
          onChange={(value) => onChange && onChange(value)}
          allowClear={allowClear}
        />
      </div>
      {genOptions &&
        genOptions.length > 0 &&
        isOptionsOpen &&
        renderLayer(
          <ul
            className="cascader-options-container"
            {...layerProps}
            style={{
              boxShadow: "0px 4px 14px rgba(96, 79, 112, 0.05)",
              ...layerProps.style,
            }}
          >
            {genOptions.map((option, i) => (
              <Option
                key={i}
                uid={option.uid}
                label={option.label}
                value={option.value}
                children={option.children}
                onClick={(value) => {
                  setValue(value);
                  setIsOptionsOpen(false);
                }}
              />
            ))}
          </ul>
        )}
    </div>
  );
};

export default CascaderComponent;
