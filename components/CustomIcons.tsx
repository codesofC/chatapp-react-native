import { Ionicons } from '@expo/vector-icons';
import { CustomIconsProps } from '../types';
import { useColorScheme } from 'nativewind';

const CustomIcons = ({name, color, size}: CustomIconsProps) => {

  const {colorScheme} = useColorScheme()

  return (
    <Ionicons name={name as any} size={size || 20} color={color || (colorScheme === "light" ? 'black' : 'white')} />
  )
}

export default CustomIcons