import { Center, NativeBaseProvider, Text } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loading } from './src/components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <NativeBaseProvider>
      {
        fontsLoaded ? 
          <Text 
            color="gray.700" 
            fontFamily="heading"
          >
            Hello World
          </Text>
        :  
        <Loading /> 
      }
    </NativeBaseProvider>
  );
}
