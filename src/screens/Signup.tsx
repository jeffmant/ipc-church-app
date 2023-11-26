import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { Center, Image, ScrollView, Text, VStack, useToast } from "native-base";
import { Controller, FieldError, useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

import LogoImg from '../assets/logo.png';

import { SignupDTO } from "../dtos/signup.dto";

import { AuthRoutesNavigatorProps } from "../routes/auth.routes";
import { signupValidationSchema } from "../utils/validations/signup.schema";

export function Signup () {
  const { navigate } = useNavigation<AuthRoutesNavigatorProps>()
  const { isLoaded, signUp, setActive } = useSignUp();

  const toast = useToast()

  const { control, handleSubmit, reset, formState: { errors }, setError } = useForm<SignupDTO>({
    defaultValues: {},
    resolver: yupResolver(signupValidationSchema)
  })

  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  function gotToLoginScreen () {
    navigate('signin')
  }

  async function handleSignup (data: SignupDTO) {
    setIsLoading(true)
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName: data.name.split(' ')[0],
        lastName: data.name.split(' ')[1] || '',
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (error: any) {
      if (isClerkAPIResponseError(error)) {
        for (const err of error.errors) {
          if (err.meta?.paramName) {
            setError((
              err.meta.paramName === 'email_address' ? 
              "email" : 
              err.meta.paramName
            ) as keyof SignupDTO, { 
              message: err.message 
            } as FieldError)
          }
        }
      }
      toast.show({
        title: 'Algo deu errado. Tente novamente!',
        placement: 'top',
        bgColor: 'red.500'
      })
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
      const { createdSessionId } = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (!createdSessionId) {
        throw new Error("Código inválido")
      }
      
      await setActive({ session: createdSessionId });

    } catch (error: any) {
      toast.show({
        title: 'Algo deu errado. Tente novamente!',
        placement: 'top',
        bgColor: 'red.500'
      })
      navigate('signup')
    } finally {
      setCode('')
      setPendingVerification(false)
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
            mt={4}
          />
        </Center>

        <Center>
          {
            !pendingVerification ? (
              <>
                <Controller 
                  control={control}
                  name="name"
                  render={({ field: { value, onChange } }) => (
                    <Input 
                      placeholder="Seu nome"
                      value={value}
                      onChangeText={onChange}
                      autoCapitalize="words"
                      errorMessage={errors.name?.message}
                    />
                  )}
                />

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
                      errorMessage={errors.email?.message}
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
                      errorMessage={errors.password?.message}
                    />
                  )}
                />

                <Controller 
                  control={control}
                  name="confirmPassword"
                  render={({ field: { value, onChange } }) => (
                    <Input 
                      placeholder="Confirme a senha"
                      secureTextEntry
                      value={value}
                      onChangeText={onChange}
                      errorMessage={errors.confirmPassword?.message}
                    />
                  )}
                />
      
                <Button
                  title="Cadastrar"
                  onPress={handleSubmit(handleSignup)}
                  isLoading={isLoading}
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
                  title="Confirmar"
                  onPress={onPressVerify}
                  isLoading={isLoading}
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