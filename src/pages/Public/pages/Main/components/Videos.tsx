import { Card, Col, Row } from 'antd'
import React, { FC, useState } from 'react'
import { DisplayTypeVideos, Video } from 'types'
import classNames from 'classnames'
import FilterPanel from './FilterPanel'

type Props = {
  videos: Video[]
  count: number
  query: string
}

const Videos: FC<Props> = ({
  videos, query, count,
}) => {
  const [display, setDisplay] = useState<DisplayTypeVideos>('list')

  return (
    <div className="main__results results">
      <FilterPanel count={count} query={query} setDisplay={setDisplay} display={display} />
      <Row className={classNames('results__videos-list', { 'results__videos-list--d-list': display === 'list' })} gutter={[16, 16]}>
        {videos.map((video) => (
          <Col key={video.title} span={display === 'grid' ? 8 : 24}>
            <Card className="results__videos-item video-card">
              <img className="video-card__img" src={video.image.url} alt={video.title} />
              <div className="video-card__info">
                <h3 className="video-card__title">{video.title}</h3>
                <p className="video-card__description">{video.type}</p>
                <a className="video-card__link" href={video.url} target="_blank" rel="noreferrer">Перейти к просмотру</a>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Videos
