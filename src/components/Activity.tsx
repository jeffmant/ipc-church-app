import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { ImageSourcePropType, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from '@expo/vector-icons'

type ActivityProps = TouchableOpacityProps & {
  title: string
  subtitle: string
  image: ImageSourcePropType
}

export function Activity ({ title, subtitle, image, ...rest }: ActivityProps) {
  return (
    <TouchableOpacity
      {...rest}
    >
      <HStack 
          bg="gray.500" 
          alignItems="center" 
          p={2} 
          pr={4} 
          rounded="md" 
          mb={6}
          h={32}
      >
        <Image 
          source={image}
          width={24}
          height={24}
          alt="Criança orando"
          rounded="md"
          mr={4}
          resizeMode="center"
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white">
            {title}
          </Heading>
          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            {subtitle}
          </Text>
        </VStack>
      
        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  )
}