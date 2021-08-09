import React, { FC } from 'react'
import { Button, Modal } from 'antd'
import { Formik } from 'formik'
import {
  Form as FormFormikAntd, Input as InputFormikAntd, Select, Slider,
} from 'formik-antd'
import { FormikConfig } from 'formik/dist/types'
import { AddFavoriteFormFields } from '../../types'

type Props = {
  modalTitle: string
  formSettings: FormikConfig<AddFavoriteFormFields>
  modalCancelHandler: () => void
  isOpenModal: boolean

  buttonText: string
  isQueryDisabled?: boolean
}

const ModalWithForm: FC<Props> = ({
  modalTitle, formSettings, isOpenModal, modalCancelHandler, isQueryDisabled,
  buttonText,
}) => {
  const sortBy = [{
    value: 'date',
    label: <option>дате</option>,
  }, {
    value: 'rating',
    label: <option>рейтингу</option>,
  },
  {
    value: 'relevance',
    label: <option>релевантности</option>,
  },
  {
    value: 'title',
    label: <option>названию</option>,
  },
  {
    value: 'viewCount',
    label: <option>просмотрам</option>,
  }]

  return (
    <Modal
      title={modalTitle}
      visible={isOpenModal}
      onCancel={modalCancelHandler}
      footer={null}
    >
      <Formik
        {...formSettings}
      >
        {() => (
          <FormFormikAntd layout="vertical">
            <FormFormikAntd.Item label="Запрос" name="query" required>
              <InputFormikAntd name="query" disabled={isQueryDisabled} />
            </FormFormikAntd.Item>
            <FormFormikAntd.Item label="Название" name="queryName" required>
              <InputFormikAntd
                name="queryName"
                placeholder="Укажите название"
              />
            </FormFormikAntd.Item>
            <FormFormikAntd.Item label="Сортировать по" name="sort">
              <Select
                name="sort"
                placeholder="Без сортировки"
                options={sortBy}
              />
            </FormFormikAntd.Item>
            <FormFormikAntd.Item label="Сортировать по" name="count">
              <Slider name="count" max={50} min={0} />
            </FormFormikAntd.Item>

            <Button htmlType="submit">{buttonText}</Button>

          </FormFormikAntd>
        )}
      </Formik>
    </Modal>
  )
}

export default ModalWithForm
