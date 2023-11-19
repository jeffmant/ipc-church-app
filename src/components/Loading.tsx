import { Center, ISpinnerProps, Spinner } from "native-base";

export function Loading ({ ...rest }: ISpinnerProps) {
  return (
    <Center flex={1}>
      <Spinner 
        color="gray.500"
        {...rest} 
      />
    </Center>
  )
}