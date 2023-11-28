import * as Yup from 'yup'

export const passwordValidationSchema = Yup.object({
  password: Yup
    .string()
    .min(8, 'A senha deve ter pelo menos 8 dígitos')
    .nullable()
    .transform((value) => !!value ? value : null),
  confirmPassword: Yup
    .string()
    .nullable()
    .transform((value) => !!value ? value : null)
    .oneOf([Yup.ref('password'), ''], 'As senhas devem ser iguais')
    .when('password', {
      is: (Field: any) => Field,
      then: () => Yup
        .string()
        .nullable()
        .required('Informe a confirmação de senha')
        .transform((value) => !!value ? value : null),
    })
})