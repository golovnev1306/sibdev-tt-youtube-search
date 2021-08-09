import React, { FC } from 'react'
import {
  Formik, FormikProps,
} from 'formik'

import { Button, Typography } from 'antd'
import { AppDispatch, AppState, AuthFormFields } from 'types'
import { authorize } from 'redux/reducers/authReducer'
import { connect } from 'react-redux'
import { FormikHelpers } from 'formik/dist/types'
import { authSettingForm } from 'constants/formsSetting'
import { Form, Input } from 'formik-antd'

const AuthForm: FC<MapDispatchProps> = ({ authorizeUser }) => {
  const submit = async (
    values: AuthFormFields,
    { setStatus, setSubmitting }: FormikHelpers<AuthFormFields>,
  ) => {
    try {
      await authorizeUser(values)
    } catch (e) {
      setStatus(e.message)
    }
    setSubmitting(false)
  }

  return (
    <Formik
      {...authSettingForm}
      onSubmit={submit}
    >
      {({ status, isSubmitting }: FormikProps<AuthFormFields>) => (
        <Form className="ant-form ant-form-horizontal auth__form" layout="vertical">
          <Typography.Text type="danger">{status}</Typography.Text>
          <Form.Item label="Логин" name="login" className="auth__form-item">
            <Input
              name="login"
              type="text"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Пароль"
            className="auth__form-item"
          >
            <Input.Password name="password" type="password" inputMode="text" />
          </Form.Item>
          <Button htmlType="submit" type="primary" disabled={isSubmitting}>Вход</Button>
        </Form>
      )}
    </Formik>
  )
}

type MapDispatchProps = {
  authorizeUser: (values: AuthFormFields) => void
}

const mapDispatchToProps = (dispatch: AppDispatch): MapDispatchProps => ({
  authorizeUser: (values) => dispatch(authorize(values)),
})

export default connect<{}, MapDispatchProps, {}, AppState>(null, mapDispatchToProps)(AuthForm)
