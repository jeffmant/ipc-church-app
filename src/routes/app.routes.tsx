import { 
  createBottomTabNavigator, 
  BottomTabNavigationProp 
} from '@react-navigation/bottom-tabs'
import { Home } from '../screens/Home'
import { Daily } from '../screens/Daily'
import { Profile } from '../screens/Profile'
import { useTheme } from 'native-base'
import { Platform } from 'react-native'

import { House, HandsPraying, User } from 'phosphor-react-native';

type AppRoutesProps = {
  home: undefined
  daily: undefined
  profile: undefined
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
        name='daily'
        component={Daily}
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
        name='profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <User 
              color={color}
              size={iconSize}
            />
          )
        }}
      />
    </Navigator>
  )
}