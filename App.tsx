import { NativeBaseProvider, StatusBar, Text } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loading } from './src/components/Loading';
import { ClerkProvider } from "@clerk/clerk-expo";
import Constants from "expo-constants"
import { Routes } from './src/routes';



export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <NativeBaseProvider>
      <StatusBar  
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />

      { fontsLoaded ? <Routes /> : <Loading /> }
      
    </NativeBaseProvider>
  );
}
