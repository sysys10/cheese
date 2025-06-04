import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomTabNavigator from './navigations/BottomTabNavigator'
import { NavigationContainer } from '@react-navigation/native'

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App
