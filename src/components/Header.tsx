import { Box, ChevronLeftIcon, HStack, Heading } from "native-base";
import { TouchableOpacity } from "react-native";

type HeaderProps = {
  title: string
  handleGoBack: () => void
}

export function Header ({ title, handleGoBack }: HeaderProps) {
  return (
    <HStack bg="gray.600" pb={6} pt={16} px={5} justifyContent="space-between">
      <Box>
        <TouchableOpacity onPress={handleGoBack}>
          <HStack justifyContent="center" alignItems="center" ml={1}>
            <ChevronLeftIcon color="gray.100" />
            <Heading
              fontFamily="heading"
              fontSize="md"
              color="gray.100"
              ml={1}
            >
              Voltar
            </Heading>
          </HStack>
        </TouchableOpacity>
      </Box>
      <Heading color="gray.100" fontSize="xl" fontFamily="heading">
        { title }
      </Heading>
    </HStack>
  )
}