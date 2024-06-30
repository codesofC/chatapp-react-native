import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/types'

const CustomButton = ({title, buttonStyle, pressButtonFn, textStyle}: CustomButtonProps) => {
  return (
    <TouchableOpacity 
        activeOpacity={.7}
        className={`w-full flex-row items-center justify-center p-2 ${buttonStyle} rounded-md`}
        onPress={pressButtonFn}
    >
      {/* <ActivityIndicator size={'large'} color="white" /> */}
      <Text className={`text-lg font-semibold ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton