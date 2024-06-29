import { EmojiPickerProps } from "@/types";
import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import EmojiSelector, { Categories } from "react-native-emoji-selector";

const EmojiPicker = ({setShowPicker, setText, showPicker}: EmojiPickerProps) => {


  const handleEmojiSelect = (emoji: string) => {
    setText(prev => prev + emoji)
    setShowPicker(false);
  };

  return (
    <View>
      { (
        <EmojiSelector
          onEmojiSelected={handleEmojiSelect}
          category={Categories.all}
          showTabs={true}
          showSearchBar={true}
          showHistory={true}
          columns={10}
          placeholder="Search emoji..."
        />
      )}
    </View>
  );
};

export default EmojiPicker