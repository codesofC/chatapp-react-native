import { MessageImage, MessageText } from "@/components/Chat/Message";
import FooterChat from "@/components/FooterChat";
import HeaderChat from "@/components/HeaderChat";
import { useChatContext } from "@/context/ChatContext/useChatContext";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
import { ChatDataProps, MessageProps } from "@/types";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const chat = () => {
  const { chatData } = useChatContext();
  const { user } = useGlobalContext();

  const flatListRef = useRef<FlatList>(null);

  const convertDate = (time: Date) => {
    const date = new Date(time);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`;
  };

  const renderItem = ({ item }: { item: MessageProps }) => (
    <View className={`w-full px-6 my-1`}>
      {item.type === "text" ? (
        <MessageText
          userId={user?.uid || ""}
          content={item.content}
          senderId={item.senderId}
          sendedAt={convertDate(item.sendedAt)}
        />
      ) : (
        <MessageImage
          userId={user?.uid || ""}
          content={item.content}
          senderId={item.senderId}
          sendedAt={convertDate(item.sendedAt)}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 w-full">
      {/* Simule l'entete avec un element vide pour eviter que le premier element de la flatlist reste sticky */}
      <View />
      <HeaderChat />
      {chatData && (
        <FlatList
          data={chatData.messages}
          renderItem={renderItem}
          keyExtractor={(_item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View className="w-full mt-4 h-full flex items-center justify-center">
              <Text className="font-semibold ">
                {" "}
                No messages sended already!{" "}
              </Text>
            </View>
          )}
          ref={flatListRef}
          initialNumToRender={50}
          initialScrollIndex={chatData.messages.length - 1}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
            });
          }}
        />
      )}
      <FooterChat />
      <StatusBar backgroundColor="#1A91DA" style="light" />
    </SafeAreaView>
  );
};

export default chat;
