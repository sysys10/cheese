import { colors } from '@/constants/colors'
import useDarkmode from '@/hooks/useDarkmode'
import { useEffect } from 'react'
import {
  FlatList,
  Image,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated'
import SearchIcon from '@/assets/icons/CHEESE_SEARCH.svg'
const MainSliderItem = [
  {
    image: require('@/assets/images/temp1.png'),
  },
  {
    image: require('@/assets/images/temp2.png'),
  },
]

const { width: screenWidth } = Dimensions.get('window')

export default function MainSearchBar(): React.JSX.Element {
  const translateY = useSharedValue(20)
  const opacity = useSharedValue(0)

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 1000 })
    opacity.value = withTiming(1, { duration: 1000 })
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    }
  })
  const isDarkMode = useDarkmode()
  const color = colors(isDarkMode)

  return (
    <View
      style={{
        marginTop: 14,
        width: '100%',
        height: 36,
      }}>
      <Animated.View
        style={[
          animatedStyle,
          {
            width: '100%',
            height: 42,
            borderRadius: 20,
            borderColor: color.active,
            borderWidth: 2.5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 20,
            paddingRight: 10,
            backgroundColor: 'white',
          },
        ]}>
        <SearchIcon
          width={20}
          height={20}
          color={'rgba(0, 0, 0, 0.60)'}
          style={{ flexShrink: 0 }}
        />
        <TextInput
          style={{
            paddingLeft: 10,
            height: '100%',
            flexGrow: 1,
          }}
          placeholder="Search"
          placeholderTextColor={color.text.secondary}></TextInput>
        <TouchableOpacity
          style={{
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 20,
            backgroundColor: color.active,
          }}>
          <Text
            style={{
              color: color.text.primary,
              fontSize: 12,
              fontWeight: 'bold',
            }}>
            잠실
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}
