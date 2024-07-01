import { View, Text, Pressable } from "react-native";
import React from "react";
import CustomAvatar from "../CustomAvatar";
import { router } from "expo-router";
import { ReceiverProps } from "@/types";
import { useChatContext } from "@/context/ChatContext/useChatContext";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
import { updateViewMessage } from "@/lib/Firebase";

const ChatCard = ({ chat }: {chat: ReceiverProps}) => {

    const { setCurrentReceiver, setShowChatList } = useChatContext();
    const { user } = useGlobalContext();
  
    const changeUserViewMessage = () => {
      if (user) {
        updateViewMessage(chat.chatId, user?.uid);
        setCurrentReceiver(chat);
        setShowChatList(false)
        router.push("/chat")
      }
    };
  
    const convertDate = (time: unknown) => {
      const date = new Date(time as Date);
  
      const hours = date.getHours();
      const minutes = date.getMinutes();
  
      return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
    };

  return (
    <Pressable
      className="relative flex-row justify-between items-end px-6 py-4"
      onPress={changeUserViewMessage}
      style={({ pressed }) => ({
        backgroundColor: pressed ? "#1A91DA" : "transparent",
      })}
    >
      <View className="flex-row gap-x-2 items-center">
        <CustomAvatar
          avatar={chat.receiverData?.avatar}
          email={chat.receiverData?.email || "Cristooo"}
          avatarStyle={{ width: 48, height: 48 }}
        />
        <View>
          <Text className="font-semibold text-lg">
            {" "}
            {chat.receiverData?.username}{" "}
          </Text>
          <Text className="text-sm"> {chat.lastMessage} </Text>
        </View>
      </View>
      <Text className="text-xs font-extralight">11h:12 </Text>
    </Pressable>
  );
};

export default ChatCard;
