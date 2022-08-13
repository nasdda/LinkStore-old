import React from 'react'

import styled from "styled-components"

const TagButton = styled.button`
  border-radius: 20px;
  color: white;
  text-align: center;
  font-size: 0.9rem;
  text-align: center;
  width: fit-content;
  height: fit-content;
  padding: 0.3rem 0.4rem 0.3rem 0.4rem;
  outline: none;
  border: none;

`

const textColorFromBG = (backgroundColor) => {
  const R = parseInt(backgroundColor.substring(1, 3), 16)
  const G = parseInt(backgroundColor.substring(3, 5), 16)
  const B = parseInt(backgroundColor.substring(5, 7), 16)
  const luminance = (0.299 * R + 0.587 * G + 0.114 * B) / 255.0;

  let d = 255
  if (luminance > 0.5) { d = 0 }
  return `rgb(${d}, ${d}, ${d})`
}

export const Tag = (props) => {
  const color = textColorFromBG(props.backgroundColor)
  return (
    <TagButton
      style={{ backgroundColor: props.backgroundColor, color: color }}
      type="button"
    >
      {props.children}
    </TagButton>
  )
}