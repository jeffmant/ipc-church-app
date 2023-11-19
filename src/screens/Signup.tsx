import { Center, Image, ScrollView, Text, VStack } from "native-base";

import LogoImg from '../assets/logo.png'
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthRoutesNavigatorProps } from "../routes/auth.routes";
import { useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { Loading } from "../components/Loading";
import { Alert } from "react-native";

export function Signup () {
  const { navigate } = useNavigation<AuthRoutesNavigatorProps>()
  const { isLoaded, signUp, setActive } = useSignUp();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')

  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName: name.split(' ')[0],
        lastName: name.split(' ')[1] || '',
        emailAddress: email,
        username: email.split('@')[0],
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
        Alert.alert(err.message || "Algo deu errado. Tente novamente!")
    } finally {
      setIsLoading(false)
    }
  }

  const onPressVerify = async () => {
    setIsLoading(true)
    if (!isLoaded) {
      return;
    }
 
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (!completeSignUp.createdSessionId) {
        throw new Error("Código inválido")
      }
 
      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      Alert.alert(err.message || "Algo deu errado. Tente novamente!")
      navigate('signup')
    } finally {
      cleanFields()
      setIsLoading(false)
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
                  autoCapitalize="words"
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
                  title={isLoading ? <Loading /> : "Cadastrar"}
                  onPress={handleSignup}
                  disabled={!(name && email && password) || isLoading}
                />
              </>
            ) : (
              <>
              <Text
                color="gray.100"
                fontFamily="body"
                mb={4}
                fontSize="md"
              >
                Enviamos um código no seu email. {"\n"}
                Por gentileza, insira-o aqui:
              </Text>

                <Input 
                  placeholder="Código"
                  keyboardType="numeric"
                  value={code}
                  onChangeText={setCode}
                />

                <Button
                  title={ isLoading ? <Loading /> : "Confirmar" }
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