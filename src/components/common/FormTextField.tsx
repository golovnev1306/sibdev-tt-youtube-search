import { Input } from 'antd'
import React, { FC } from 'react'
import { FormFieldProps } from 'types'
import FormCommon from './FormCommon'

const FormTextField: FC<FormFieldProps> = ({
  title, meta, classItemForm, ...rest
}) => (
  <FormCommon classItemForm={classItemForm} title={title} meta={meta}>
    <Input {...rest} />
  </FormCommon>
)

export default FormTextField
