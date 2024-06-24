import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/types'

const CustomButton = ({title, buttonStyle, pressButtonFn, textStyle}: CustomButtonProps) => {
  return (
    <TouchableOpacity 
        activeOpacity={.7}
        className={`w-full items-center justify-center p-2 ${buttonStyle} rounded-md`}
        onPress={pressButtonFn}
    >
      <Text className={`text-lg font-semibold ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton