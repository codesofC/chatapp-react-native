import { ChatDataProps, ReceiverProps } from "../../types/index"
import { ChatContext } from "./useChatContext";
import { useEffect, useState } from "react";
import { db } from "../../lib/Firebase";
import { doc, onSnapshot } from "firebase/firestore";

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [currentReceiver, setCurrentReceiver] = useState<ReceiverProps>();
  const [chatData, setChatData] = useState<ChatDataProps>();
  const [showChatList, setShowChatList] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  //Listen chat data update from database in realtime
  useEffect(() => {
    if (currentReceiver?.chatId) {
      const unsubscribe = onSnapshot(
        doc(db, `chats/${currentReceiver.chatId}`),
        (doc) => {
          setChatData(doc.data() as ChatDataProps);
        }
      );

      return () => unsubscribe();
    }
  }, [currentReceiver]);

  return (
    <ChatContext.Provider
      value={{
        currentReceiver,
        setCurrentReceiver,
        chatData,
        setChatData,
        setShowChatList,
        setShowDetails,
        showChatList,
        showDetails
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
