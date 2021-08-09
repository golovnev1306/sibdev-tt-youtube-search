import { Button } from 'antd'
import React, { FC } from 'react'
import ModalWithForm from 'components/common/ModalWithForm'
import { addFavorite } from 'constants/formsSetting'
import { DeleteOutlined } from '@ant-design/icons'
import { FormikHelpers } from 'formik/dist/types'
import { AddFavoriteFormFields, Favorite } from 'types'

type Props = {
  favorite: Favorite
  clickPerformHandler: (query: Favorite) => void
  clickEditHandler: (index: number) => void
  index: number
  deleteFavorite: (index: number) => void
  modalCancelHandler: () => void
  isOpenModal: boolean
  submitEditFavorite: (values: Favorite, helpers: FormikHelpers<AddFavoriteFormFields>) => void
}

const FavoriteItem: FC<Props> = ({
  favorite, clickPerformHandler, clickEditHandler, index, deleteFavorite, modalCancelHandler,
  isOpenModal, submitEditFavorite,
}) => (
  <div className="favorites__item favorite-card">
    <h2 className="favorite-card__title">{favorite.queryName}</h2>
    <Button htmlType="button" onClick={() => clickPerformHandler(favorite)}>Выполнить</Button>
    <Button htmlType="button" onClick={() => clickEditHandler(index)}>Редактировать</Button>
    <Button htmlType="button" onClick={() => deleteFavorite(index)}><DeleteOutlined /></Button>
    <ModalWithForm
      modalTitle="Редактировать избранный запрос"
      formSettings={{
        ...addFavorite, initialValues: { ...favorite }, onSubmit: submitEditFavorite,
      }}
      modalCancelHandler={modalCancelHandler}
      isOpenModal={isOpenModal}
      buttonText="Редактировать"
    />
  </div>
)

export default FavoriteItem
