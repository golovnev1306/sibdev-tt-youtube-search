import React, {
  ChangeEvent, FC,
} from 'react'
import {
  Formik,
} from 'formik'
import {
  Button,
} from 'antd'
import { addFavorite as addFavoriteFormSettings, searchSettingForm } from 'constants/formsSetting'
import ModalWithForm from 'components/common/ModalWithForm'
import { Form as FormFormikAntd, Input as InputFormikAntd } from 'formik-antd'
import { FormikHelpers } from 'formik/dist/types'
import { AddFavoriteFormFields, Favorite, SearchFormFields } from 'types'
import LikeBtn from './LikeBtn'

type Props = {
  query: string
  submitSearchHandler: (values: SearchFormFields, helpers: FormikHelpers<SearchFormFields>) => void
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
  isFavorite: boolean
  onCreateFavorite: () => void
  onDeleteFavorite: () => void
  submitAddFavorite: (values: Favorite, helpers: FormikHelpers<AddFavoriteFormFields>) => void
  modalCancelHandler: () => void
  isOpenModal: boolean
}

const SearchForm:FC<Props> = ({
  query, submitSearchHandler, onChangeHandler, isFavorite, onCreateFavorite, onDeleteFavorite,
  submitAddFavorite, modalCancelHandler, isOpenModal,
}) => (
  <Formik
    {...searchSettingForm}
    initialValues={{
      ...searchSettingForm.initialValues,
      searchText: query,
    }}
    enableReinitialize
    onSubmit={submitSearchHandler}
  >
    {({ isSubmitting, values }) => (
      <>
        <FormFormikAntd className="search__form">
          <FormFormikAntd.Item name="searchText" className="search__form-item">
            <InputFormikAntd
              placeholder="Что хотите посмотреть?"
              name="searchText"
              onChange={onChangeHandler}
            />
          </FormFormikAntd.Item>
          {values.searchText && (
            <LikeBtn
              isFavorite={isFavorite}
              onCreateFavorite={onCreateFavorite}
              onDeleteFavorite={onDeleteFavorite}
              query={query}
            />
          )}
          <Button type="primary" htmlType="submit" disabled={isSubmitting} loading={isSubmitting}>Найти</Button>
        </FormFormikAntd>
        <ModalWithForm
          formSettings={{
            ...addFavoriteFormSettings,
            initialValues: {
              ...addFavoriteFormSettings.initialValues,
              query: values.searchText,
            },
            onSubmit: submitAddFavorite,
          }}
          modalTitle="Добавить в избранное"
          modalCancelHandler={modalCancelHandler}
          isOpenModal={isOpenModal}
          buttonText="Добавить"
          isQueryDisabled
        />
      </>
    )}

  </Formik>

)

export default SearchForm
