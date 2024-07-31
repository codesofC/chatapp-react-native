import { View, TouchableOpacity, FlatList, Image, Text } from "react-native";
import { List } from "react-native-paper";
import CustomIcons from "../CustomIcons";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MessageProps } from "../../types";
import { useChatContext } from "../../context/ChatContext/useChatContext";
import { useColorScheme } from "nativewind";

const DetailsContent = () => {
  const [expanded, setExpanded] = useState(false);

  const { chatData } = useChatContext();

  const {colorScheme} = useColorScheme()

  const handlePress = () => setExpanded((prev) => !prev);

  const renderItem = ({ item }: { item: MessageProps }) =>
    item.type === "media" ? (
      <List.Item
        title={() => (
          <View className="w-full flex-row justify-between items-center">
            <Image
              source={{ uri: item.content }}
              resizeMode="cover"
              className="w-[60px] h-[60px] rounded-md"
            />
            <TouchableOpacity>
              <MaterialIcons name="file-download" size={24} color={colorScheme === "dark" ? "white" : "black"} />
            </TouchableOpacity>
          </View>
        )}
      />
    ) : null;

  return (
    chatData?.messages && (
      <List.Section>
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
          style={{backgroundColor: colorScheme === "dark" ? "#1c1c1c" : "#F5F5F5"}}
          titleStyle={{color: colorScheme === "dark" ? "#F5F5F5" : "#1c1c1c"}}
        >
          <FlatList
            data={chatData?.messages}
            renderItem={renderItem}
            keyExtractor={(_item, index) => index.toString()}
          />
        </List.Accordion>
        <List.Accordion
          title="Chat Settings"
          left={(props) => (
            <List.Icon
              {...props}
              icon={() => <CustomIcons name="settings" />}
            />
          )} 
          style={{backgroundColor: colorScheme === "dark" ? "#1c1c1c" : "#F5F5F5"}}
          titleStyle={{color: colorScheme === "dark" ? "#F5F5F5" : "#1c1c1c"}}
        >
          <List.Item title="Setttings item" />
        </List.Accordion>
      </List.Section>
    )
  );
};

export default DetailsContent;
