import GoogleMapsScreen from '@/components/maps/HomeBannerMap'
import { BottomTabParamList } from '@/navigations/BottomTabNavigator'
import { RouteProp, useRoute } from '@react-navigation/native'
import { View } from 'react-native'
import MainSearchBar from '../HomeScreen/components/MainSearchBar'
import CheeseHeader from '@/components/layout/Header'
import CheeseBanner from './components/SearchBanner'
import LinearGradient from 'react-native-linear-gradient'
import BottomSheet from '@gorhom/bottom-sheet'
import { useMemo, useRef } from 'react'
import SearchBottomSheet from './components/SearchBottomSheet'

type SearchScreenRouteProp = RouteProp<BottomTabParamList, '탐색'>

export default function SearchScreen(): React.JSX.Element {
  const route = useRoute<SearchScreenRouteProp>()
  const title = route.params?.title

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          maxHeight: '60%',
          height: '100%',
          width: '100%',
          position: 'relative',
        }}>
        <View
          style={{
            position: 'absolute',
            inset: 0,
          }}>
          <GoogleMapsScreen />
          <LinearGradient
            colors={['rgba(45, 45, 45, 0.95)', 'rgba(0, 0, 0, 0.10)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ position: 'absolute', inset: 0 }}></LinearGradient>
        </View>
        <CheeseHeader />
        <CheeseBanner title={title} />
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <SearchBottomSheet />
      </View>
    </View>
  )
}
