import { ScrollView, View } from 'react-native'
import MainBanner from './components/MainBanner'
import MainSearchBar from './components/MainSearchBar'
import MainLocation from './components/MainLocation'
import MainRecommend from './components/MainRecommend'
import useDarkmode from '@/hooks/useDarkmode'
export default function HomeScreen(): React.JSX.Element {
  const isDarkMode = useDarkmode()
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: isDarkMode ? '#2D2D2D' : '#FBFBFB' }}>
      <MainBanner />
      <View style={{ paddingHorizontal: 12 }}>
        <MainSearchBar />
      </View>
      <MainLocation />
      <MainRecommend />
    </ScrollView>
  )
}
