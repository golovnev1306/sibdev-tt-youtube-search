import React, { FC } from 'react'
import { Col, Empty, Row } from 'antd'
import { connect } from 'react-redux'
import { getVideos, getVideosCount, getVideosQuery } from 'selectors'
import { AppDispatch, AppState } from 'types'
import { setVideosThunk } from 'redux/reducers/videoReducer'
import classNames from 'classnames'
import Videos from './Videos'
import SearchFormContainer from './SearchFormContainer'

const Main: FC<MapStateProps & MapDispatchProps> = ({
  setVideos, videos, count, query,
}) => (
  <main className="app__main main">
    <div className="container">
      <div className="main__inner">
        <div className={classNames('main__search search', { 'main__search--small': !!query })}>
          <h2 className="search__title">Поиск видео</h2>
          <Row>
            <Col span={24}>
              <SearchFormContainer setVideos={setVideos} />
            </Col>
          </Row>
        </div>
        {videos.length > 0 && (
          <Videos videos={videos} count={count} query={query} />
        )}
        {!!query && videos.length === 0 && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="По вашему запросу ничего не найдено" />
        )}
      </div>
    </div>
  </main>
)

const mapStateToProps = (state: AppState) => ({
  videos: getVideos(state),
  query: getVideosQuery(state),
  count: getVideosCount(state),
})

type MapStateProps = ReturnType<typeof mapStateToProps>

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setVideos: (query: string) => dispatch(setVideosThunk(query)),
})

type MapDispatchProps = ReturnType<typeof mapDispatchToProps>

export default connect<MapStateProps, MapDispatchProps, {}, AppState>(
  mapStateToProps, mapDispatchToProps,
)(Main)
