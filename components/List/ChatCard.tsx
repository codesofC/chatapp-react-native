import { View, Text, Pressable } from "react-native";
import CustomAvatar from "../CustomAvatar";
import { router } from "expo-router";
import { ReceiverProps } from "../../types";
import { useChatContext } from "../../context/ChatContext/useChatContext";
import { useGlobalContext } from "../../context/GlobalContext/useGlobalContext";
import { updateViewMessage } from "../../lib/Firebase";

const ChatCard = ({ chat }: { chat: ReceiverProps }) => {
  const { setCurrentReceiver, setShowChatList } = useChatContext();
  const { user } = useGlobalContext();

  const changeUserViewMessage = () => {
    if (user) {
      updateViewMessage(chat.chatId, user?.uid);
      setCurrentReceiver(chat);
      setShowChatList(false);
      router.push("/chat");
    }
  };

  const convertDate = (time: unknown) => {
    const date = new Date(time as Date);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`;
  };

  return (
    <Pressable
      onPress={changeUserViewMessage}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? '#1A91DA' : 'transparent',
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingVertical: 16,
          paddingHorizontal: 24
        }
      ]}
    >
      <View className="flex-row gap-x-2 items-center">
        <CustomAvatar
          avatar={chat.receiverData?.avatar}
          email={chat.receiverData?.email || "Cristooo"}
          avatarStyle={{ width: 48, height: 48 }}
        />
        <View>
          <Text className="font-semibold text-lg text-secondary-foreground dark:text-secondary">
            {" "}
            {chat.receiverData?.username}{" "}
          </Text>
          <Text className="text-sm text-secondary-foreground dark:text-secondary"> {chat.lastMessage} </Text>
        </View>
      </View>
      <View className="items-center space-y-2">
        {!chat.isSeen && <View className="w-2 h-2 bg-primary rounded-full" />}
        <Text className="text-xs font-extralight text-secondary-foreground dark:text-secondary"> {convertDate(chat.updatedAt)} </Text>
      </View>
    </Pressable>
  );
};

export default ChatCard;
