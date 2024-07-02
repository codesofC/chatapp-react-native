import { View, TouchableOpacity, TextInput, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import CustomIcons from "./CustomIcons";
import { FontAwesome } from "@expo/vector-icons";
import EmojiPicker from "./Chat/EmojiPicker";

const FooterChat = () => {
  const [text, setText] = useState("");

  const [showPicker, setShowPicker] = useState(false);

  return (
    <View className="w-full mb-2">
      <View className="flex-row items-center border border-gray-300 rounded-md mx-2 px-3 py-1">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowPicker((prev) => !prev)}
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
          <Pressable>
            <CustomIcons name="images-sharp" size={20} />
          </Pressable>
          {text.length > 0 ? (
            <Pressable className="py-2 px-3 bg-primary rounded-lg items-center justify-center">
              <CustomIcons name="send-sharp" size={20} color="white" />
            </Pressable>
          ) : (
            <TouchableOpacity activeOpacity={.8} className="py-2 px-3 bg-primary rounded-full items-center justify-center">
              <FontAwesome name="microphone" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* <EmojiPicker setShowPicker={setShowPicker} setText={setText} showPicker={showPicker} /> */}
    </View>
  );
};

export default FooterChat;
