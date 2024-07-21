import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import CustomIcons from "../components/CustomIcons";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getUser } from "../lib/Firebase";
import { useGlobalContext } from "../context/GlobalContext/useGlobalContext";
import { UserProps } from "../types";

const App = () => {

  const {setUser, setIsConnected} = useGlobalContext()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if(user){
        getUserData(user.uid)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const getUserData = async (userId: string) => {
    await getUser(userId)
        .then(userData => {
          setIsConnected(true)
          setUser(userData as UserProps)
        })
        .catch(error => {
          Alert.alert("Error", "Failed fetching user signIn: ", error.message);
        })
        router.replace("/chatlist")
  }

  return (
    <SafeAreaView className="relative flex-1 w-full bg-primary">
      <View className="w-full h-full items-center">
        <View className="relative w-20 h-20 mb-4">
          <Image
            source={require("../assets/images/logo2.png")}
            resizeMode="contain"
            className="w-full h-full"
          />
        </View>
        <View className="w-full flex-1 justify-between px-4 py-8 bg-white rounded-t-3xl">
          <View className="items-center space-y-2">
            <View className="w-full h-[350px]">
              <Image
                source={require("../assets/images/home.png")}
                resizeMode="cover"
                className="w-full h-full"
              />
            </View>
            <View className="items-center">
              <Text className="text-4xl font-bold"> SnapTalk </Text>
              <Text className="text-secondary-foreground/70">
                {" "}
                Be always with your friends anywhere{" "}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/signin")}
            className="self-end flex-row items-center"
          >
            <Text className="text-lg text-primary font-bold"> Next </Text>
            <CustomIcons name="chevron-forward-sharp" color="#1a91db" />
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default App;
