import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import CustomIcons from "@/components/CustomIcons";
import * as ImagePicker from "expo-image-picker"
import { SignupDataProps } from "@/types";

const Signup = () => {
  const [form, setForm] = useState<SignupDataProps>({
    email: "",
    password: "",
    username: "",
    file: null,
  });

  const pickImage = async () => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setForm(prev => ({...prev, file: {name: result.assets[0].fileName, uri: result.assets[0].uri}}));
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center w-full">
      <LinearGradient colors={["#1A91DA", "#FFF"]} className="w-full h-full items-center justify-center">
        <View className="w-full h-full flex flex-col items-center justify-center gap-6">
          <View className="relative w-24 h-24 rounded-full items-center justify-center overflow-hidden">
            <Image
              source={form.file ? {uri: form.file.uri} : require("../../assets/images/logo2.png")}
              resizeMode="cover"
              className={form.file ? 'w-full h-full' : 'w-20 h-20'}
            />
            <TouchableOpacity activeOpacity={.7} className="w-full h-full absolute left-0 top-0 bg-secondary/30 rounded-full items-center justify-end"
              onPress={pickImage}
            >
              <CustomIcons name="add-circle" size={32} color="rgba(0,0,0,.7)" />
            </TouchableOpacity>
          </View>

          <View className="w-full px-8 flex flex-col">
            <InputField
              title="Username"
              type="default"
              value={form.username || ""}
              changeFormFn={(e) =>
                setForm((prev) => ({ ...prev, username: e }))
              }
              inputStyles="mt-4"
            />

            <InputField
              title="Email"
              type="email-address"
              value={form.email}
              changeFormFn={(e) => setForm((prev) => ({ ...prev, email: e }))}
              inputStyles="mt-8"
            />

            <InputField
              title="Password"
              value={form.password || ""}
              type="visible-password"
              changeFormFn={(e) =>
                setForm((prev) => ({ ...prev, password: e }))
              }
              inputStyles="mt-8"
            />

            <View className="w-full mt-4 flex-row">
              <Text className="text-xs"> I already have a account. </Text>
              <Link
                href={"/signin"}
                className="text-xs underline text-primary font-bold"
              >
                {" "}
                Sign in{" "}
              </Link>
            </View>

            <CustomButton
              title="Sign Up"
              pressButtonFn={() => {}}
              buttonStyle="mt-8 bg-primary"
              textStyle="text-primary-foreground"
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Signup;
