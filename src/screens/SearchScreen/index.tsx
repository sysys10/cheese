import GoogleMapsScreen from '@/components/maps/HomeBannerMap'
import { BottomTabParamList } from '@/navigations/BottomTabNavigator'
import { RouteProp, useRoute } from '@react-navigation/native'
import { View } from 'react-native'
import CheeseHeader from '@/components/layout/Header'
import CheeseBanner from './components/SearchBanner'
import LinearGradient from 'react-native-linear-gradient'
import { useMemo, useRef, useState } from 'react'
import SearchBottomSheet from './components/SearchBottomSheet'

type SearchScreenRouteProp = RouteProp<BottomTabParamList, '탐색'>

export default function SearchScreen(): React.JSX.Element {
  const route = useRoute<SearchScreenRouteProp>()
  const title = route.params?.title
  const [bottomSheetIndex, setBottomSheetIndex] = useState(0)

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            position: 'absolute',
            inset: 0,
          }}>
          <GoogleMapsScreen />
          <LinearGradient
            colors={['rgba(45, 45, 45, 0.95)', 'rgba(0, 0, 0, 0.10)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 0.5 }}
            style={{ position: 'absolute', inset: 0 }}></LinearGradient>
        </View>
        <CheeseHeader />
        <CheeseBanner title={title} isBottomSheetUp={bottomSheetIndex === 1} />
      </View>
      <View style={{ position: 'absolute', inset: 0 }}>
        <SearchBottomSheet
          bottomSheetIndex={bottomSheetIndex}
          onChange={setBottomSheetIndex}
        />
      </View>
    </View>
  )
}
