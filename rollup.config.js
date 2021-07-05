import scss from "rollup-plugin-scss";
import WindiCSS from "rollup-plugin-windicss";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "esm",
    },
  ],
  plugins: [scss({ output: "./dist/bundle.css" }), ...WindiCSS(), typescript()],
  external: [
    "react",
    "react-dom",
    "classnames",
    "flat",
    "uuid",
    "react-laag",
    "zustand",
  ],
};
