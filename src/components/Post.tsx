import { useUser } from "@clerk/clerk-expo";
import { Avatar, Box, Divider, HStack, Heading, Text, VStack } from "native-base";
import { ChatCircleText, Hand } from "phosphor-react-native";
import { TouchableHighlight, TouchableOpacity, TouchableOpacityProps } from "react-native";


type PostProps = TouchableOpacityProps & {
  description: string
  createdAt?: string
}

export function Post ({ description, createdAt, ...rest }: PostProps) {
  const formatedDate = new Date(new Date(createdAt || new Date()).toISOString())

  const { user } = useUser()
   return ( 
    <Box     
      bg="gray.500" 
      rounded="2xl" 
      mb={6}
      h={72}
    >
      <HStack 
        p={2} 
        pr={4} 
      >
        <VStack p={2}>
          <HStack
            justifyContent="flex-start"
            alignItems="center"
          >
            <Avatar 
              source={{
                uri: user?.imageUrl
              }}
              size={"lg"}
            />
            <TouchableHighlight>
              <VStack ml={2}>
                <Heading
                  fontFamily="heading"
                  fontSize="md"
                  color="gray.200"
                >
                  {user?.fullName}
                </Heading>
                <Text
                  fontFamily="heading"
                  fontSize="md"
                  color="gray.100"
                >
                  {`${("0" + formatedDate.getDate()).slice(-2)}/${("0" + (formatedDate.getMonth() + 1)).slice(-2)}/${formatedDate.getFullYear()} - ${formatedDate.getHours()}:${formatedDate.getMinutes()}` }
                </Text>

              </VStack>
            </TouchableHighlight>
          </HStack>

          <Text fontSize="md" color="gray.100" mt={2} numberOfLines={4}>
            {description}
          </Text>

        </VStack>
      </HStack>
      
      <Divider mt={4} mb={4} />

      <HStack
        justifyContent="center"
        alignItems="center"
        space={2}
      >
        <TouchableOpacity>
          <HStack
            justifyContent="center"
            alignItems="center"
            space={2}
            bgColor="green.200"
            px={4}
            py={2}
            h={10}
            w={32}
            rounded="md"
          >
            <Hand color="black" />
            
            <Heading color="gray.500" fontFamily="heading" fontSize="md">
              10 Glórias
            </Heading>

          </HStack>
        </TouchableOpacity>

        <HStack
          justifyContent="center"
          alignItems="center"
          space={2}
          px={4}
          rounded="md"
        >
          <ChatCircleText color="white" />
          <Heading color="gray.100" fontFamily="heading" fontSize="md">
            15 Comentários
          </Heading>

        </HStack>
      </HStack>
      

    </Box>
  )
}