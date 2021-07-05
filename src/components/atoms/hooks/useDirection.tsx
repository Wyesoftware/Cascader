import React from "react";

export const useDirection = () => {
  const setDirection = (element: "html" | "body" | string | undefined) => {
    if (element) {
      switch (element) {
        case "html":
          return document.documentElement.dir;
        case "body":
          return document.body.dir;
        default:
          return document.getElementById(element)?.dir;
      }
    } else {
      return undefined;
    }
  };

  const getDirection = () => {
    return document.getElementById("wyesoftware-cascader")?.dir;
  };

  return { setDirection, getDirection };
};
