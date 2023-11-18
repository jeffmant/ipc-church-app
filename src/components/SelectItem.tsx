import { ISelectItemProps, Select as NativeBaseSelect } from 'native-base'

export function SelectItem ({ ...rest }: ISelectItemProps) {
  return (
    <NativeBaseSelect.Item
      color="gray.100"
      w={32}
      height={12}
      ml={4}
      {...rest}
    />
  )
}