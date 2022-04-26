import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default [
  {
    input: "./src/index.ts",
    output: {
      file: "./lib/index.esm.js",
      format: "esm",
    },
    plugins: [typescript(), nodeResolve()],
    external: ["@types/node"],
  },
  {
    input: "./src/index.ts",
    output: {
      file: "./lib/index.js",
      format: "cjs",
    },
    plugins: [typescript(), nodeResolve()],
  },
];
