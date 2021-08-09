import { Col, Row, Typography } from 'antd'
import React, { FC } from 'react'
import SwitchDisplayType from './SwitchDisplayType'
import { DisplayTypeVideos } from '../../../../../types'

type Props = {
  query: string
  count: number
  setDisplay: (display: DisplayTypeVideos) => void
  display: DisplayTypeVideos
}

const FilterPanel: FC<Props> = ({
  query, count, display, setDisplay,
}) => (
  <Row className="results__filter-panel" justify="space-between">
    <Col>
      Видео по запросу
      {' '}
      <strong>
        &quot;
        {query}
        &quot;
      </strong>
      {' '}
      <Typography.Text type="secondary">
        {count}
        {' '}
        результатов
      </Typography.Text>
    </Col>
    <Col>
      <SwitchDisplayType display={display} setDisplay={setDisplay} />
    </Col>
  </Row>
)

export default FilterPanel
