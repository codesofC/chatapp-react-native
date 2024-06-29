
import FooterChat from "@/components/FooterChat";
import HeaderChat from "@/components/HeaderChat";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const chat = () => {
  return (
    <SafeAreaView className="flex-1 gap-y-4">
      
      <HeaderChat />

      {/* <View className="flex-1 gap-y-1 overflow-x-hidden px-6">
        <View className={`max-w-[70%] items-start`}>
          <Text className="text-white bg-primary p-2 rounded-md"> Hola </Text>
        </View>
        <View className={`max-w-[70%] items-start self-end`}>
          <Text className="text-black bg-gray-400 p-2 rounded-md"> Salut! </Text>
        </View>
        <View className={`max-w-[70%] items-start`}>
          <Text className="text-white bg-primary p-2 rounded-md"> How are u? </Text>
        </View>

        <Button title="go to details" onPress={()=> router.push("/details")}/>
      </View> */}

      <FooterChat />

      <StatusBar backgroundColor="#1A91DA" style="light" />
    </SafeAreaView>
  );
};

export default chat;
