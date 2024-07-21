import { Stack } from "expo-router";
import GlobalContextProvider from "../context/GlobalContext";

const RootLayout = () => {
  return (
    <GlobalContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)" />
      </Stack>
    </GlobalContextProvider>
  );
};

export default RootLayout;
