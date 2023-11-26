import { useClerk, useUser } from "@clerk/clerk-expo";
import { yupResolver } from "@hookform/resolvers/yup";

import * as ImagePicker from 'expo-image-picker';

import { Avatar, Center, Link, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";
import { useState } from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

import { ProfileDTO } from "../dtos/profile.dto";
import { profileValidationSchema } from "../utils/validations/profile.schema";

export function Profile () {
  const { user } = useUser()
  const { signOut } = useClerk();

  const { control, handleSubmit, setError, formState: { errors } } = useForm<ProfileDTO>({
    defaultValues: {
      name: user?.fullName || '',
      email: user?.primaryEmailAddress?.emailAddress,
    },
    resolver: yupResolver(profileValidationSchema) as unknown as Resolver<ProfileDTO, any>
  })

  const toast = useToast()

  const [isLoading, setIsLoading] = useState(false)

  const [avatarIsLoading, setAvatarIsLoading] = useState(false)

  async function handleLogout () {
    await signOut()
  }

  async function uploadImage () {
    setAvatarIsLoading(true)
    try {
      const response = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
        base64: true
      });
  
      const uploadedImage = response?.assets?.[0]
  
      if (uploadedImage?.base64) {
        await user?.setProfileImage({
          file: 'data:image/jpeg;base64,' + uploadedImage.base64 
        })

        toast.show({
          title: 'Foto atualizada!',
          placement: 'top',
          bgColor: 'green.500'
        })
      }
    } catch (error: any) {
      toast.show({
        title: 'Não foi possível trocar foto. Tente novamente.',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setAvatarIsLoading(false)
    }
  };

  async function handleUpdate (data: ProfileDTO) {
    setIsLoading(true)
    try {
      if (data.name && data.name !== user?.fullName) {
        await user?.update({
          firstName: data.name.split(' ')[0],
          lastName: data.name.split(' ')[1] || ''
        })
      }

      if (data.oldPassword && data.password) {
        await user?.updatePassword({
          currentPassword: data.oldPassword,
          newPassword: data.password
        })
      }

      toast.show({
        title: 'Perfil atualizado!',
        placement: 'top',
        bgColor: 'green.500'
      })
    } catch (error: any) {
      toast.show({
        title: 'Não foi possível atualizar. Tente novamente.',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} _contentContainerStyle={{ paddingBottom: 10 }}>
      <VStack px={10}>
        <Center mt={16}>
          {
            avatarIsLoading ? (
              <>
                <Skeleton size="32" rounded="full" />
                <Text
                  fontFamily="body"
                  color="gray.100"
                  mt={2}
                >
                  Carregando...
                </Text>
              </>
            ) :
            (
              <>
                <TouchableOpacity onPress={uploadImage}>
                  <Avatar 
                    source={{
                      uri: user?.imageUrl
                    }}
                    size={"2xl"}
                  />
                </TouchableOpacity>
                <Link onPress={uploadImage}>
                  <Text
                    fontFamily="body"
                    color="gray.100"
                    mt={2}
                  >
                    Trocar Foto
                  </Text>
                </Link>
              </>       
            )
          }
        </Center>

        <Center mt={8}>
          <Controller 
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input 
                placeholder="Nome"
                autoCapitalize="words"
                value={value}
                onChangeText={onChange}
                errorMessage={errors?.name?.message}
              />
            )}
          />

          <Controller 
            control={control}
            name="email"
            render={({ field: { value } }) => (
              <Input 
                placeholder="Email"
                value={value}
                isDisabled
              />
            )}
          />
        </Center>

        <Center mt={4}>
          <Text
            color="gray.100"
            fontFamily="body"
            fontSize="md"
            alignSelf="flex-start"
            mb={4}
          >
            Alterar senha
          </Text>

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

        </Center>

        <Button 
          mt={4} 
          title="Atualizar" 
          onPress={handleSubmit(handleUpdate)}
          isLoading={isLoading}
        />
        <Button 
          mt={2} 
          variant={"outline"} 
          title={"Sair"}
          onPress={handleLogout} 
        />
      </VStack>
    </ScrollView>
  )
}