import { Avatar, Center, Heading, Link, Text, VStack } from "native-base";
import { Input } from "../components/Input";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";

export function Profile () {
  const { user, isLoaded, isSignedIn } = useUser()
  const { signOut } = useClerk();

  const [name, setName] = useState(user?.fullName || '')
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || '')

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  async function handleLogout () {
    await signOut()
  }

  return (
    <VStack px={10}>
      <Center>
        <Avatar 
          source={{
            uri: user?.imageUrl
          }}
          mt={16}
          size={"2xl"}
        />
        <Link>
          
        </Link>
      </Center>

      <Center mt={8}>
        <Input 
          placeholder="Nome"
          value={name}
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
        />

        <Input 
          placeholder="Nova senha"
          value={newPassword}
        />
      </Center>

      <Button 
        mt={4} 
        title={isLoading ? <Loading /> : "Atualizar"} 
      />
      <Button 
        variant={"outline"} 
        title={isLoading ? <Loading /> : "Sair"} 
        onPress={handleLogout} 
      />
    </VStack>
  )
}