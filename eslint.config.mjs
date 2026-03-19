import { FlatCompat } from "@eslint/eslintrc";
import studio from '@sanity/eslint-config-studio'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...studio,
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      ".sanity/**",
      "dist/**",
    ],
  },
];

export default eslintConfig;
