import { View, Image, TouchableOpacity } from "react-native";
import CustomIcons from "./CustomIcons";

import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import CustomAvatar from "./CustomAvatar";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";

const HeaderDrawer = () => {

  const navigation = useNavigation()

  const {user} = useGlobalContext()

  const handleDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  if(!user) return

  return (
    <View className="flex-row items-center justify-between py-4 px-6 border-b border-gray-300">
      <TouchableOpacity
        onPress={handleDrawer}
    >
        <CustomAvatar email={user.email} avatar={user.avatar} />
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
