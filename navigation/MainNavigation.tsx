import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import TournamentsScreen from '../screens/application/TournamentsScreen'
import LaunchScreen from '../screens/launch/LaunchScreen'
import TournamentScreen from '../screens/application/TournamentScreen'
import ArchivedTournamentsScreen from '../screens/application/ArchivedTournamentsScreen'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

export default function MainNavigation() {
  function TabBar({ state, navigation }: any) {
    const bottomTabData = [
      {
        title: 'Team',
        iconActive: 'information-circle',
        iconInactive: 'information-circle-outline',
        action: () => {
          navigation.navigate('InformationNavigation', {
            screen: 'InformationScreen',
            initial: false,
          })
        },
      },
      {
        title: 'Rating',
        iconActive: 'stats-chart',
        iconInactive: 'stats-chart-outline',
        action: () => {
          navigation.navigate('RatingNavigation', {
            screen: 'RatingScreen',
            initial: false,
          })
        },
      },
      {
        title: 'Tournaments',
        iconActive: 'grid',
        iconInactive: 'grid-outline',
        action: () => {
          navigation.navigate('TournamentsNavigation', {
            screen: 'TournamentsScreen',
            initial: false,
          })
        },
      },
    ]

    return (
      <View
        style={{
          flexDirection: 'row',
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          elevation: 5,
          borderTopWidth: 1,
          borderColor: '#eee',
        }}
      >
        {bottomTabData.map((item: any, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              item.action()
            }}
            activeOpacity={0.8}
            style={{
              width: '33%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              height: '100%',
            }}
          >
            {state.index === index ? (
              <Ionicons name={item.iconActive} size={24} color={'#000'} />
            ) : (
              <Ionicons name={item.iconInactive} size={24} color={'#000'} />
            )}
            <Text>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  function TournamentsNavigation() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="TournamentsScreen"
          component={TournamentsScreen}
        />
      </Stack.Navigator>
    )
  }

  function NavigationApp() {
    return (
      <Tab.Navigator tabBar={(props: any) => <TabBar {...props} />}>
        <Tab.Screen
          name="TournamentsNavigation"
          component={TournamentsNavigation}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    )
  }

  const navigationLogIn = (
    <Stack.Navigator initialRouteName="LaunchScreen">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="LaunchScreen"
        component={LaunchScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
        }}
        name="NavigationApp"
        component={NavigationApp}
      />
      {/* other screens then must apear without bottom tab navigation */}
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="TournamentScreen"
        component={TournamentScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ArchivedTournamentsScreen"
        component={ArchivedTournamentsScreen}
      />
    </Stack.Navigator>
  )

  return <>{navigationLogIn}</>
}
