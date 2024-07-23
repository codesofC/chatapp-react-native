import { FieldValue, Timestamp } from "firebase/firestore";
import { KeyboardTypeOptions } from "react-native";

export interface InputFieldProps {
    title: string,
    inputStyles?: string,
    type?: KeyboardTypeOptions,
    value: string,
    changeFormFn: (newValue: string) => void,
    placeholder?: string
}

export interface CustomIconsProps {
    name: string,
    size?: number,
    color?: string,
}

export interface CustomButtonProps {
    title: string,
    pressButtonFn?: () => void,
    buttonStyle?: string,
    textStyle?: string,
    isSubmitting?: boolean
}

export interface HeaderChatListProps {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export interface FileProfilPhotoProps {
    name: string,
    uri: string
}

export interface SignupDataProps {
    email: string,
    username: string,
    password: string,
    file: FileProfilPhotoProps | null
}

export interface EmojiPickerProps {
    showPicker: boolean,
    setText: React.Dispatch<React.SetStateAction<string>>
}

export interface UserProps {
    username: string,
    email: string,
    avatar?: string,
    uid: string,
    blocked: string [],
}

export interface ReceiverProps {
    receiverId: string,
    lastMessage: string,
    isSeen: boolean,
    receiverData?: UserProps,
    updatedAt: Timestamp | number,
    chatId: string,
    isReceiverBlocked: boolean,
    isCurrentUserBlocked: boolean
}

export interface ChatsProps {
    chats: ReceiverProps []
}

export interface GlobalContextProps{
    user: UserProps | null,
    setUser: React.Dispatch<React.SetStateAction<UserProps | null>>,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    isConnected: boolean,
    setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
}

export interface AvatarProps{
    email: string,
    avatar?: string,
    avatarStyle?: {
        width: number,
        height: number
    }
}

export interface MessageProps{
    type: "text" | "media",
    content: string,
    senderId: string,
    sendedAt: Date
}

export interface ChatDataProps{
    createdAt: FieldValue,
    messages: MessageProps[]
}

export interface ChatContextProps{
    currentReceiver: ReceiverProps | undefined,
    setCurrentReceiver: React.Dispatch<React.SetStateAction<ReceiverProps | undefined>>,
    chatData: ChatDataProps | undefined,
    setChatData: React.Dispatch<React.SetStateAction<ChatDataProps | undefined>>,
    showDetails: boolean,
    setShowDetails: React.Dispatch<React.SetStateAction<boolean>>
    showChatList: boolean,
    setShowChatList: React.Dispatch<React.SetStateAction<boolean>>
}
export interface MessagesProps {
    content: string
    senderId: string
    sendedAt: string
    userId: string
};
  
export interface FileProps{
    name: string,
    uri: string
}