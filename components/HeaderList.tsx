import { View, Image, TouchableOpacity, Text } from "react-native";
import CustomIcons from "./CustomIcons";
import CustomAvatar from "./CustomAvatar";
import { useGlobalContext } from "../context/GlobalContext/useGlobalContext";
import PopUpMenu from "./List/PopUpMenu";

const HeaderList = () => {
  const { user } = useGlobalContext();

  if (!user) return;

  return (
    <View className="flex-row items-center justify-between py-4 px-6">
      <View className="flex-row gap-x-1 items-center">
        <CustomAvatar
          email={user.email}
          avatar={user.avatar}
          avatarStyle={{ width: 42, height: 42 }}
        />
        <Text className="font-bold text-xl text-secondary">
          {" "}
          {user.username}{" "}
        </Text>
      </View>
      <PopUpMenu />
    </View>
  );
};

export default HeaderList;
