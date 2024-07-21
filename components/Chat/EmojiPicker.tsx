import { EmojiPickerProps } from "../../types"
import EmojiModal from 'react-native-emoji-modal';
import { ScrollView, View } from "react-native";

const EmojiPicker = ({
  setText,
  showPicker,
}: EmojiPickerProps) => {
  const handleEmojiSelect = (emoji: string | null) => {
    if(!emoji) return

    setText((prev) => prev + emoji);
  };

  return showPicker && (
    <ScrollView horizontal className="w-full mt-2">
      <EmojiModal onEmojiSelected={(emoji) => handleEmojiSelect(emoji)} columns={9.1} searchStyle={{borderWidth: .5, borderColor: "#d1d5db"}} />
    </ScrollView>
  )
};

export default EmojiPicker;
