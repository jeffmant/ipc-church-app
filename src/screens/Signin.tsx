import { Center, Image, ScrollView, Text, VStack } from "native-base";

import LogoImg from '../assets/logo.png'
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Signin () {
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
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input 
            placeholder="Senha"
            secureTextEntry
          />

          <Button
            title="Entrar"
          />
        </Center>

        <Center mt={24} mb={8}>
          <Text
            color="gray.100"
            fontSize="sm"
            mb={3}
            fontFamily="body"
          >
            Ainda não tem acesso?
          </Text>
          <Button 
            title="Criar conta"
            variant="outline"
          />
          </Center>

      </VStack>
    </ScrollView>
  )
}