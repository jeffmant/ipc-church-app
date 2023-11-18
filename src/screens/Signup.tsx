import { Center, Image, ScrollView, VStack } from "native-base";

import LogoImg from '../assets/logo.png'
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthRoutesNavigatorProps } from "../routes/auth.routes";
import { useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";

export function Signup () {
  const { navigate } = useNavigation<AuthRoutesNavigatorProps>()
  const { isLoaded, signUp, setActive } = useSignUp();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')

  function cleanFields () {
    setName('')
    setEmail('')
    setPassword('')
    setCode('')
    setPendingVerification(false)
  }

  function gotToLoginScreen () {
    navigate('signin')
  }

  async function handleSignup () {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName: name.split('')[0],
        lastName: name.split('')[1] || '',
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
        console.error(JSON.stringify(err, null, 2));
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
 
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
 
      await setActive({ session: completeSignUp.createdSessionId });
      cleanFields()
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      cleanFields()
      navigate('signup')
    }
  };

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
          {
            !pendingVerification ? (
              <>
                <Input 
                  placeholder="Seu nome"
                  value={name}
                  onChangeText={setName}
                />
    
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
                  title="Cadastrar"
                  onPress={handleSignup}
                  disabled={!(name && email && password)}
                />
              </>
            ) : (
              <>
                <Input 
                placeholder="Código"
                keyboardType="numeric"
                onChangeText={setCode}
                />

                <Button
                  title="Confirmar"
                  onPress={onPressVerify}
                />
              </>
            )
          } 
        </Center>

        {
          !pendingVerification && ( 
            <Center mt={16} mb={8}>
              <Button 
                title="Voltar para login"
                variant="outline"
                onPress={gotToLoginScreen}
              />
            </Center>
          )
        }

      </VStack>
    </ScrollView>
  )
}