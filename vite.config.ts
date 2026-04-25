import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: {
    ignorePatterns: ["dist/**", "dogfood-output/**"],
    options: { typeAware: true, typeCheck: true },
  },
});
