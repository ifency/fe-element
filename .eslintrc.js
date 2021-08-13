/*
 * @Author: xll
 * @Date: 2021-08-13 11:20:34
 * @LastEditors: xll
 * @LastEditTime: 2021-08-13 16:36:37
 * @Description:
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:vue/essential",
    "airbnb-base",
    "plugin:prettier/recommended", // 添加prettier插件
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    "space-infix-ops": "error",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
