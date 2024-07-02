import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import CustomIcons from "./CustomIcons";
import { SvgXml } from "react-native-svg";
import generatorAvatar from "@/lib/Dicebear/generatorAvatar";
import { router } from "expo-router";

const HeaderChat = () => {
  return (
    <Pressable className="flex-row justify-between items-center px-3 py-4 border-b border-gray-300" onPress={() => router.push("/details")}>
      <View className="flex-row gap-x-2 items-center">
        <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
          <CustomIcons name="chevron-back-sharp" />
        </TouchableOpacity>
        <View className="rounded-full overflow-hidden">
          <SvgXml xml={generatorAvatar("Cristooo")} width={40} height={40} />
        </View>
        <Text className="font-semibold text-lg">Cristooo</Text>
      </View>
      <View className="flex-row items-center gap-x-4">
        <View>
          <CustomIcons name="call-sharp" />
        </View>
        <View>
          <CustomIcons name="videocam-sharp" />
        </View>
        <View>
          <CustomIcons name="ellipsis-vertical-sharp" />
        </View>
      </View>
    </Pressable>
  );
};

export default HeaderChat;
