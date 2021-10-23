import React from "react";
import {
  NativeBaseProvider,
  extendTheme,
  Text,
  Center,
  VStack

} from "native-base";
import { dev } from "./utils/guard";
import { AuthProvider } from "./components/Auth";
import Navigation from "./navigation/Navigation";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {

  
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <Navigation/>
      </AuthProvider>
    </NativeBaseProvider>
  );
}