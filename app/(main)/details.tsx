import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderDetails from "../../components/Details/HeaderDetails";
import DetailsContent from "../../components/Details/DetailsContent";
import { useChatContext } from "../../context/ChatContext/useChatContext";

const details = () => {
  const { currentReceiver } = useChatContext();

  return (
    currentReceiver?.receiverData && (
      <SafeAreaView className="flex-1">
        <View className="flex-1">
          <HeaderDetails
            avatarData={{
              email: currentReceiver.receiverData.email,
              avatar: currentReceiver.receiverData.avatar,
            }}
            username={currentReceiver.receiverData.username}
          />
          <DetailsContent />
        </View>
      </SafeAreaView>
    )
  );
};

export default details;
