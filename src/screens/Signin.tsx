import { Center, Image, ScrollView, Text, VStack } from "native-base";

import LogoImg from '../assets/logo.png'
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthRoutesNavigatorProps } from "../routes/auth.routes";
import { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";

export function Signin () {
  const { navigate } = useNavigation<AuthRoutesNavigatorProps>()
  const { signIn, setActive, isLoaded } = useSignIn();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function cleanFields () {
    setEmail('')
    setPassword('')
  }

  function gotToRegisterScreen () {
    navigate('signup')
  }

  async function handleSignin () { 
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
      cleanFields()
    } catch (err: any) {
      console.log(err);
      cleanFields()
    }
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
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Input 
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Button
            title="Entrar"
            onPress={handleSignin}
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
            onPress={gotToRegisterScreen}
          />
          </Center>

      </VStack>
    </ScrollView>
  )
}