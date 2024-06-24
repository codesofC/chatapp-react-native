import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const chatlist = () => {
  return (
    <SafeAreaView className='flex-1 items-center justify-center'>
      <CustomButton title='go To chat' buttonStyle='bg-primary' pressButtonFn={() => router.push('/chat')} />
    </SafeAreaView>
  )
}

export default chatlist