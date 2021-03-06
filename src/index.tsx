import React, { useEffect, useState } from "react";
import "./styles/index.css";
import "virtual:windi.css";
import { IOption, Props } from "./types";
import { mergeRefs, useLayer } from "react-laag";
import { Input } from "./components/molecules/Input";
import { Option } from "./components/molecules/Option";
import { useController } from "./components/atoms/hooks/useController";
import { useTree } from "./components/atoms/globals";
import { useDirection } from "./components/atoms/hooks/useDirection";
import { noData } from "./components/atoms/icons";

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
  const [genOptions, setGenOptions] = useState<IOption[]>([]);
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] =
    useState<string | number | undefined>(undefined);

  useEffect(() => {
    if (options && options.length > 0) {
      setInputValue(value);
    }
  }, [value, options]);

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
          allowClear={allowClear}
          onClear={() => {
            setInputValue(undefined);
            onChange && onChange(undefined);
            onClear && onClear();
          }}
        />
      </div>
      {isOptionsOpen &&
        renderLayer(
          genOptions && genOptions.length > 0 ? (
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
                    setInputValue(value);
                    onChange && onChange(value);
                    setIsOptionsOpen(false);
                  }}
                />
              ))}
            </ul>
          ) : (
            <div
              dir={getDirection()}
              className="min-w-40 bg-white flex flex-row justify-between items-center p-4 z-60"
              {...layerProps}
              style={{
                boxShadow: "0px 4px 14px rgba(96, 79, 112, 0.05)",
                ...layerProps.style,
              }}
            >
              <span>No Data</span> <img src={noData} alt="no-data" />
            </div>
          )
        )}
    </div>
  );
};

export default CascaderComponent;
