import { Avatar, Center, Link, Skeleton, Text, VStack } from "native-base";
import { Input } from "../components/Input";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
import * as ImagePicker from 'expo-image-picker';
import { Alert, TouchableOpacity } from "react-native";


export function Profile () {
  const { user, isLoaded, isSignedIn } = useUser()
  const { signOut } = useClerk();

  const [name, setName] = useState(user?.fullName || '')
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || '')

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

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

        Alert.alert("Foto atualizada!")
      }
    } catch (error: any) {
      Alert.alert(error?.message || "Não foi possível trocar foto. Tente novamente.")
    } finally {
      setAvatarIsLoading(false)
    }
  };

  async function handleUpdate () {
    setIsLoading(true)
    try {
      if (user?.fullName !== name) {
        await user?.update({
          firstName: name.split(' ')[0],
          lastName: name.split(' ')[1] || ''
        })

        Alert.alert("Informações atualizadas!")
      }

      if (oldPassword && newPassword) {
        await user?.updatePassword({
          currentPassword: oldPassword,
          newPassword: newPassword
        })

        setOldPassword('')
        setNewPassword('')

        Alert.alert("Senha atualizada!")
      }
    } catch (error: any) {
      Alert.alert(error?.message || 'Não foi possível atualizar. Tente novamente!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
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
        <Input 
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />

        <Input 
          placeholder="Email"
          value={email}
          isDisabled
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

        <Input 
          placeholder="Senha antiga"
          value={oldPassword}
          onChangeText={setOldPassword}
          secureTextEntry
        />

        <Input 
          placeholder="Nova senha"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
      </Center>

      <Button 
        mt={4} 
        title={isLoading ? <Loading /> : "Atualizar"} 
        onPress={handleUpdate}
      />
      <Button 
        variant={"outline"} 
        title={"Sair"}
        onPress={handleLogout} 
      />
    </VStack>
  )
}