import { useClerk, useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import {
  Avatar,
  Center,
  ChevronRightIcon,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack
} from "native-base";
import {
  Church,
  Hand,
  Info,
  Leaf,
  Password,
  SignOut
} from 'phosphor-react-native';
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Loading } from "../../components/Loading";
import { AppRoutesNavigatorProps } from "../../routes/app.routes";

export function Settings () {
  const { signOut } = useClerk()
  const { user } = useUser()
  const { navigate } = useNavigation<AppRoutesNavigatorProps>()
  const [isLoading, setIsLoading] = useState(true)

  function handleGoToProfile() {
    navigate('profile')
  }

  function handleGoToChangePassword () {
    navigate('changePassword')
  }

  async function handleSignout () {
    setIsLoading(true)
    await signOut()
    setIsLoading(false)
  }


  useEffect(() => {
    if (user) {
      setIsLoading(false)
    }
  }, [user])

  return (
    isLoading ? <Center flex={1}><Loading /></Center> :
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack
        px={4}
        py={16}
      >
        <TouchableOpacity
          onPress={handleGoToProfile}
        >
          <HStack
            bg="gray.600" 
            alignItems="center" 
            p={4} 
            rounded="xl" 
            mb={6}
            h={24}
          >
            <Avatar 
              source={{
                uri: user?.imageUrl
              }}
              size={"lg"}
            />
            <VStack ml={4}>
              <Heading
                color="gray.200"
                fontFamily="heading"
                numberOfLines={1}
                fontSize="xl"
                overflow="hidden"
              >
                {user?.fullName}
              </Heading>
              <Text
                color="gray.100"
                fontFamily="body"
                numberOfLines={1}
                overflow="hidden"
              >
                {user?.primaryEmailAddress?.emailAddress}
              </Text>
            </VStack>
          </HStack>
        </TouchableOpacity>

        <Heading
          color="gray.100"
          fontFamily="heading"
          mt={2}
          mb={2}
        >
          Igreja Palavras que Curam
        </Heading>

        <VStack
          bg="gray.500" 
          p={4} 
          rounded="xl" 
          mb={4}
          h={48}
          space={2}
        >
          <TouchableOpacity>
            <HStack
              alignItems="center"
              justifyContent="flex-start"
            >
              <Avatar>
                <Church />
              </Avatar>
              <Heading
                fontFamily="heading"
                fontSize="md"
                color="gray.100"
                ml={4}
                flex={1}
              >
                Horários dos Cultos
              </Heading>
              <ChevronRightIcon color="gray.100" />
            </HStack>
          </TouchableOpacity>
         
          <TouchableOpacity>
            <HStack
              alignItems="center"
              justifyContent="flex-start"
            >
              <Avatar>
                <Leaf />
              </Avatar>
              <Heading
                fontFamily="heading"
                fontSize="md"
                color="gray.100"
                ml={4}
                flex={1}
              >
                Células
              </Heading>
              <ChevronRightIcon color="gray.100" />
            </HStack>
          </TouchableOpacity>
          
          <TouchableOpacity>
            <HStack
              alignItems="center"
              justifyContent="flex-start"
            >
              <Avatar>
                <Hand />
              </Avatar>
              <Heading
                fontFamily="heading"
                fontSize="md"
                color="gray.100"
                ml={4}
                flex={1}
              >
                Ministérios
              </Heading>
              <ChevronRightIcon color="gray.100" />
            </HStack>
          </TouchableOpacity>
        </VStack>

        <Heading
          color="gray.100"
          fontFamily="heading"
          mt={2}
          mb={2}
        >
          Configurações
        </Heading>

        <VStack
          bg="gray.500" 
          p={4} 
          rounded="xl" 
          mb={6}
          h={48}
          space={2}
        >
          <TouchableOpacity onPress={handleGoToChangePassword}>
            <HStack
              alignItems="center"
              justifyContent="flex-start"
            >
              <Avatar>
                <Password />
              </Avatar>
              <Heading
                fontFamily="heading"
                fontSize="md"
                color="gray.100"
                ml={4}
                flex={1}
              >
                Trocar senha
              </Heading>
              <ChevronRightIcon color="gray.100" />
            </HStack>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleGoToChangePassword}>
            <HStack
              alignItems="center"
              justifyContent="flex-start"
            >
              <Avatar>
                <Info />
              </Avatar>
              <Heading
                fontFamily="heading"
                fontSize="md"
                color="gray.100"
                ml={4}
                flex={1}
              >
                Sobre
              </Heading>
              <ChevronRightIcon color="gray.100" />
            </HStack>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignout}>
            <HStack
              alignItems="center"
              justifyContent="flex-start"
            >
              <Avatar>
                <SignOut />
              </Avatar>
              <Heading
                fontFamily="heading"
                fontSize="md"
                color="gray.100"
                ml={4}
                flex={1}
              >
                Sair do App
              </Heading>
              <ChevronRightIcon color="gray.100" />
            </HStack>
          </TouchableOpacity>

        </VStack>

      </VStack>
    </ScrollView>
  )
}