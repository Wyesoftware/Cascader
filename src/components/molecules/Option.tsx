import React, { useEffect, useState } from "react";
import { useLayer } from "react-laag";
import { IOption } from "../../types";
import { useController } from "../atoms/hooks/useController";
import { useDirection } from "../atoms/hooks/useDirection";
import { arrowLeft, arrowRight } from "../atoms/icons";

export const Option = ({ uid, label, value, children, onClick }: IOption) => {
  const { getDirection } = useDirection();
  const { status, toggle } = useController();
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOptionsOpen(!!status(uid!));
  }, [status(uid!)]);

  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen: isOptionsOpen,
    onParentClose: () => setIsOptionsOpen(false),
    placement: getDirection() === "rtl" ? "left-start" : "right-start",
    auto: true,
    overflowContainer: false,
  });

  return children ? (
    <>
      <li
        data-cy="cascader-option"
        className="w-full flex flex-row justify-between items-center p-4 cursor-pointer select-none box-border hover:bg-[#e2e2e2]"
        {...triggerProps}
        onClick={() => toggle(uid!, !isOptionsOpen)}
        data-value={value}
      >
        {label}
        <img
          className="ltr:ml-2 rtl:mr-2"
          src={getDirection() === "rtl" ? arrowLeft : arrowRight}
          alt="dropchild"
        />
      </li>
      {isOptionsOpen &&
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
      data-cy="cascader-option"
      className="w-full flex flex-row justify-between items-center p-4 cursor-pointer select-none box-border hover:bg-[#e2e2e2]"
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
