import * as Yup from 'yup'
import { AddFavoriteFormFields } from 'types'
import { FormikConfig } from 'formik'

export default {
  initialValues: {
    query: '',
    queryName: '',
    count: 25,
  } as AddFavoriteFormFields,
  validationSchema: Yup.object({
    query: Yup.string().required('Обязательно для заполнения'),
    queryName: Yup.string().required('Обязательно для заполнения'),
  }),
} as FormikConfig<any>
