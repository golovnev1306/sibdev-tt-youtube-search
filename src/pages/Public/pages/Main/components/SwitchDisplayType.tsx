import listActive from 'images/list-active.svg'
import list from 'images/list.svg'
import gridActive from 'images/grid-active.svg'
import grid from 'images/grid.svg'
import React, { FC } from 'react'
import { DisplayTypeVideos } from 'types'

type Props = {
  setDisplay: (display: DisplayTypeVideos) => void
  display: DisplayTypeVideos
}

const SwitchDisplayType: FC<Props> = ({ display, setDisplay }) => (
  <>
    <button
      type="button"
      tabIndex={0}
      className="main__view-type"
      onClick={() => { setDisplay('list') }}
      onKeyDown={() => { setDisplay('list') }}
    >
      {display === 'list' ? (
        <img src={listActive} alt="" />
      ) : (
        <img src={list} alt="" />
      )}
    </button>
    <button
      type="button"
      tabIndex={0}
      className="main__view-type"
      onClick={() => { setDisplay('grid') }}
      onKeyDown={() => { setDisplay('grid') }}
    >
      {display === 'grid' ? (
        <img src={gridActive} alt="" />
      ) : (
        <img src={grid} alt="" />
      )}
    </button>
  </>
)

export default SwitchDisplayType
