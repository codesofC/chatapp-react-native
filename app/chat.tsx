;
import FooterChat from "@/components/FooterChat";
import HeaderChat from "@/components/HeaderChat";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const chat = () => {
  return (
    <SafeAreaView className="flex-1">
      
      <HeaderChat />

      <View className="flex-1">

      </View>

      <FooterChat />

      <StatusBar backgroundColor="#1A91DA" style="light" />
    </SafeAreaView>
  );
};

export default chat;
