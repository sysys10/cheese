import { useAnimatedStyle } from 'react-native-reanimated'

import { withDelay } from 'react-native-reanimated'

import { useEffect } from 'react'
import { withTiming } from 'react-native-reanimated'

import { useSharedValue } from 'react-native-reanimated'

export default function useAnimation() {
  const translateY = useSharedValue(50)
  const opacity = useSharedValue(0)

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 800 })
    opacity.value = withTiming(1, { duration: 800 })
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    }
  })
  return {
    animatedStyle,
  }
}
