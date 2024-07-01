import ChatContextProvider from "@/context/ChatContext";
import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <ChatContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="chat" />
        <Stack.Screen name="details"  />
        <Stack.Screen name="(drawer)"  />
      </Stack>
    </ChatContextProvider>
  );
}
