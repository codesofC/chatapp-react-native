import { View, Text } from "react-native";
import generatorAvatar from "@/lib/Dicebear/generatorAvatar";
import { SvgXml } from "react-native-svg";

const HeaderDetails = () => {
  return (
    <View className="gap-y-2 items-center justify-center w-full p-6 border-b border-gray-300">
      <View className="items-center justify-center rounded-full overflow-hidden">
        <SvgXml xml={generatorAvatar("Cristooo")} width={120} height={120} />
      </View>
      <Text className="font-semibold text-xl"> Cristooo </Text>
    </View>
  );
};

export default HeaderDetails;
