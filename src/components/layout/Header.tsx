import { colors } from '@/constants/colors'
import { fonts } from '@/constants/fonts'
import useDarkmode from '@/hooks/useDarkmode'
import { StyleSheet, View } from 'react-native'
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'
import CheeseLogo from '@/assets/icons/CHEESE_LOGO.svg'
import CheeseUser from '@/assets/icons/CHEESE_USER.svg'

export default function CheeseHeader() {
  const safeAreaInsets = useSafeAreaInsets()
  const isDarkMode = useDarkmode()

  const styles = customStyles(safeAreaInsets, isDarkMode)
  const color = colors(isDarkMode)

  return (
    <View style={styles.header}>
      <CheeseLogo color={color.active} />
      <CheeseUser color={color.text.primary} />
    </View>
  )
}

function customStyles(safeAreaInsets: EdgeInsets, isDarkMode: boolean) {
  const color = colors(isDarkMode)
  return StyleSheet.create({
    header: {
      position: 'absolute',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: safeAreaInsets.top + 10,
      paddingBottom: 10,
      left: 0,
      right: 0,
      paddingHorizontal: 28,
    },
  })
}
