import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Signin } from '../screens/Signin'
import { Signup } from '../screens/Signup'

type AuthRoutesProps = {
  signin: undefined
  signup: undefined
}

export type AuthRoutesNavigatorProps = NativeStackNavigationProp<AuthRoutesProps>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesProps>()

export function AuthRoutes () { 
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name='signin'
        component={Signin}
      />

      <Screen 
        name='signup'
        component={Signup}
      />
    </Navigator>

  )
}