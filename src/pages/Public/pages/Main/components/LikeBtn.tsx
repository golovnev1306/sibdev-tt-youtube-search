import React, { FC } from 'react'
import { Popover, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { HeartFilled, HeartOutlined } from '@ant-design/icons/lib'

type Props = {
  isFavorite: boolean
  onDeleteFavorite: () => void
  onCreateFavorite: () => void
  query: string
}

const LikeBtn: FC<Props> = ({
  isFavorite, onCreateFavorite, onDeleteFavorite, query,
}) => (
  <Popover
    placement="bottom"
    content={(
      <div>
        <div>Ваш запрос в избранном</div>
        <Link to="/favorites">перейти</Link>
      </div>
      )}
    trigger="click"
    visible={isFavorite && !query}
  >
    <Tooltip
      placement="top"
      title={isFavorite ? 'Убрать из избранных' : 'Добавить в избранные'}
    >
      <button
        type="button"
        className="search__like-btn"
        onClick={isFavorite ? onDeleteFavorite : onCreateFavorite}
      >
        {isFavorite ? <HeartFilled />
          : <HeartOutlined />}
      </button>
    </Tooltip>
  </Popover>
)

export default LikeBtn
