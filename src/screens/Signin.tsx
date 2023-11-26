import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { Center, Image, ScrollView, Text, VStack, useToast } from "native-base";
import { Controller, FieldError, useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

import LogoImg from '../assets/logo.png';

import { SigninDTO } from "../dtos/signin.dto";
import { AuthRoutesNavigatorProps } from "../routes/auth.routes";
import { signinValidationSchema } from "../utils/validations/singin.schema";

export function Signin () {
  const { navigate } = useNavigation<AuthRoutesNavigatorProps>()
  const { signIn, setActive, isLoaded } = useSignIn();

  const toast = useToast()

  const { control, handleSubmit, setError, formState: { errors } } = useForm<SigninDTO>({
    resolver: yupResolver(signinValidationSchema)
  })

  const [isLoading, setIsLoading] = useState(false)

  function gotToRegisterScreen () {
    navigate('signup')
  }

  async function handleSignin ({ email, password }: SigninDTO) { 
    setIsLoading(true)
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (error: any) {
      if (isClerkAPIResponseError(error)) {
        for (const err of error.errors) {
          if (err.meta?.paramName) {
            setError((
              err.meta.paramName === 'email_address' ? 
              "email" : 
              err.meta.paramName
            ) as keyof SigninDTO, { 
              message: err.message 
            } as FieldError)
          }
        }
      }
      toast.show({
        description: error.message || "Algo deu errado. Tente novamente!",
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
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
          <Controller 
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input 
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                errorMessage={errors?.email?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <Input 
                placeholder="Senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors?.password?.message}
              />
            )}
          />

          <Button
            title="Entrar"
            onPress={handleSubmit(handleSignin)}
            isLoading={isLoading}
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