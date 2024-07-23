import { ChatsProps, UserProps } from "../../types";
import { REACT_NATIVE_APP_ID, REACT_NATIVE_AUTH_DOMAIN, REACT_NATIVE_FIREBASE_API_KEY, REACT_NATIVE_PROJECT_ID, REACT_NATIVE_SENDER_ID, REACT_NATIVE_STORAGE_BUCKET } from "@env";

import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

//Persistance auth firebase react-native

const firebaseConfig = {
  apiKey: REACT_NATIVE_FIREBASE_API_KEY,
  authDomain: REACT_NATIVE_AUTH_DOMAIN,
  projectId: REACT_NATIVE_PROJECT_ID,
  storageBucket: REACT_NATIVE_STORAGE_BUCKET,
  messagingSenderId: REACT_NATIVE_SENDER_ID,
  appId: REACT_NATIVE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
const storage = getStorage(app);

//Sign Up
export const signup = async (email: string, password: string) => {
  try {
    const userCredencial = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredencial.user.uid;
  } catch (error) {
    console.log(error);
  }
};

//Sign In
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential.user.uid;
  } catch (error) {
    throw new Error(error as string)
  }
};

//Sign Out
export const signout = async () => {
  await signOut(auth)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addUser = async (data: UserProps) => {
  try {
    const docRef = doc(db, `users/${data.uid}`);
    const chatRef = doc(db, `userChats/${data.uid}`);

    await setDoc(docRef, {
      ...data,
    });

    await setDoc(chatRef, {
      chats: [],
    });
  } catch (error) {
    console.log(error);
  }
};
//Get User
export const getUser = async (uid: string) => {
  try {
    const userRef = doc(db, `users/${uid}`);
    const docSnap = await getDoc(userRef);

    return docSnap?.data() as UserProps;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  let session: string = ""

  onAuthStateChanged(auth, (userCredencial) => {
    if(userCredencial){
      session = userCredencial.uid;
    }
  })

  try {
    if(session){
      const response = await getUser(session)
      return response
    }else {
      return null
    }
  } catch (error) {
    throw new Error(error as string)
  }
}

//Get Chats Data of user
export const getChats = async (uid: string) => {
  try {
    const userRef = doc(db, `userChats/${uid}`);
    const docSnap = await getDoc(userRef);

    return docSnap?.data() as ChatsProps;
  } catch (error) {
    console.log(error);
  }
};

//Upload image avatar
export const uploadFiles = async (name: string, file: Blob) => {
  try {
    const fileRef = ref(storage, `files/${name}`);
    const fileUploaded = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileUploaded.ref);
    return url;
  } catch (error) {
    console.log("File not uploaded: ", error);
  }
};

//getUsers to add conversation
export const getUsersToAdd = async (
  username: string,
  currentUserUsername: string
) => {
  try {
    const docRef = collection(db, "users");
    const q = query(docRef, where("username", "==", username));

    const querySnapshot = await getDocs(q);
    const usersFound: UserProps[] = [];
    querySnapshot.forEach((doc) => {
      const userFound = doc.data();
      if (userFound.username !== currentUserUsername) {
        usersFound.push(doc.data() as UserProps);
      }
    });

    return usersFound;
  } catch (error) {
    console.log("Error to fetch users to add conversation");
  }
};

//Create a new chats
export const createNewChat = async (
  currentUserId: string,
  receiverId: string
) => {
  const chatRef = collection(db, "chats");
  const userChatsRef = collection(db, "userChats");

  try {
    const newChatRef = doc(chatRef);
    await setDoc(newChatRef, {
      createdAt: serverTimestamp(),
      messages: [],
    });

    const dateUpdateAt = Date.now();

    await updateDoc(doc(userChatsRef, receiverId), {
      chats: arrayUnion({
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: currentUserId,
        updatedAt: dateUpdateAt,
        isSeen: true,
        isReceiverBlocked: false,
        isCurrentUserBlocked: false,
      }),
    });

    await updateDoc(doc(userChatsRef, currentUserId), {
      chats: arrayUnion({
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: receiverId,
        updatedAt: dateUpdateAt,
        isSeen: true,
        isReceiverBlocked: false,
        isCurrentUserBlocked: false,
      }),
    });

    return newChatRef.id;
  } catch (error) {
    console.log("Error creating chat: ", error);
  }
};

//Updated Chats Data
export const updateChatsData = async (
  chatId: string,
  userUid: string,
  type: string,
  message: string
) => {
  try {
    const chatRef = doc(db, `chats/${chatId}`);

    await updateDoc(chatRef, {
      messages: arrayUnion({
        senderId: userUid,
        type,
        sendedAt: Date.now(),
        content: message,
      }),
    });
  } catch (error) {
    console.log("Error in update chats data: ", error);
  }
};

// update UserChatsData
export const updateUserChatsData = (
  chatId: string,
  userUids: string[],
  message: string,
  type: string
) => {
  userUids.forEach(async (uid) => {
    const chatData = await getChats(uid);

    const dateUpdate = Date.now();

    //Found chat to update for sender
    if (chatData) {
      const chatDataIndex = chatData.chats.findIndex(
        (chat) => chat.chatId === chatId
      );
      chatData.chats[chatDataIndex].lastMessage =
        type === "text" ? message : "🖼 Media sended";
      chatData.chats[chatDataIndex].isSeen = uid === userUids[0] ? true : false;
      chatData.chats[chatDataIndex].updatedAt = dateUpdate;
      const userRef = doc(db, `userChats/${uid}`);

      await updateDoc(userRef, {
        chats: chatData.chats,
      });
    }
  });
};

//Update Message view
export const updateViewMessage = async (chatId: string, userUid: string) => {
  const chatData = await getChats(userUid);

  //Found chat to update for sender
  if (chatData) {
    const chatDataIndex = chatData.chats.findIndex(
      (chat) => chat.chatId === chatId
    );

    chatData.chats[chatDataIndex].isSeen = true;

    const userRef = doc(db, `userChats/${userUid}`);

    await updateDoc(userRef, {
      chats: chatData.chats,
    });
  }
};

//Update avatar user
export const updateYourAvatar = async (userId: string, url: string) => {

  try {
    const docRef = doc(db, `users/${userId}`)
    await updateDoc(docRef, {
      avatar: url
    })
  } catch (error) {
    console.log("Error updating avatar of user: ", error);
  }
}