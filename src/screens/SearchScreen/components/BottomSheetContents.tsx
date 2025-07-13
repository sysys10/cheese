import MainSearchBar from '@/screens/HomeScreen/components/MainSearchBar'
import { StyleSheet } from 'react-native'
import { View } from 'react-native-reanimated/lib/typescript/Animated'

export function BottomSheetContents() {
  return (
    <View style={styles.sheetContent}>
      <MainSearchBar />
    </View>
  )
}
const styles = StyleSheet.create({
  sheetContent: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 16,
  },
})
