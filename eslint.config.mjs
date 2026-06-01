import nextVitals from "eslint-config-next";

const config = [
  ...nextVitals,
  {
    ignores: [".next/**", "node_modules/**"],
  },
  {
    rules: {
      "react-hooks/error-boundaries": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default config;
