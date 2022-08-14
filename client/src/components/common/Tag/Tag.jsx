import React from 'react'

import Chip from '@mui/material/Chip';

const textColorFromBG = (backgroundColor) => {
  const R = parseInt(backgroundColor.substring(1, 3), 16)
  const G = parseInt(backgroundColor.substring(3, 5), 16)
  const B = parseInt(backgroundColor.substring(5, 7), 16)
  const luminance = (0.299 * R + 0.587 * G + 0.114 * B) / 255.0;

  let d = 255
  if (luminance > 0.5) { d = 0 }
  return `rgb(${d}, ${d}, ${d})`
}

const Tag = ({
  backgroundColor, label, style,
  onDelete, onClick, clickable
}) => {
  const color = textColorFromBG(backgroundColor)
  if (onDelete === undefined) {
    return (
      <Chip
        label={label}
        size="small"
        onClick={() => { onClick(label) }}
        clickable={clickable}
        style={{
          backgroundColor: backgroundColor,
          color: color,
          maxWidth: 150,
          ...style
        }}
        sx={{
          '& .MuiChip-deleteIcon': {
            color: color,
            '&:hover': {
              color: '#828282'
            }
          },
        }}
      />
    )
  } else {
    return (
      <Chip
        label={label}
        size="small"
        onClick={() => { onClick(label) }}
        clickable={clickable}
        style={{
          backgroundColor: backgroundColor,
          color: color,
          maxWidth: 150,
          ...style
        }}
        sx={{
          '& .MuiChip-deleteIcon': {
            color: color,
            '&:hover': {
              color: '#828282'
            }
          },
        }}
        onDelete={() => { onDelete(label) }}
      />
    )
  }

}

export default Tag