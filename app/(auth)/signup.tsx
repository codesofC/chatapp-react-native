import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
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
import AntDesign from "@expo/vector-icons/AntDesign";
import { addUser, signup, uploadFiles } from "../../lib/Firebase";

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
        file: { name: result.name || "", uri: result.uri },
      }));
    }
  };

  //Submit data to sign up
  const submitData = async () => {
    if (!form.email || !form.password || !form.username) {
      return Alert.alert("Fields missing", "Please, fill all inputs!");
    }

    let url: string | undefined;

    if (form.file) {
      // Convert Image uri to Blob
      const response = await fetch(form.file.uri);
      const blob = await response.blob();

      url = await uploadFiles(form.file.name, blob);
    }

    setIsSubmitting(true);

    await signup(form.email, form.password)
      .then(async (userId) => {
        if (userId) {
          await addUser({
            email: form.email,
            avatar: url || "",
            uid: userId,
            username: form.username,
            blocked: [],
          })
            .then(() => {
              router.push("/chatlist");
            })
            .catch((error) => {
              console.log("Add User Failed: ", error);
            });
        }
      })
      .catch((error) => {
        Alert.alert("Error to sign up", error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
        setForm({
          email: "",
          password: "",
          username: "",
          file: null,
        });
      });
  };

  return (
    <SafeAreaView className="relative flex-1 w-full bg-primary">
      <View className="w-full h-full">
        <View className="relative w-12 h-12 mb-2" />
        <View className="w-full flex-1 justify-center space-y-8 px-4 py-8 bg-white rounded-t-3xl">
          <View className="items-center space-y-1">
            <Text className="text-3xl font-bold"> Welcome </Text>
            <Text className="text-sm font-normal">
              {" "}
              Sign up to start talking with your friends{" "}
            </Text>
          </View>
          <ScrollView>
            <View className="items-center px-4">
              <View className="relative w-24 h-24 items-center justify-center">
                <Image
                  source={
                    form.file
                      ? { uri: form.file.uri }
                      : require("../../assets/images/unknown.png")
                  }
                  resizeMode="cover"
                  className={
                    form.file ? "w-full h-full rounded-full" : "w-20 h-20"
                  }
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="absolute right-0 bottom-0 bg-black/50 p-2 rounded-full items-center justify-center z-10"
                  onPress={pickImage}
                >
                  <AntDesign name="picture" size={18} color="white" />
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
                  changeFormFn={(e) =>
                    setForm((prev) => ({ ...prev, email: e }))
                  }
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
                  title="Sign Up"
                  pressButtonFn={submitData}
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
          </ScrollView>
        </View>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Signup;
