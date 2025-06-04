import React, { useState } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

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
  const [region, setRegion] = useState({
    latitude: 37.5326,
    longitude: 127.024612,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  })

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
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={handleMapPress}
      showsUserLocation={true}
      showsMyLocationButton={true}
      provider={PROVIDER_GOOGLE}
      mapType="standard"
    />
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    aspectRatio: 402 / 311,
    overflow: 'hidden',
  },
})

export default GoogleMapsScreen
