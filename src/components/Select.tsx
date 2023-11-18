import { ISelectProps, Select as NativeBaseSelect } from 'native-base'

export function Select ({ ...rest }: ISelectProps) {
  return (
    <NativeBaseSelect
      color="gray.100"
      w={32}
      height={12}
      {...rest}
    />
  )
}