import * as React from 'react'
import { SliderPicker } from 'react-color'

function ColorPicker({ onComplete }) {
  const [hex, setHex] = React.useState('#000000')

  const handleChange = (color) => {
    setHex(color.hex)
  }

  return (
    <SliderPicker
      color={hex}
      onChange={handleChange}
      onChangeComplete={onComplete}
    />
  )
}

export default ColorPicker
