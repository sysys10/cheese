import { colors } from '@/constants/colors'
import { fonts } from '@/constants/fonts'
import useDarkmode from '@/hooks/useDarkmode'
import { useState, useEffect, useCallback } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native'

const AVAILABLE_LOCATION = ['잠실', '강남', '성수', '홍대']

interface CheeseBannerProps {
  title?: string
  isBottomSheetUp?: boolean
}
export default function CheeseBanner({
  title,
  isBottomSheetUp = false,
}: CheeseBannerProps) {
  const isDarkMode = useDarkmode()
  const [activatedPlace, setActivatedPlace] = useState(title)
  useFocusEffect(
    useCallback(() => {
      setActivatedPlace(title) // 선택된 장소 등록

      return () => {}
    }, [title]),
  )
  const styles = customStyles(isDarkMode, isBottomSheetUp)
  return (
    <View style={styles.container}>
      {AVAILABLE_LOCATION.map(v => (
        <TouchableOpacity
          key={v}
          onPress={() => {
            setActivatedPlace(v)
          }}>
          <Text
            style={[styles.text, activatedPlace === v && styles.activatedText]}>
            {v}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

function customStyles(isDarkMode: boolean, isBottomSheetUp: boolean) {
  const color = colors(isDarkMode)
  const safeAreaInsets = useSafeAreaInsets()

  return StyleSheet.create({
    text: {
      color: color.text.ghost,
      fontFamily: fonts.gmarket.bold,
      fontSize: isBottomSheetUp ? 24 : 30,
    },
    activatedText: {
      color: color.text.primary,
      fontFamily: fonts.gmarket.bold,
      fontSize: isBottomSheetUp ? 32 : 40,
    },
    container: {
      position: 'absolute',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '8',
      left: 0,
      right: 0,
      paddingLeft: 12,
      top: isBottomSheetUp ? safeAreaInsets.top + 50 : safeAreaInsets.top + 80,
    },
  })
}
