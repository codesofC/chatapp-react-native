import { EmojiPickerProps } from "@/types";
import EmojiSelector, { Categories } from "react-native-emoji-selector";

const EmojiPicker = ({
  setShowPicker,
  setText,
  showPicker,
}: EmojiPickerProps) => {
  const handleEmojiSelect = (emoji: string) => {
    setText((prev) => prev + emoji);
    setShowPicker(false);
  };

  return !showPicker && (
    <EmojiSelector
      onEmojiSelected={handleEmojiSelect}
      category={Categories.all}
      showTabs={true}
      showSearchBar={true}
      showHistory={true}
      columns={10}
      placeholder="Search emoji..."
    />
  )
};

export default EmojiPicker;
