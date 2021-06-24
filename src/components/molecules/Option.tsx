import React, { useEffect, useState } from "react";
import { useLayer } from "react-laag";
import { IOption } from "../../types";
import { useController } from "../atoms/hooks/useController";
import { getDir } from "../atoms/hooks/useDirection";
import { arrowLeft, arrowRight } from "../atoms/icons";

export const Option = ({ uid, label, value, children, onClick }: IOption) => {
  const { status, toggle } = useController();
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOptionsOpen(!!status(uid!));
  }, [status(uid!)]);

  const { renderLayer, triggerProps, layerProps } = useLayer({
    container: "wyesoftware-cascader",
    isOpen: isOptionsOpen,
    onParentClose: () => setIsOptionsOpen(false),
    placement: getDir() ? "left-start" : "right-start",
    auto: true,
    overflowContainer: false,
  });

  return children ? (
    <>
      <li
        className="noselect boxSizing"
        {...triggerProps}
        onClick={() => {
          if (value && !children) {
            onClick && onClick(value);
          }
          toggle(uid!, !isOptionsOpen);
        }}
        data-value={value}
      >
        {label}
        <img src={getDir() ? arrowLeft : arrowRight} alt="dropchild" />
      </li>
      {isOptionsOpen &&
        renderLayer(
          <ul
            className="cascader-options-container"
            {...layerProps}
            style={{
              boxShadow: "0px 4px 14px rgba(96, 79, 112, 0.05)",
              ...layerProps.style,
            }}
          >
            {children.map((option, i) => (
              <Option
                key={i}
                uid={option.uid}
                label={option.label}
                value={option.value}
                children={option.children}
                onClick={(value) => onClick && onClick(value)}
              />
            ))}
          </ul>
        )}
    </>
  ) : (
    <li
      className="noselect boxSizing"
      onClick={() => {
        if (value) {
          onClick && onClick(value);
        }
      }}
      data-value={value}
    >
      {label}
    </li>
  );
};
