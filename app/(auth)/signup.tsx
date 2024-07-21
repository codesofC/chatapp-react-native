import {
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { SignupDataProps } from "../../types";
import { pickImageFn } from "../../constants";
import { StatusBar } from "expo-status-bar";

const Signup = () => {
  const [form, setForm] = useState<SignupDataProps>({
    email: "",
    password: "",
    username: "",
    file: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickImage = async () => {
    let result = await pickImageFn();

    if (result) {
      setForm((prev) => ({
        ...prev,
        file: { name: result.name, uri: result.uri },
      }));
    }
  };

  return (
    <SafeAreaView className="relative flex-1 w-full bg-primary">
      <View className="w-full h-full">
        <View className="relative w-12 h-12 mb-2" />

        <View className="w-full flex-1 justify-between px-4 py-8 bg-white rounded-t-3xl">
          <View className="items-center px-4">
            <View className="relative w-24 h-24 rounded-full items-center justify-center overflow-hidden">
              <Image
                source={
                  form.file
                    ? { uri: form.file.uri }
                    : require("../../assets/images/logo1.png")
                }
                resizeMode="cover"
                className={form.file ? "w-full h-full" : "w-20 h-20"}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                className="w-full h-full absolute left-0 top-0 bg-black/10 rounded-full items-center justify-center"
                onPress={pickImage}
              >
                <MaterialCommunityIcons
                  name="account-edit"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            <View className="w-full flex flex-col mt-4">
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
                changeFormFn={(e) =>
                  setForm((prev) => ({ ...prev, password: e }))
                }
                inputStyles="mt-8"
              />
            </View>
            <View className="w-full">
              <CustomButton
                title="Sign In"
                pressButtonFn={() => {}}
                buttonStyle="mt-8 bg-primary"
                textStyle="text-primary-foreground"
                isSubmitting={isSubmitting}
              />
              <CustomButton
                title="Sign In"
                pressButtonFn={() => router.push("/signin")}
                buttonStyle="mt-4 bg-transparent border"
                textStyle="text-secondary-foreground"
              />
            </View>
          </View>
        </View>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Signup;
