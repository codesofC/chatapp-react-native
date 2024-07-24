import { View, Text, Modal, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import InputField from "../InputField";
import { createNewChat, getUsersToAdd } from "../../lib/Firebase";
import { useGlobalContext } from "../../context/GlobalContext/useGlobalContext";
import { ReceiverProps, UserProps } from "../../types";
import CustomAvatar from "../CustomAvatar";
import CustomButton from "../CustomButton";
import CustomIcons from "../CustomIcons";
import { useChatContext } from "../../context/ChatContext/useChatContext";
import { router } from "expo-router";

type ModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  allChatsData: ReceiverProps[]
};

const AddNewChat = ({ openModal, setOpenModal, allChatsData }: ModalProps) => {
  const [search, setSearch] = useState("");
  const [usersFounded, setUsersFounded] = useState<UserProps[]>([]);

  const { user } = useGlobalContext();
  const {setCurrentReceiver} = useChatContext()

  const handleSearch = async (username: string) => {
    setSearch(username);
    const founded = await getUsersToAdd(username, user?.username || "");

    if (founded) {
      setUsersFounded(founded);
    }
  };

  const addChat = async (receiverUid: string) => {
    if (user) {
      const isChatExisted = allChatsData.find(chat => chat.receiverData?.uid === receiverUid);

      if(!isChatExisted){
        await createNewChat(user.uid, receiverUid);
      }else{
        setCurrentReceiver(isChatExisted)
        router.push('/chat')
      }

    }
    setOpenModal(false);
    setUsersFounded([]);
  };

  const closeModal = () => {
    setSearch("")
    setUsersFounded([])
    setOpenModal(false)
  }

  const renderItem = ({ item }: { item: UserProps }) => (
    <View className="flex-row justify-between items-center w-full py-4">
      <View className="flex-row items-center">
        <CustomAvatar
          email={item.email}
          avatar={item.avatar}
          avatarStyle={{ width: 45, height: 45 }}
        />
        <Text className="font-semibold text-lg ml-2"> {item.username} </Text>
      </View>

      <CustomButton
        title="Chat"
        pressButtonFn={() => addChat(item.uid)}
        buttonStyle="bg-primary py-2 px-4"
        textStyle="text-white text-sm"
      />
    </View>
  );

  return (
    <Modal visible={openModal} transparent animationType="slide">
      <View className="relative flex-1 w-full items-center justify-end px-2">
        <View className="w-full px-6 py-4 max-h-72 justify-center bg-secondary rounded-t-2xl -shadow-2xl border border-b-0 border-gray-300 overflow-hidden">
          <View className="flex-row justify-between w-full">
            <Text className="font-bold text-xl mb-4"> New Chat </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={closeModal}
            >
              <CustomIcons name="close" color="black" size={25} />
            </TouchableOpacity>
          </View>
          <InputField
            value={search}
            changeFormFn={(e) => handleSearch(e)}
            title="Username"
          />
          <View className="mt-4">
            <Text className="font-semibold"> User(s) founded: </Text>

            {usersFounded.length > 0 ? (
              <FlatList
                data={usersFounded}
                renderItem={renderItem}
                keyExtractor={(item) => item.uid}
              />
            ) : (
              <Text className="mt-2 text-center"> No user founded! </Text>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddNewChat;
