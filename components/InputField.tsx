import { InputFieldProps } from "../types";
import { useState } from "react";
import { View, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import CustomIcons from "./CustomIcons";

const InputField = ({
  changeFormFn,
  title,
  type,
  value,
  inputStyles,
}: InputFieldProps) => {
  const [showPassord, setShowPassord] = useState(false);

  return (
    <View className={`flex-row items-center justify-center ${inputStyles} border-2 border-black/30 h-12 p-2 rounded-md`}>
      <TextInput
        value={value}
        keyboardType={type}
        placeholder={title}
        onChangeText={changeFormFn}
        secureTextEntry={title === "Password" && !showPassord}
        className="flex-1"
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
