import { View, Text, TouchableOpacity } from "react-native";
import { List } from "react-native-paper";
import CustomIcons from "@/components/CustomIcons";
import { useState } from "react";
import { SvgXml } from "react-native-svg";
import generatorAvatar from "@/lib/Dicebear/generatorAvatar";
import { MaterialIcons } from "@expo/vector-icons";

const DetailsContent = () => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded((prev) => !prev);

  return (
    <List.Section>
      <List.Accordion
        title="Chat Settings"
        left={(props) => (
          <List.Icon {...props} icon={() => <CustomIcons name="settings" />} />
        )}
      >
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
        title="Shared"
        left={(props) => (
          <List.Icon
            {...props}
            icon={() => <CustomIcons name="images-sharp" />}
          />
        )}
        expanded={expanded}
        onPress={handlePress}
      >
        <List.Item
          title={() => (
            <View className="w-full flex-row justify-between items-center">
              <SvgXml xml={generatorAvatar("Laurhyn")} />
              <TouchableOpacity>
                <MaterialIcons name="file-download" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
        />
        <List.Item
          title={() => (
            <View className="w-full flex-row justify-between items-center">
              <SvgXml xml={generatorAvatar("Laurhyn")} />
              <TouchableOpacity>
                <MaterialIcons name="file-download" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
        />
      </List.Accordion>
    </List.Section>
  );
};

export default DetailsContent;
