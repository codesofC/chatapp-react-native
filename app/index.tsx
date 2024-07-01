import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";

const App = () => {

  const {isConnected, isLoading} = useGlobalContext()

  if(isConnected && !isLoading) <Redirect href="/chatlist" />

  return (
    <SafeAreaView className="flex-1 justify-center items-center w-full">
      <LinearGradient colors={["#1A91DA", "#FFF"]} className="w-full h-full flex items-center justify-center">
        <TouchableOpacity activeOpacity={.7} onPress={() => router.push('/signin')} className="py-2 px-4 bg-black  rounded-md">
            <Text className="text-white"> Go to SignIn </Text>
        </TouchableOpacity>
      </LinearGradient>
      <StatusBar backgroundColor="#1A91DA" style="light" />
    </SafeAreaView>
  );
};

export default App;