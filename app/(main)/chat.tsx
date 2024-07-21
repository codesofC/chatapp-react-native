import { MessageImage, MessageText } from "../../components/Chat/Message";
import PickMediaContainer from "../../components/Chat/PickMediaContainer";
import FooterChat from "../../components/FooterChat";
import HeaderChat from "../../components/HeaderChat";
import { useChatContext } from "../../context/ChatContext/useChatContext";
import { useGlobalContext } from "../../context/GlobalContext/useGlobalContext";
import { MessageProps } from "../../types";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { FlatList, ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Chat = () => {
  
  const [file, setFile] = useState({name: "", uri: ""});

  const { chatData } = useChatContext();
  const { user } = useGlobalContext();

  const flatListRef = useRef<FlatList>(null);

  const handleContentSizeChange = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }


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
    <SafeAreaView className="relative flex-1 w-full bg-primary">
      <HeaderChat />
      <ImageBackground source={require("../../assets/images/bg.png")} className="w-full flex-1">

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
          onContentSizeChange={handleContentSizeChange}
          contentContainerStyle={{paddingVertical: 5}}
        />
      )}
        </ImageBackground>
      <FooterChat setFile={setFile} />

      {/* Choose the image to send */}
      
      {file.name ? (
        <PickMediaContainer file={file} setFile={setFile} />
      ) : null}

      <StatusBar backgroundColor="#1A91DA" style="light" />
    </SafeAreaView>
  );
};

export default Chat;
