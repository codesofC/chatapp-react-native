import { Stack } from "expo-router";
import ChatContextProvider from "../../context/ChatContext";

const AuthLayout = () => {
  return (
    <ChatContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="signin" />
        <Stack.Screen name="signup" />
      </Stack>
    </ChatContextProvider>
  );
};

export default AuthLayout;
