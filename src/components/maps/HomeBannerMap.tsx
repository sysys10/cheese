import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Region, Marker } from 'react-native-maps'

interface MarkerData {
  id: string
  coordinate: {
    latitude: number
    longitude: number
  }
  title: string
  description: string
}

const GoogleMapsScreen = () => {
  const [region, setRegion] = useState<Region>({
    latitude: 37.5326,
    longitude: 127.024612,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  })

  const [markers, setMarkers] = useState<MarkerData[]>([])

  const handleMapPress = (event: any) => {
    const { coordinate } = event.nativeEvent
    const newMarker: MarkerData = {
      id: Date.now().toString(),
      coordinate,
      title: '새 마커',
      description: `위도: ${coordinate.latitude.toFixed(
        6,
      )}, 경도: ${coordinate.longitude.toFixed(6)}`,
    }
    setMarkers(prev => [...prev, newMarker])
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map} // styles -> style로 수정
        initialRegion={region}
        provider={PROVIDER_GOOGLE}
        onPress={handleMapPress}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapType="standard"
        onMapReady={() => console.log('Map is ready')} // 디버깅용
      ></MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

export default GoogleMapsScreen
