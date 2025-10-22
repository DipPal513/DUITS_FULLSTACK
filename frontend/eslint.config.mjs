import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Custom rules to enforce single quotes
  {
    rules: {
      // Enforce single quotes for strings and JSX attributes
      // "error" turns the rule on, "single" enforces single quotes.
      // "avoidEscape": true allows the use of double quotes if a string contains a single quote,
      // avoiding unnecessary escaping (e.g., 'It\'s nice' becomes "It's nice").
      "quotes": ["error", "single", { "avoidEscape": true }],
      
      // If you are using TypeScript, you might also need to explicitly disable the
      // equivalent @typescript-eslint rule to ensure consistency.
      "@typescript-eslint/quotes": ["error", "single", { "avoidEscape": true }]
    }
  }
];

export default eslintConfig;
