import { View, TouchableOpacity, TextInput, Pressable, Keyboard } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import CustomIcons from "./CustomIcons";
import { FontAwesome } from "@expo/vector-icons";
import EmojiPicker from "./Chat/EmojiPicker";
import { useChatContext } from "../context/ChatContext/useChatContext";
import { useGlobalContext } from "../context/GlobalContext/useGlobalContext";
import { updateChatsData, updateUserChatsData, uploadFiles } from "../lib/Firebase";
import { pickImageFn } from "../constants"
import PickMediaContainer from "./Chat/PickMediaContainer";
import { FileProps } from "../types";

const FooterChat = ({ setFile }: {setFile: React.Dispatch<React.SetStateAction<FileProps>>}) => {
  const [text, setText] = useState("");

  const [showPicker, setShowPicker] = useState(false);

  const {user} = useGlobalContext()
  const { currentReceiver } = useChatContext()


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setShowPicker(false);
    });

    if(showPicker){
      Keyboard.dismiss()
    }

    return () => {
      keyboardDidShowListener.remove();
    };
  }, [showPicker]);


  const sendMessage = async () => {
    if(text === "") return

    if(user && currentReceiver){
      await updateChatsData(currentReceiver.chatId, user.uid, "text", text)

      updateUserChatsData(currentReceiver.chatId, [user.uid, currentReceiver.receiverId], text, "text")
      setText("")
    }

  }


  const openPicker = () => {
    setShowPicker((prev) => !prev)
  }

  const pickImageDocument = async () => {
    if(showPicker) setShowPicker(false)
    Keyboard.dismiss()

    const result = await pickImageFn();

    if(result && result.name){
      setFile({
        name: result.name,
        uri: result.uri
      })
    }
  }

  return (
    <View className={`w-full pt-2 ${!showPicker ? 'pb-2' : null} items-center overflow-x-hidden bg-secondary`}>
      <View className="flex-row items-center border border-gray-300 rounded-md mx-4 px-3 py-1">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={openPicker}
        >
          <Entypo name="emoji-happy" size={20} color="gray" />
        </TouchableOpacity>
        <TextInput
          value={text}
          onChangeText={(e) => setText(e)}
          placeholder="Type Something..."
          className="flex-1 p-2"
        />
        <View className="flex-row gap-x-3 items-center">
          <Pressable onPress={pickImageDocument}>
            <CustomIcons name="images-sharp" size={20} />
          </Pressable>
          {text.length > 0 ? (
            <Pressable className="py-2 px-3 bg-primary rounded-lg items-center justify-center" onPress={sendMessage}>
              <CustomIcons name="send-sharp" size={20} color="white" />
            </Pressable>
          ) : (
            <TouchableOpacity activeOpacity={.8} className="py-2 px-3 bg-primary rounded-full items-center justify-center">
              <FontAwesome name="microphone" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <EmojiPicker setText={setText} showPicker={showPicker} />
    </View>
  );
};

export default FooterChat;
