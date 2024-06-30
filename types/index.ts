import { Timestamp } from "firebase/firestore";
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
    textStyle?: string
}

export interface FileProfilPhotoProps {
    name: string | null | undefined,
    uri: string
}

export interface SignupDataProps {
    email: string,
    username?: string,
    password?: string,
    file: FileProfilPhotoProps | null
}

export interface EmojiPickerProps {
    showPicker: boolean,
    setShowPicker: React.Dispatch<React.SetStateAction<boolean>>,
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