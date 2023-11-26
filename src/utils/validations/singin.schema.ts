import * as Yup from 'yup'

export const signinValidationSchema = Yup.object({
  email: Yup.string().required('Informe o email').email('Email inválido'),
  password: Yup.string().required('Informe a senha').min(8, 'Insira pelo menos 8 dígitos')
})