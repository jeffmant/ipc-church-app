import { IInputProps, Input as NativeBaseInput } from 'native-base'

export function Input ({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput 
      bg="gray.500"
      h={16}
      px={4}
      borderWidth={0}
      fontSize="md"
      color="white"
      fontFamily="body"
      mb={4}
      placeholderTextColor="gray.300"
      _focus={{
        borderWidth: 1,
        borderColor: "blue.500"
      }}
      {...rest}
    />
  )
}