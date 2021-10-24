import React from "react";
import { NativeBaseProvider } from "native-base";
import { dev } from "./utils/guard";
import { AuthProvider } from "./components/Auth";
import Navigation from "./navigation/Navigation";
import { theme } from "./providers/theme";

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </NativeBaseProvider>
  );
}
