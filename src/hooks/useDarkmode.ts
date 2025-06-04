import { useColorScheme } from 'react-native'

export default function useDarkmode() {
  const isDarkMode = useColorScheme() === 'dark'
  return true
}
