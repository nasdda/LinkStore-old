import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectLinks } from '../../redux/slice/slice'

function LinksContainer(props) {
  const links = useSelector(selectLinks)
  return (
    <div>
      container
    </div>
  )
}

export default LinksContainer