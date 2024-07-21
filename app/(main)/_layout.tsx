import { GestureHandlerRootView } from "react-native-gesture-handler";
import ChatContextProvider from "../../context/ChatContext";
import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ChatContextProvider>
        
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="chatlist" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="details" />
      </Stack>
      
      </ChatContextProvider>
    </GestureHandlerRootView>
  );
}
