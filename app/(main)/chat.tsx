import { MessageImage, MessageText } from "@/components/Chat/Message";
import FooterChat from "@/components/FooterChat";
import HeaderChat from "@/components/HeaderChat";
import { useChatContext } from "@/context/ChatContext/useChatContext";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const chat = () => {
  const { chatData } = useChatContext();
  const { user } = useGlobalContext();

  const convertDate = (time: Date) => {
    const date = new Date(time);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`;
  };


  return (
    <SafeAreaView className="flex-1 gap-y-4">
      <HeaderChat />

      {chatData && (
        <View className="flex-1 gap-y-1 overflow-x-hidden px-6">
          {chatData.messages.length > 0 ? (
            chatData.messages.map((message, index) => (
              <View
                className={`max-w-[70%] items-start ${
                  message.senderId === user?.uid ? "self-end" : null
                }`}
                key={index}
              >
                {message.type === "text" ? (
                  <MessageText
                    userId={user?.uid || ""}
                    content={message.content}
                    senderId={message.senderId}
                    sendedAt={convertDate(message.sendedAt)}
                  />
                ) : (
                  <MessageImage
                    userId={user?.uid || ""}
                    content={message.content}
                    senderId={message.senderId}
                    sendedAt={convertDate(message.sendedAt)}
                  />
                )}
              </View>
            ))
          ) : (
            <View className="w-full mt-4 h-full flex items-center justify-center">
              <Text className="font-semibold ">
                {" "}
                No messages sended already!{" "}
              </Text>
            </View>
          )}
        </View>
      )}

      <FooterChat />

      <StatusBar backgroundColor="#1A91DA" style="light" />
    </SafeAreaView>
  );
};

export default chat;
