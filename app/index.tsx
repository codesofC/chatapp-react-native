import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center w-full">
      <LinearGradient colors={["#1A91DA", "#FFF"]} className="w-full h-full">
        <View className="w-full h-full flex flex-col items-center justify-center gap-6">
          <Image
            source={require("../assets/images/logo2.png")}
            resizeMode="contain"
            className="w-28 h-28"
          />

          <View className="w-full px-8 flex flex-col gap-4">
            <TextInput keyboardType="email-address" placeholder="Email" className="w-full h-12 border-2 border-gray-200 rounded-full px-4 text-center text-black/50" />

            <TextInput keyboardType="visible-password" placeholder="Password" className="w-full h-12 border-2 border-gray-200 rounded-full px-4 text-center text-black/50" secureTextEntry />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;
