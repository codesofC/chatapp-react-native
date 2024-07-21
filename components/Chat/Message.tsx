import { View, Text, Image } from "react-native";
import { MessagesProps } from "../../types";

//Component message text type
export const MessageText = ({
  userId,
  content,
  senderId,
  sendedAt,
}: MessagesProps) => {
  return (
    <View
      className={`max-w-[70%] relative flex-row px-1 py-1 gap-x-1 rounded-lg items-end ${
        senderId === userId ? "bg-primary self-end" : "bg-gray-300 self-start"
      }`}
    >
      <Text className={`py-2 flex-wrap max-w-[90%] ${
        senderId === userId ? "text-primary-foreground" : "text-secondary-foreground"
      }`}>
        {content}
      </Text>
      <Text className={`text-[10px] ${
        senderId === userId ? "text-primary-foreground/70" : "text-secondary-foreground/70"
      }`}> {sendedAt} </Text>
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
    <View className={`max-w-[70%] relative bg-black rounded-md overflow-hidden ${
      senderId === userId ? "self-end" : "self-start"
    }`}>
      <Image 
        source={{uri: content}}
        resizeMode="cover"
        className="w-[250px] h-[250px]"
      />

      <View className={`absolute bottom-2 z-[1] ${
        senderId === userId ? "left-4" : "right-4"
      }`}>
        <Text className="text-primary-foreground font-bold"> {sendedAt} </Text>
      </View>
    </View>
  )

}
