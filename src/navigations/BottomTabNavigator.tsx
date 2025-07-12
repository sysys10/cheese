import HomeScreen from '@/screens/HomeScreen'
import PhotoBookScreen from '@/screens/PhotoBookScreen'
import PhotoScreen from '@/screens/PhotoScreen'
import RecommendScreen from '@/screens/RecommendScreen'
import SearchScreen from '@/screens/SearchScreen'
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import HomeIcon from '@/assets/icons/CHEESE_HOME.svg'
import SearchIcon from '@/assets/icons/CHEESE_CATALOG.svg'
import PhotoIcon from '@/assets/icons/CHEESE_PHOTO.svg'
import RecommendIcon from '@/assets/icons/CHEESE_LIKE.svg'
import PhotoBookIcon from '@/assets/icons/CHEESE_UNION.svg'
import { colors } from '@/constants/colors'
import { TouchableOpacity, View } from 'react-native'
import useDarkmode from '@/hooks/useDarkmode'

const BOTTOM_TAB_CONSTANTS = {
  HomeScreen: '홈',
  SearchScreen: '탐색',
  PhotoScreen: '사진',
  RecommendScreen: '추천',
  PhotoBookScreen: '사진첩',
} as const

export type BottomTabParamList = {
  [BOTTOM_TAB_CONSTANTS.HomeScreen]: undefined
  [BOTTOM_TAB_CONSTANTS.SearchScreen]: { title: string } | undefined // 파라미터 추가
  [BOTTOM_TAB_CONSTANTS.PhotoScreen]: undefined
  [BOTTOM_TAB_CONSTANTS.RecommendScreen]: undefined
  [BOTTOM_TAB_CONSTANTS.PhotoBookScreen]: undefined
}

const Tab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  const isDarkMode = useDarkmode()
  const color = colors(isDarkMode)
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 90,
          paddingTop: 10,
          backgroundColor: color.bottomTabBackground,
        },
        tabBarLabelStyle: {
          color: '#888888',
          marginTop: 1,
          fontSize: 11,
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen
        name={BOTTOM_TAB_CONSTANTS.HomeScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <HomeIcon color={color.active} />
            ) : (
              <HomeIcon color={color.secondary} />
            ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name={BOTTOM_TAB_CONSTANTS.SearchScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SearchIcon color={color.active} />
            ) : (
              <SearchIcon color={color.secondary} />
            ),
        }}
        component={SearchScreen}
      />
      <Tab.Screen
        name={BOTTOM_TAB_CONSTANTS.PhotoScreen}
        options={{
          tabBarButton: (props: any) => (
            <View
              style={{
                top: -30,
                borderRadius: '100%',
                width: 74,
                height: 74,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: color.bottomTabBackground,
              }}>
              <TouchableOpacity
                {...props}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{ position: 'relative' }}>
                  <PhotoIcon width={70} height={70} fill="white" />
                </View>
              </TouchableOpacity>
            </View>
          ),
        }}
        component={PhotoScreen}
      />
      <Tab.Screen
        name={BOTTOM_TAB_CONSTANTS.RecommendScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <RecommendIcon color={color.active} />
            ) : (
              <RecommendIcon color={color.secondary} />
            ),
        }}
        component={RecommendScreen}
      />
      <Tab.Screen
        name={BOTTOM_TAB_CONSTANTS.PhotoBookScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <PhotoBookIcon color={color.active} />
            ) : (
              <PhotoBookIcon color={color.secondary} />
            ),
        }}
        component={PhotoBookScreen}
      />
    </Tab.Navigator>
  )
}
