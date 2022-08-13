import React from 'react'

import { Tag } from '../Tag/Tag'


export const TagContainer = (props) => {
  const handleClick = () => {
    window.alert('You clicked the Chip.');
  };
  return (
    <div>
      <Tag backgroundColor="#000000" label="Video" onClick={handleClick} />
    </div>
  )
}