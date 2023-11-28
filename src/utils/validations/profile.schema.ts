import * as Yup from 'yup'

export const profileValidationSchema = Yup.object({
  name: Yup.string().required('Insira o nome')
})