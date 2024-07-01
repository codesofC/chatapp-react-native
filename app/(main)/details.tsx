import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderDetails from "@/components/Details/HeaderDetails";
import DetailsContent from "@/components/Details/DetailsContent";

const details = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <HeaderDetails />
        <DetailsContent />
      </View>
    </SafeAreaView>
  );
};

export default details;
