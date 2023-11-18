import { Center, NativeBaseProvider, Text } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <NativeBaseProvider>
      <Center>
        {
          fontsLoaded && <Text color="gray.700" fontFamily="heading">Hello World</Text> 
        }
      </Center>
    </NativeBaseProvider>
  );
}
