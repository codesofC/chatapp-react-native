import { View, TouchableOpacity, TextInput } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import CustomIcons from "./CustomIcons";
import { FontAwesome } from '@expo/vector-icons';

const FooterChat = () => {
  const [text, setText] = useState("");

  return (
    <View className="flex-row items-center border border-gray-300 rounded-md mx-2 mb-6 px-3 py-1">
      <Entypo name="emoji-happy" size={20} color="gray" />
      <TextInput
        value={text}
        onChangeText={(e) => setText(e)}
        placeholder="Type Something..."
        className="flex-1 p-2"
      />
      <View className="flex-row gap-x-3 items-center">
        <TouchableOpacity>
            <CustomIcons name="images-sharp" size={20} />
        </TouchableOpacity>
        <TouchableOpacity>
        <FontAwesome name="microphone" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="py-2 px-3 bg-primary rounded-md">
            <CustomIcons name="send-sharp" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooterChat;
