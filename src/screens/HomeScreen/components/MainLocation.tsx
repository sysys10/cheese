import { colors } from '@/constants/colors'
import useAnimation from '@/hooks/useAnimation'
import useDarkmode from '@/hooks/useDarkmode'
import { BottomTabParamList } from '@/navigations/BottomTabNavigator'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { useMemo } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Animated from 'react-native-reanimated'

const LocationData = [
  {
    count: 10,
    title: '강남',
    subTitle: 'Gangnam',
    image: require('@/assets/images/CHEESE_GANGNAM.png'),
  },
  {
    count: 10,
    title: '잠실',
    subTitle: 'Jamsil',
    image: require('@/assets/images/CHEESE_JAMSIL.png'),
  },
  {
    count: 10,
    title: '홍대',
    subTitle: 'Hongdae',
    image: require('@/assets/images/CHEESE_HONGDAE.png'),
  },
  {
    count: 10,
    title: '성수',
    subTitle: 'Sungsu',
    image: require('@/assets/images/CHEESE_SUNGSU.png'),
  },
]

type NavigationProp = BottomTabNavigationProp<BottomTabParamList>
export default function MainLocation(): React.JSX.Element {
  const darkMode = useDarkmode()
  const styles = useMemo(() => customStyles({ darkMode }), [])
  const { animatedStyle } = useAnimation()
  const navigation = useNavigation<NavigationProp>()
  function handleLocationPress(title: string) {
    navigation.navigate('탐색', {
      title,
    })
  }
  return (
    <View style={{ marginTop: 8, flex: 1 }}>
      <Animated.View style={[styles.titleContainer, animatedStyle]}>
        <Text style={styles.title}>지역별</Text>
        <Text style={styles.subTitle}>로 둘러보기</Text>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortButtonText}>사진관 많은 순</Text>
        </TouchableOpacity>
      </Animated.View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={LocationData}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              handleLocationPress(item.title)
            }}>
            <Animated.View style={[styles.locationContainer, animatedStyle]}>
              <Image source={item.image} style={styles.locationImage} />
              <LinearGradient
                colors={['rgba(28, 28, 28, 0.00)', '#1C1C1C']} // 투명에서 흰색으로
                start={{ x: 0, y: 0 }} // 위쪽 시작
                end={{ x: 0, y: 1 }} // 아래쪽 끝 (180도)
                locations={[0.125, 1.0]} // 12.5%와 100% 위치
                style={styles.gradientOverlay}>
                <View style={styles.locationInfo}>
                  <View style={styles.locationCount}>
                    <Text style={styles.locationCountText}>{item.count}+</Text>
                  </View>
                  <Text style={styles.locationTitle}>{item.title}</Text>
                  <Text style={styles.locationSubTitle}>{item.subTitle}</Text>
                </View>
              </LinearGradient>
            </Animated.View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.title}
      />
    </View>
  )
}
function customStyles({ darkMode }: { darkMode: boolean }) {
  const color = colors(darkMode)
  const styles = StyleSheet.create({
    locationContainer: {
      marginHorizontal: 10,
      width: 130,
      height: 140,
      overflow: 'hidden',
      position: 'relative',
      borderRadius: 20,
      backgroundColor: color.text.secondary,
      // iOS 그림자
      shadowColor: '#C8C8C8', // rgba(200, 200, 200, 1)
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3, // 0.30 opacity
      shadowRadius: 10,
      // Android 그림자
      elevation: 8,
    },
    locationImage: {
      width: 81.56,
      height: 91,
      top: 16,
      left: 35,
      position: 'absolute',
    },
    gradientOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '100%',
      justifyContent: 'flex-end',
    },
    locationInfo: {
      padding: 10,
      alignItems: 'flex-start',
    },
    locationCount: {
      backgroundColor: color.active,
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 3,
      marginBottom: 4,
    },
    locationCountText: {
      color: color.text.secondary,
      fontWeight: 'bold',
      fontSize: 12,
    },
    locationTitle: {
      fontWeight: 'bold',
      lineHeight: 20,
      fontSize: 20,
      fontFamily: 'Mulish',
      color: color.text.primary,
    },
    locationSubTitle: {
      fontWeight: 'normal',
      lineHeight: 24,
      fontSize: 14,
      fontFamily: 'Mulish',
      color: color.text.primary,
    },
    sortButton: {
      marginLeft: 10,
      backgroundColor: color.active,
      color: 'white',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    sortButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 14,
    },
    titleContainer: {
      paddingHorizontal: 23,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 14,
    },
    title: {
      fontWeight: 'bold',
      color: color.text.primary,
      lineHeight: 27.727,
      fontSize: 19.805,
      fontFamily: 'Mulish',
    },
    subTitle: {
      fontWeight: 'normal',
      lineHeight: 27.727,
      color: color.text.primary,
      fontSize: 19.805,
      fontFamily: 'Mulish',
    },
  })
  return styles
}
