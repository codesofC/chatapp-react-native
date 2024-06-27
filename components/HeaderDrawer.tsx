import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import CustomIcons from "./CustomIcons";
import { SvgXml } from "react-native-svg";
import generatorAvatar from "@/constants/generatorAvatar";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

const HeaderDrawer = () => {
  const myAvatar = generatorAvatar("Cristooo");

  const navigation = useNavigation()

  const handleDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }
  return (
    <View className="flex-row items-center justify-between py-4 px-6 border-b border-gray-300">
      <TouchableOpacity 
        className="items-center justify-center rounded-full overflow-hidden"
        onPress={handleDrawer}
    >
        <SvgXml 
            xml={myAvatar} 
            width={32}
            height={32}
        />
      </TouchableOpacity>
      <Image
        source={require("../assets/images/logo1.png")}
        resizeMode="cover"
        className="w-8 h-8"
      />
      <TouchableOpacity>
        <CustomIcons name="moon" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderDrawer;
