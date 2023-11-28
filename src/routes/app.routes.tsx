import {
  BottomTabNavigationProp,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import { useTheme } from 'native-base'
import { Platform } from 'react-native'
import { Bible } from '../screens/Bible'
import { Home } from '../screens/Home'
import { Profile } from '../screens/Settings/Profile'

import { GearSix, HandsPraying, House } from 'phosphor-react-native'
import { Password } from '../screens/Settings/Password'
import { Settings } from '../screens/Settings/Settings'

type AppRoutesProps = {
  home: undefined
  bible: undefined
  profile: undefined
  settings: undefined
  changePassword: undefined
}

export type AppRoutesNavigatorProps = BottomTabNavigationProp<AppRoutesProps>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>()

export function AppRoutes () {
  const { sizes, colors } = useTheme()
  const iconSize = sizes[6]

  return (
    <Navigator
      screenOptions={{ 
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.blue[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: sizes[10],
          paddingTop: sizes[6]
        }
      }}
    >
      <Screen 
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <House 
              color={color}
              size={iconSize}
            />
          )
        }}
      />

      <Screen 
        name='bible'
        component={Bible}
        options={{
          tabBarIcon: ({ color }) => (
            <HandsPraying 
              color={color}
              size={iconSize}
            />
          )
        }}
      />

      <Screen 
        name='settings'
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => (
            <GearSix
              color={color}
              size={iconSize}
            />
          )
        }}
      />

      <Screen 
        name='profile'
        component={Profile}
        options={{
          tabBarButton: () => null
        }}
      />

      <Screen 
        name='changePassword'
        component={Password}
        options={{
          tabBarButton: () => null
        }}
      />
    </Navigator>
  )
}