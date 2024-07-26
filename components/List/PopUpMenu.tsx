import { View, Text, TouchableOpacity, Modal, Pressable, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import CustomIcons from "../CustomIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { signout } from "../../lib/Firebase";

const PopUpMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {colorScheme, toggleColorScheme} = useColorScheme()

  const options = [
    {
      name: "Profile",
      action: "/chatlist",
    },
    {
      name: "Starred friends",
      action: "/chatlist",
    },
    {
      name: "Settings",
      action: "/chatlist",
    }
  ];

  const deconnection = async () => {
    await signout().then(() => {
      router.push("/")
    })
  }

  return (
    <>
      <TouchableOpacity activeOpacity={0.7} onPress={() => setIsOpen(true)}>
        <CustomIcons name="ellipsis-vertical-sharp" color="white" />
      </TouchableOpacity>
      <Modal
        transparent
        visible={isOpen}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View className="absolute top-0 left-0 right-0 bottom-0" />
        </TouchableWithoutFeedback>
        <View className="absolute top-14 right-6 bg-secondary dark:bg-secondary-foreground w-1/2 rounded-lg shadow-2xl border border-gray-300 dark:border-gray-700">
          <View className="border-b border-gray-300 dark:border-gray-700 pb-6">
            {options.map((option, index) => (
              <Pressable
                key={index}
                onPress={() => router.push(option.action)}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "gray" : "transparent",
                    paddingHorizontal: 12,
                    paddingVertical: 15,
                  },
                ]}
              >
                <Text className="font-semibold text-[16px] text-secondary-foreground dark:text-secondary">
                  {" "}
                  {option.name}{" "}
                </Text>
              </Pressable>
            ))}
            <Pressable
                onPress={deconnection}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "gray" : "transparent",
                    paddingHorizontal: 12,
                    paddingVertical: 15,
                  },
                ]}
              >
                <Text className="font-semibold text-[16px] text-secondary-foreground dark:text-secondary">
                  Sign out
                </Text>
              </Pressable>
          </View>
          <TouchableOpacity activeOpacity={0.7} className="my-2 px-2 self-end" onPress={toggleColorScheme}>
            {colorScheme === "light" ? <CustomIcons name="moon-outline" size={24} /> : <CustomIcons name="sunny-outline" size={24} color="white" />}
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default PopUpMenu;
