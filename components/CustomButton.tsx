import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '../types'

const CustomButton = ({title, buttonStyle, pressButtonFn, textStyle, isSubmitting}: CustomButtonProps) => {
  return (
    <TouchableOpacity 
        activeOpacity={.7}
        className={`flex-row items-center justify-center p-2 ${buttonStyle} rounded-full`}
        onPress={pressButtonFn}
    >
      { isSubmitting ? <ActivityIndicator size={'small'} color="white" /> :
      <Text className={`text-lg font-semibold ${textStyle}`}>{title}</Text>}
    </TouchableOpacity>
  )
}

export default CustomButton