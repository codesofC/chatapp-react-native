import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import CustomIcons from "./CustomIcons";
import { router } from "expo-router";
import { useChatContext } from "../context/ChatContext/useChatContext";
import CustomAvatar from "./CustomAvatar";

const HeaderChat = () => {

  const { currentReceiver } = useChatContext()

  return (
    <Pressable className="flex-row justify-between items-center px-3 py-4" onPress={() => router.push("/details")}>
      <View className="flex-row gap-x-2 items-center">
        <TouchableOpacity activeOpacity={0.8} onPress={() => router.push("/chatlist")} className="mr-4">
          <CustomIcons name="chevron-back-sharp" size={24} color="white" />
        </TouchableOpacity>
        <CustomAvatar email={currentReceiver?.receiverData?.email || ""} avatar={currentReceiver?.receiverData?.avatar} avatarStyle={{width: 40, height: 40}} />
        <Text className="font-semibold text-lg text-secondary">
          {currentReceiver?.receiverData?.username}
        </Text>
      </View>
      <View className="flex-row items-center gap-x-4">
        <View>
          <CustomIcons name="call-sharp" color="white" />
        </View>
        <View>
          <CustomIcons name="videocam-sharp" color="white" />
        </View>
        <View>
          <CustomIcons name="ellipsis-vertical-sharp" color="white" />
        </View>
      </View>
    </Pressable>
  );
};

export default HeaderChat;
