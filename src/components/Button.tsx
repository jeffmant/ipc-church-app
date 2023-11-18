import { IButtonProps, Button as NativeBaseButton, Text } from 'native-base'

type ButtonProps = IButtonProps & {
  title: string | JSX.Element
  variant?: 'solid' | 'outline'
}

export function Button ({ title, variant = 'solid', ...rest }: ButtonProps) {
  return (
    <NativeBaseButton 
      w="full"
      h={16}
      mb={2}
      bg={variant === 'outline' ? "transparent" : "blue.700"}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor="blue.500"
      rounded="sm"
      _pressed={{
        bg: variant === 'outline' ? "gray.500" : "blue.500"
      }}
      {...rest}
    >
      <Text
        color={variant === 'outline' ? "blue.500" : "white"}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </NativeBaseButton>
  )
}