import { Ionicons } from '@expo/vector-icons';
import { CustomIconsProps } from '../types';

const CustomIcons = ({name, color, size}: CustomIconsProps) => {
  return (
    <Ionicons name={name as any} size={size || 20} color={color || 'black'} />
  )
}

export default CustomIcons