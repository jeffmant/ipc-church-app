import * as Yup from 'yup'

export const signupValidationSchema = Yup.object({
  name: Yup.string().required('Insira o nome'),
  email: Yup.string().required('Insira o email').email('Email inválido'),
  password: Yup.string().required('Insira a senha').min(8, 'Digite pelo menos 8 dígitos'),
  confirmPassword: Yup.string().required('Confirme a senha').oneOf([Yup.ref('password'), ''], 'As senhas devem ser iguais')
})