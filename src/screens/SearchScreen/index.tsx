import GoogleMapsScreen from '@/components/maps/HomeBannerMap'
import { View, Text } from 'react-native'

export default function SearchScreen(): React.JSX.Element {
  return (
    <View style={{ flex: 1 }}>
      <GoogleMapsScreen />
    </View>
  )
}
