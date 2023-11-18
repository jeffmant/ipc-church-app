import { Center, Image, ScrollView, Text, VStack } from "native-base";

import LogoImg from '../assets/logo.png'
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthRoutesNavigatorProps } from "../routes/auth.routes";

export function Signup () {
  const { navigate } = useNavigation<AuthRoutesNavigatorProps>()

  function gotToLoginScreen () {
    navigate('signin')
  }

  return (
    <ScrollView 
      contentContainerStyle={{ 
        flexGrow: 1 
      }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} bg="gray.700" px={10}>
        <Center>
          <Image 
            source={LogoImg}
            defaultSource={LogoImg}
            alt="IPC logo"
            w={64}
            resizeMode="contain" 
            mt={24}
          />
        </Center>

        <Center>
          <Input 
            placeholder="Seu nome"
          />

          <Input 
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input 
            placeholder="Senha"
            secureTextEntry
          />

          <Button
            title="Cadastrar"
          />
        </Center>

        <Center mt={16} mb={8}>
          <Button 
            title="Voltar para login"
            variant="outline"
            onPress={gotToLoginScreen}
          />
          </Center>

      </VStack>
    </ScrollView>
  )
}