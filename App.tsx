import { Center, NativeBaseProvider, StatusBar, Text } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loading } from './src/components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <NativeBaseProvider>
      <StatusBar 
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
      />

      {
        fontsLoaded ?
          <Center flex={1}>
            <Text 
              color="gray.700" 
              fontFamily="heading"
            >
              Hello World
            </Text>
          </Center>
        :  
        <Loading /> 
      }
    </NativeBaseProvider>
  );
}
