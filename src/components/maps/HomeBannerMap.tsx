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
    latitudeDelta: 0.06,
    longitudeDelta: 0.06,
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
        customMapStyle={[
          {
            featureType: 'all',
            elementType: 'all',
            stylers: [{ visibility: 'on' }],
          },
          {
            featureType: 'all',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }, { saturation: '-100' }],
          },
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [
              { saturation: 36 },
              { color: '#000000' },
              { lightness: 40 },
              { visibility: 'off' },
            ],
          },
          {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [
              { visibility: 'off' },
              { color: '#000000' },
              { lightness: 16 },
            ],
          },
          {
            featureType: 'all',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'administrative',
            elementType: 'geometry.fill',
            stylers: [{ color: '#535353' }, { lightness: 20 }],
          },
          {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#000000' }, { lightness: 17 }, { weight: 1.2 }],
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ color: '#000000' }, { lightness: 20 }],
          },
          {
            featureType: 'landscape',
            elementType: 'geometry.fill',
            stylers: [{ color: '#393939' }],
          },
          {
            featureType: 'landscape',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#4d6059' }],
          },
          {
            featureType: 'landscape.natural',
            elementType: 'geometry.fill',
            stylers: [{ color: '#434343' }],
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{ lightness: 21 }],
          },
          {
            featureType: 'poi',
            elementType: 'geometry.fill',
            stylers: [{ color: '#5a4f45' }],
          },
          {
            featureType: 'poi',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#4d6059' }],
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ visibility: 'on' }, { color: '#7f8d89' }],
          },
          {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [{ color: '#af8227' }, { visibility: 'on' }],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [{ color: '#f08809' }, { lightness: 17 }],
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#7f8d89' }, { lightness: 29 }, { weight: 0.2 }],
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{ color: '#f08809' }, { lightness: 18 }],
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry.fill',
            stylers: [{ color: '#c88b3f' }],
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#7f8d89' }],
          },
          {
            featureType: 'road.local',
            elementType: 'geometry',
            stylers: [{ color: '#000000' }, { lightness: 16 }],
          },
          {
            featureType: 'road.local',
            elementType: 'geometry.fill',
            stylers: [{ color: '#6e6a65' }],
          },
          {
            featureType: 'road.local',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#7f8d89' }],
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#000000' }, { lightness: 19 }],
          },
          {
            featureType: 'water',
            elementType: 'all',
            stylers: [{ color: '#2b3638' }, { visibility: 'on' }],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#2b3638' }, { lightness: 17 }],
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{ color: '#24282b' }],
          },
          {
            featureType: 'water',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#24282b' }],
          },
          {
            featureType: 'water',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'water',
            elementType: 'labels.text',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'water',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }],
          },
        ]}
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
  mapHeader: {},
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

export default GoogleMapsScreen
