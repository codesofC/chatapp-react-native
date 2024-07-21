import { View, Text, TouchableOpacity } from "react-native";
import CustomAvatar from "../CustomAvatar";
import { AvatarProps } from "../../types";
import CustomIcons from "../CustomIcons";
import { router } from "expo-router";

type HeaderDetailsProps = {
  avatarData: AvatarProps;
  username: string;
};

const HeaderDetails = ({ avatarData, username }: HeaderDetailsProps) => {
  return (
    <View className="gap-y-2 items-center justify-center w-full pb-4">
      <View className="w-full">
        <TouchableOpacity className="px-4 mt-4" activeOpacity={0.8} onPress={() => router.back()}>
          <CustomIcons name="chevron-back-sharp" size={24} />
        </TouchableOpacity>
        <View className="items-center justify-center rounded-full overflow-hidden px-6">
          <CustomAvatar
            email={avatarData.email}
            avatar={avatarData.avatar}
            avatarStyle={{ width: 120, height: 120 }}
          />
        </View>
      </View>
      <Text className="font-semibold text-xl"> {username} </Text>
    </View>
  );
};

export default HeaderDetails;
