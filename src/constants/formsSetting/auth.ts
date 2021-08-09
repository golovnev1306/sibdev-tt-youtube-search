import * as Yup from 'yup'
import { AuthFormFields } from 'types'

export default {
  initialValues: {
    login: '',
    password: '',
  } as AuthFormFields,
  validationSchema: Yup.object({
    login: Yup.string().required('Обязательно для заполнения'),
    password: Yup.string().required('Обязательно для заполнения'),
  }) as any | (() => any),
}
