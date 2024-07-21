import { Image, View } from 'react-native'
import { AvatarProps } from '../types'
import { SvgXml } from 'react-native-svg'
import generatorAvatar from '../lib/Dicebear'

const CustomAvatar = ({ avatar, email, avatarStyle }: AvatarProps) => {
  return <View className="items-center justify-center rounded-full overflow-hidden">
    {
      avatar ? (
        <Image 
          source={{ uri: avatar}}
          resizeMode="cover"
          height={avatarStyle ? avatarStyle.height : 32}
          width={avatarStyle ? avatarStyle.width : 32}
        />
      ) : (
        <SvgXml 
          xml={generatorAvatar(email)} 
          width={avatarStyle ? avatarStyle.width : 32}
          height={avatarStyle ? avatarStyle.height : 32}
      />
      )
    }
  </View>
}

export default CustomAvatar