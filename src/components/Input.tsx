import { FormControl, IInputProps, Input as NativeBaseInput, Text } from 'native-base'

type InputProps = IInputProps & {
  errorMessage?: string
}

export function Input ({ errorMessage, ...rest }: InputProps) {
  return (
    <FormControl mb={4}>
      <NativeBaseInput 
        bg="gray.500"
        h={12}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="white"
        fontFamily="body"
        placeholderTextColor="gray.300"
        _focus={{
          borderWidth: 1,
          borderColor: "blue.500"
        }}
        {...rest}
      />
      <Text color="red.500" fontFamily="body">
        {errorMessage}
      </Text>
    </FormControl>
  )
}