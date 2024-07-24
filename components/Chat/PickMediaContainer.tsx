import { View, Pressable, Image, Modal, ActivityIndicator } from "react-native";
import CustomIcons from "../CustomIcons";
import { FontAwesome5 } from '@expo/vector-icons';
import { FileProps } from "../../types";
import {
  updateChatsData,
  updateUserChatsData,
  uploadFiles,
} from "../../lib/Firebase";
import { useGlobalContext } from "../../context/GlobalContext/useGlobalContext";
import { useChatContext } from "../../context/ChatContext/useChatContext"
import { useState } from "react";

type PickMediaProps = {
  file: FileProps;
  setFile: React.Dispatch<React.SetStateAction<FileProps>>;
};

const PickMediaContainer = ({ file, setFile }: PickMediaProps) => {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { user } = useGlobalContext();
  const { currentReceiver } = useChatContext();

  const sendMedia = async () => {

    setIsSubmitting(true)

    // Convert Image uri to Blob
    const response = await fetch(file.uri);
    const blob = await response.blob();

    const urlFile = await uploadFiles(file.name, blob);
    if (urlFile) {
      if (user && currentReceiver) {
        await updateChatsData(
          currentReceiver.chatId,
          user.uid,
          "media",
          urlFile
        );

        updateUserChatsData(
          currentReceiver.chatId,
          [user.uid, currentReceiver.receiverId],
          urlFile,
          "media"
        )

        setFile({ name: "", uri: "" });
      }
    }
    setIsSubmitting(false)
  };

  return (
    <Modal visible={!!file} animationType="slide">
      <View className=" flex-1 w-full h-full bg-black z-50 items-end justify-center gap-y-2 px-4 py-6">
        <Pressable onPress={() => setFile({ name: "", uri: "" })}>
          <CustomIcons name="close-sharp" color="white" size={32} />
        </Pressable>
        <Image
          source={{ uri: file.uri }}
          resizeMode="contain"
          className="flex-1 w-full"
        />
        <Pressable
          className="px-5 py-4 bg-primary rounded-full items-center justify-center"
          onPress={async () => await sendMedia()}
          disabled={isSubmitting}
        >
          {!isSubmitting ? (<FontAwesome5 name="arrow-right" size={25} color="white" />) : (<ActivityIndicator color="white" />)}
        </Pressable>
      </View>
    </Modal>
  );
};

export default PickMediaContainer;
