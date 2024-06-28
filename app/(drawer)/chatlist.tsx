import HeaderDrawer from "@/components/HeaderDrawer";
import InputField from "@/components/InputField";
import generatorAvatar from "@/constants/generatorAvatar";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";

const ChatList = () => {
  const [search, setSearch] = useState("");

  const data = [1, 2, 3, 4, 5];

  const renderItem = ({ item }: { item: number }) => (
    <TouchableOpacity
      className="relative flex-row justify-between items-end px-6 py-4"
      activeOpacity={.8}
      onPress={() => router.push('/chat')}
    >
      <View className="flex-row gap-x-2 items-center">
        <View className="rounded-full overflow-hidden">
          <SvgXml xml={generatorAvatar("Cristooo")} width={48} height={48} />
        </View>
        <View>
          <Text className="font-semibold text-lg"> Cristooo </Text>
          <Text className="text-sm"> my message sended to ... </Text>
        </View>
      </View>
      <Text className="text-xs font-extralight">11h:10 {item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={data}
        renderItem={renderItem}
        ListHeaderComponent={() => {
          return (
            <View>
              <HeaderDrawer />
              <View className="py-4 px-6">
                <TextInput
                  value={search}
                  onChangeText={(e) => setSearch(e)}
                  placeholder="Search conversation..."
                  className="border border-gray-300 px-2 py-1 rounded-md"
                />
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ChatList;
