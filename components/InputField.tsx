import { InputFieldProps } from "../types";
import { useState } from "react";
import { View, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import CustomIcons from "./CustomIcons";
import { useColorScheme } from "nativewind";

const InputField = ({
  changeFormFn,
  title,
  type,
  value,
  inputStyles,
}: InputFieldProps) => {
  const [showPassord, setShowPassord] = useState(false);

  const {colorScheme} = useColorScheme()

  return (
    <View className={`flex-row items-center justify-center ${inputStyles} border-2 border-black/30 dark:border-secondary h-12 p-2 rounded-md`}>
      <TextInput
        value={value}
        keyboardType={type}
        placeholder={title}
        onChangeText={changeFormFn}
        secureTextEntry={title === "Password" && !showPassord}
        placeholderTextColor={colorScheme === "light" ? "gray" : "white"}
        className="flex-1 text-secondary-foreground dark:text-secondary"
        cursorColor={"#1A91DA"}
      />
      { title === "Password" && <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setShowPassord((prev) => !prev)}
      >
        {!showPassord ? (
          <CustomIcons name="eye" size={22} />
        ) : (
          <CustomIcons name="eye-off" size={22} />
        )}
      </TouchableOpacity>}
    </View>
  );
};

export default InputField;
