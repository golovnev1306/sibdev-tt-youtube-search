import React, { FC } from 'react'
import { Form, Typography } from 'antd'
import { FieldMetaProps } from 'formik'
import { AuthFormFields } from '../../types'

type OwnProps = {
  title: string
  meta?: FieldMetaProps<AuthFormFields>
  classItemForm?: string
}

const FormCommon: FC<OwnProps> = ({
  title, meta, children, classItemForm,
}) => {
  const invalid = meta?.touched && meta?.error
  return (
    <Form.Item
      validateStatus={invalid ? 'error' : ''}
      help={invalid && meta?.error}
      hasFeedback
      className={classItemForm}
      label={title && (
        <Typography.Text type={invalid ? 'danger' : 'secondary'}>
          {title}
        </Typography.Text>
      )}
    >
      {children}
    </Form.Item>
  )
}

export default FormCommon
