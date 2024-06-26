import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const CustomDrawer = () => {
  return (
    <View className='items-center my-8'>
      <Image 
        source={require('../assets/images/logo1.png')}
        resizeMode='cover'
        className='w-28 h-28 border'
      />
      <Text className='text-lg font-semibold mt-2'> Cristooo </Text>
    </View>
  )
}

export default CustomDrawer