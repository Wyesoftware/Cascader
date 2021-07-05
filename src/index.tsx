import React, { useEffect, useState } from "react";
import "./styles/index.css";
import "virtual:windi.css";
import { Props } from "./types";
import { mergeRefs, useLayer } from "react-laag";
import { Input } from "./components/molecules/Input";
import { Option } from "./components/molecules/Option";
import { useController } from "./components/atoms/hooks/useController";
import { useTree } from "./components/atoms/globals";
import { useDirection } from "./components/atoms/hooks/useDirection";

const CascaderComponent = ({
  dir = "ltr",
  dirFromElement,
  inputRef,
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  options,
  disabled = false,
  readOnly = false,
  allowClear = false,
  onClear,
  className,
}: Props) => {
  const { setDirection, getDirection } = useDirection();
  const { setTree } = useTree();
  const { generate } = useController();
  const extraRef = React.useRef<HTMLInputElement>(null);
  const [genOptions, setGenOptions] = useState<any[]>([]);
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] =
    useState<string | number | undefined>(undefined);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (options && options.length > 0) {
      generate(options);
      setGenOptions(options);
      if (!isOptionsOpen) {
        setTree([]);
      }
    }
  }, [options, isOptionsOpen]);

  const { triggerProps, layerProps, renderLayer } = useLayer({
    isOpen: isOptionsOpen,
    onOutsideClick: () => {
      setIsOptionsOpen(false);
      onBlur && onBlur();
    },
    placement: getDirection() === "rtl" ? "bottom-end" : "bottom-start",
    auto: true,
    overflowContainer: false,
    possiblePlacements: getDirection() === "rtl" ? ["top-end"] : ["top-start"],
  });

  const setValue = (value: string | number) => {
    setInputValue(value);
  };

  return (
    <div
      id="wyesoftware-cascader"
      dir={setDirection(dirFromElement) ? setDirection(dirFromElement) : dir}
      className={className}
    >
      <div
        {...triggerProps}
        data-cy={"cascader-" + name}
        onClick={() => {
          if (!disabled && !readOnly) {
            extraRef.current?.focus();
            setIsOptionsOpen(!isOptionsOpen);
          }
        }}
      >
        <Input
          inputRef={inputRef ? mergeRefs(inputRef, extraRef) : extraRef}
          name={name}
          placeholder={placeholder}
          options={options}
          inputValue={inputValue}
          onChange={(value) => onChange && onChange(value)}
          allowClear={allowClear}
          onClear={onClear}
        />
      </div>
      {genOptions &&
        genOptions.length > 0 &&
        isOptionsOpen &&
        renderLayer(
          <ul
            dir={getDirection()}
            data-cy="cascader-options"
            className="min-w-40 bg-white flex flex-col justify-start items-start list-none m-0 p-0 z-60"
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
