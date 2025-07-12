import BottomSheet from '@gorhom/bottom-sheet'
import { useMemo, useRef } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import MainSearchBar from '@/screens/HomeScreen/components/MainSearchBar'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SearchBottomSheet() {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['50%', '90%'], [])

  return (
    <View style={{ flex: 1 }}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: 'white' }}
        handleIndicatorStyle={{ backgroundColor: '#ccc' }}>
        <View style={styles.sheetContent}>
          <View style={styles.floatingView} />
          <MainSearchBar />
        </View>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  sheetContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    position: 'relative',
  },
  floatingView: {
    position: 'absolute',
    top: -50,
    backgroundColor: 'red',
    width: '100%',
    height: 40,
  },
})
