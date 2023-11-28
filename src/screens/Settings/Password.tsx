import { useUser } from "@clerk/clerk-expo";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { Center, VStack, useToast } from "native-base";
import { useState } from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { PasswordDTO } from "../../dtos/password.dto";
import { AppRoutesNavigatorProps } from "../../routes/app.routes";
import { passwordValidationSchema } from "../../utils/validations/password.schema";

export function Password () {
  const [isLoading, setIsLoading] = useState(false)

  const { navigate } = useNavigation<AppRoutesNavigatorProps>()
  
  const { user } = useUser()
  const toast = useToast()

  const { control, handleSubmit, setError, formState: { errors } } = useForm<PasswordDTO>({
    resolver: yupResolver(passwordValidationSchema) as unknown as Resolver<PasswordDTO, any>
  })

  async function handleUpdatePassword (data: PasswordDTO) {
    setIsLoading(true)
    try {
      if (data.oldPassword && data.password) {
        await user?.updatePassword({
          currentPassword: data.oldPassword,
          newPassword: data.password
        })
      }
    } catch (error) {
      toast.show({
        title: 'Não foi possível mudar a senha. Tente novamente.',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  function handleGoToSettings () {
    navigate('settings')
  }

  return (
    <VStack flex={1}>
      <Header title="Trocar Senha" handleGoBack={handleGoToSettings} />
      <Center mt={4} p={10}>
        <Controller 
          control={control}
          name="oldPassword"
          render={({ field: { value, onChange } }) => (
            <Input 
            placeholder="Senha antiga"
            secureTextEntry
              value={value}
              onChangeText={onChange}
              errorMessage={errors?.oldPassword?.message}
            />
          )}
        />

        <Controller 
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <Input 
              placeholder="Nova senha"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              errorMessage={errors?.password?.message}
            />
          )}
        />

        <Controller 
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder="Confirmar senha"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              errorMessage={errors?.confirmPassword?.message}
            />
          )}
        />
      
        <Button
          mt={4} 
          title="Trocar senha" 
          onPress={handleSubmit(handleUpdatePassword)}
          isLoading={isLoading}
        />
      </Center>

    </VStack>
  )
}