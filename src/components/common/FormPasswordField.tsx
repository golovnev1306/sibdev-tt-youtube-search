import { Input } from 'antd'
import React, { FC } from 'react'
import { FormFieldProps } from 'types'
import FormCommon from './FormCommon'

const FormPasswordField: FC<FormFieldProps> = ({
  title, meta, classItemForm, ...rest
}) => (
  <FormCommon title={title} meta={meta} classItemForm={classItemForm}>
    <Input.Password {...rest} />
  </FormCommon>
)

export default FormPasswordField
