import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["src/**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["src/**/*.{js,mjs,cjs,jsx}"],
    rules: {
      "react/react-in-jsx-scope": "off"
    }
  }
];