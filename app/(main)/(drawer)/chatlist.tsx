import CustomAvatar from "@/components/CustomAvatar";
import CustomButton from "@/components/CustomButton";
import HeaderDrawer from "@/components/HeaderDrawer";
import InputField from "@/components/InputField";
import ChatCard from "@/components/List/ChatCard";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
import generatorAvatar from "@/lib/Dicebear/generatorAvatar";
import { db, getUser, signout } from "@/lib/Firebase";
import { ChatsProps, HeaderChatListProps, ReceiverProps } from "@/types";
import { router } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";

const ChatList = () => {
  const [search, setSearch] = useState("");

  const { user } = useGlobalContext();

  const data = [1, 2, 3, 4, 5];

  const [allChatsData, setAllChatsData] = useState<ReceiverProps[]>([]);

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
    <SafeAreaView className="flex-1">
      {allChatsData ? (
        <FlatList
          data={allChatsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.receiverId}
          ListHeaderComponent={() => <HeaderChatList search={search} setSearch={setSearch} />}
        />
      ) : (
        <View></View>
      )}
    </SafeAreaView>
  );
};

export default ChatList;



const HeaderChatList = ({search, setSearch}: HeaderChatListProps) => {

  //Sign Out
  const deconnexionFn = async () => {
    await signout().then(() => {
      router.push("/");
    });
  };

  return (
    <View>
      <HeaderDrawer />
      <View className="py-4 px-6">
        <TextInput
          value={search}
          onChangeText={(e) => setSearch(e)}
          placeholder="Search conversation..."
          className="border border-gray-300 px-2 py-1 rounded-md"
        />
      </View>
      <CustomButton
        title="Sign out"
        buttonStyle="bg-primary px-3 py-2"
        textStyle="text-white"
        pressButtonFn={deconnexionFn}
      />
    </View>
  );
};
