import { Avatar, Center, Heading, Link, Text, VStack } from "native-base";
import { Input } from "../components/Input";
import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { Button } from "../components/Button";

export function Profile () {
  const { user, isLoaded, isSignedIn } = useUser()

  const [name, setName] = useState(user?.fullName || '')
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || '')

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  return (
    <VStack px={10}>
      <Center>
        <Avatar 
          source={{
            uri: user?.imageUrl
          }}
          mt={24}
          size={"2xl"}
        />
        <Link>
          
        </Link>
      </Center>

      <Center mt={16}>
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

      <Center mt={8}>
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

      <Button title="Atualizar" />
    </VStack>
  )
}