import { View, Image, StyleSheet } from 'react-native'
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated'
import LinearGradient from 'react-native-linear-gradient'

import { useEffect } from 'react'
import { fonts } from '@/constants/fonts'
import { colors } from '@/constants/colors'
import useDarkmode from '@/hooks/useDarkmode'
import CheeseHeader from '@/components/layout/Header'

export default function MainBanner(): React.JSX.Element {
  const safeAreaInsets = useSafeAreaInsets()

  const titleTranslateY = useSharedValue(50)
  const titleOpacity = useSharedValue(0)
  const subTitleTranslateY = useSharedValue(50)
  const subTitleOpacity = useSharedValue(0)

  useEffect(() => {
    titleTranslateY.value = withTiming(0, { duration: 800 })
    titleOpacity.value = withTiming(1, { duration: 800 })

    subTitleTranslateY.value = withDelay(200, withTiming(0, { duration: 800 }))
    subTitleOpacity.value = withDelay(200, withTiming(1, { duration: 800 }))
  }, [])

  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: titleTranslateY.value }],
      opacity: titleOpacity.value,
    }
  })

  const subTitleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: subTitleTranslateY.value }],
      opacity: subTitleOpacity.value,
    }
  })
  const isDarkMode = useDarkmode()
  const styles = customStyles(safeAreaInsets, isDarkMode)
  const color = colors(isDarkMode)
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('@/assets/images/CHEESE_BG_1.png')}
      />
      <CheeseHeader />
      {/* <HomeBannerMap /> */}
      <View style={styles.textContainer}>
        <Animated.Text style={[styles.title, titleAnimatedStyle]}>
          내 주변
        </Animated.Text>
        <Animated.Text style={[styles.subTitle, subTitleAnimatedStyle]}>
          네컷사진관 찾기
        </Animated.Text>
      </View>
      <LinearGradient
        colors={['rgba(45, 45, 45, 0.95)', 'rgba(0, 0, 0, 0.10)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.5 }}
        style={{ position: 'absolute', inset: 0 }}></LinearGradient>
    </View>
  )
}
function customStyles(safeAreaInsets: EdgeInsets, isDarkMode: boolean) {
  const color = colors(isDarkMode)
  return StyleSheet.create({
    title: {
      fontSize: 40,
      color: color.text.primary,
      fontFamily: fonts.gmarket.bold,
      fontWeight: 'bold',
      lineHeight: 56,
      letterSpacing: -2,
    },
    subTitle: {
      fontSize: 25,
      color: color.text.primary,
      fontFamily: fonts.gmarket.medium,
      fontWeight: '400',
      fontStyle: 'normal',
      lineHeight: 35,
      letterSpacing: -1.25,
    },
    imageContainer: {
      width: '100%',
      flexShrink: 0,
      aspectRatio: 402 / 301,
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    logo: {
      position: 'absolute',
      top: safeAreaInsets.top + 10,
      left: 28,
    },
    user: {
      position: 'absolute',
      top: safeAreaInsets.top + 10,
      right: 28,
    },
    textContainer: {
      position: 'absolute',
      bottom: 30,
      left: 37,
    },
  })
}
