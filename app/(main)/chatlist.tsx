import CustomAvatar from "../../components/CustomAvatar";
import CustomButton from "../../components/CustomButton";
import CustomIcons from "../../components/CustomIcons";
import HeaderList from "../../components/HeaderList";
import InputField from "../../components/InputField";
import AddNewChat from "../../components/List/AddNewChat";
import ChatCard from "../../components/List/ChatCard";
import { useChatContext } from "../../context/ChatContext/useChatContext";
import { useGlobalContext } from "../../context/GlobalContext/useGlobalContext";
import generatorAvatar from "../../lib/Dicebear";
import { db, getUser, signout } from "../../lib/Firebase";
import { ChatsProps, HeaderChatListProps, ReceiverProps } from "../../types";
import { router } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";

const ChatList = () => {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { user } = useGlobalContext();

  const { setChatData } = useChatContext();

  const [allChatsData, setAllChatsData] = useState<ReceiverProps[]>([]);

  useEffect(() => {
    setChatData(undefined);
  }, []);

  //Get all chats via database
  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        doc(db, `userChats/${user.uid}`),
        async (doc) => {
          if (doc.exists()) {
            const chatsData = doc.data() as ChatsProps;

            const chatsWithReceiverData = chatsData.chats.map(async (item) => {
              const receiverData = await getUser(item.receiverId);

              if (receiverData) {
                return { ...item, receiverData };
              } else {
                return { ...item };
              }
            });

            const allReceiversData = await Promise.all(chatsWithReceiverData);

            setAllChatsData(
              allReceiversData.sort(
                (a, b) => Number(b.updatedAt) - Number(a.updatedAt)
              )
            );
          }
        }
      );

      return () => unsubscribe();
    }
  }, [user]);

  //Render Item FlatList
  const renderItem = ({ item }: { item: ReceiverProps }) => (
    <ChatCard chat={item} />
  );

  if (!user) return;

  return (
    <SafeAreaView className="relative flex-1 bg-primary">
      <HeaderChatList search={search} setSearch={setSearch} />
      <View className="flex-1 rounded-t-3xl bg-secondary">
        {allChatsData ? (
          <FlatList
            data={allChatsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.receiverId}
          />
        ) : (
          <View className="items-center mt-4 flex-1">
            <ActivityIndicator color="#1A91DB" />
          </View>
        )}
      </View>

      <Pressable
        className="bg-primary p-2 items-center justify-center rounded-full absolute bottom-16 right-6 shadow-md"
        onPress={() => setOpenModal(true)}
      >
        <CustomIcons name="add-sharp" size={40} color="white" />
      </Pressable>

      <AddNewChat openModal={openModal} setOpenModal={setOpenModal} />
    </SafeAreaView>
  );
};

export default ChatList;

const HeaderChatList = ({ search, setSearch }: HeaderChatListProps) => {
  //Sign Out
  const deconnexionFn = async () => {
    await signout().then(() => {
      router.push("/");
    });
  };

  return (
    <View className="bg-primary">
      <HeaderList />
      <View className="mb-2 px-6 items-center justify-between flex-row">
        <Pressable className="p-2 bg-secondary rounded-full">
          <Text className="text-sm  text-primary font-semibold "> Messages </Text>
        </Pressable>
        <Pressable className="p-2 rounded-full">
          <Text className="text-sm  text-secondary font-semibold "> Groups </Text>
        </Pressable>
        <Pressable className="p-2 rounded-full">
          <Text className="text-sm  text-secondary font-semibold "> Settings </Text>
        </Pressable>
      </View>
      {/* <View className="py-4 px-6">
        <TextInput
          value={search}
          onChangeText={(e) => setSearch(e)}
          placeholder="Search conversation..."
          className="border border-gray-300 px-2 py-1 rounded-md"
        />
      </View> */}
      {/* <CustomButton
        title="Sign out"
        buttonStyle="bg-primary px-3 py-2"
        textStyle="text-white"
        pressButtonFn={deconnexionFn}
      /> */}
    </View>
  );
};
