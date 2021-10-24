import { extendTheme } from "native-base";
import { Config, ConfigStyle } from "styled-system";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// Define the custom colors
const colors = {
  lightGray: {
    50: "#ffffff",
    100: "#f2f2f2",
    200: "#d9d9d9",
    300: "#bfbfbf",
    400: "#a6a6a6",
    500: "#8c8c8c",
    600: "#737373",
    700: "#595959",
    800: "#404040",
    900: "#262626",
  },
  white: {
    "50": "#ffffff",
    "100": "#ffffff",
    "200": "#ffffff",
    "300": "#ffffff",
    "400": "#ffffff",
    "500": "#ffffff",
    "600": "#e6e6e6",
    "700": "#bfbfbf",
    "800": "#999999",
    "900": "#7d7d7d",
  },
};

// extend the theme
export const theme = extendTheme({ config, colors });
