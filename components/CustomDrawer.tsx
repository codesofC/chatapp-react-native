import { View, Text } from 'react-native'
import { useGlobalContext } from '../context/GlobalContext/useGlobalContext'
import CustomAvatar from './CustomAvatar'

const CustomDrawer = () => {

  const {user} = useGlobalContext()


  if(!user) return

  return (
    <View className='items-center my-8'>
      <CustomAvatar email={user.email} avatar={user.avatar} avatarStyle={{width: 120, height: 120}} />
      <Text className='text-2xl font-semibold mt-2'> {user.username} </Text>
    </View>
  )
}

export default CustomDrawer