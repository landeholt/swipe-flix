import React, { Suspense } from "react";
import { NativeBaseProvider, Text } from "native-base";
import { dev } from "./utils/guard";
import { AuthProvider } from "./components/Auth";
import Navigation from "./navigation/Navigation";
import { theme } from "./providers/theme";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <RecoilRoot>
      <NativeBaseProvider theme={theme}>
        <Suspense fallback={<Text>loading..</Text>}>
          <AuthProvider>
            <Navigation />
          </AuthProvider>
        </Suspense>
      </NativeBaseProvider>
    </RecoilRoot>
  );
}
