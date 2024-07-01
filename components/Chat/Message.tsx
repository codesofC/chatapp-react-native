import { View, Text, Image } from "react-native";
import React from "react";
import { MessagesProps } from "@/types";

//Component message text type
export const MessageText = ({
  userId,
  content,
  senderId,
  sendedAt,
}: MessagesProps) => {
  return (
    <View
      className={`w-full relative px-2 py-1 flex gap-2 items-end rounded-md ${
        senderId === userId ? "bg-primary" : "bg-secondary"
      }`}
    >
      <Text className="text-white bg-primary p-2 rounded-md">
        {content}
      </Text>
      <Text className="text-xs"> {sendedAt} </Text>
    </View>
  );
};


//Component media type
export const MessageImage = ({
  userId,
  content,
  senderId,
  sendedAt,
}: MessagesProps) => {

  return (
    <View className={`relative text-foreground flex gap-2 items-end bg-black rounded-md overflow-hidden cursor-pointer`}>
      <Image 
        source={{uri: content}}
        resizeMode="cover"
        className="w-full h-[250px]"
      />

      <View className={`flex text-xs absolute bottom-2 z-[1] ${
        senderId === userId ? "left-4" : "right-4"
      }`}>
        <Text className="text-white"> {sendedAt} </Text>
      </View>
    </View>
  )

}
