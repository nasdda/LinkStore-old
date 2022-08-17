import * as React from 'react'
import { SliderPicker } from 'react-color'

import Form from 'react-bootstrap/Form'

function ColorPicker({ onComplete }) {
  const [hex, setHex] = React.useState('#000000')
  const [hexIn, setHexIn] = React.useState('#000000')

  const handleChange = (color) => {
    setHex(color.hex)
    setHexIn(color.hex)
  }

  let re = /^#[0-9A-F]{6}$/i

  return (
    <>
      <SliderPicker
        color={hex}
        onChange={handleChange}
        onChangeComplete={onComplete}
      />
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
      }}>
        <Form.Label>Hex</Form.Label>
        <Form.Control
          placeholder={hex}
          className="mb-3 mt-3 ml-3"
          value={hexIn}
          onChange={(e) => {
            if (re.test(e.target.value)) {
              setHex(e.target.value)
              onComplete({ hex: e.target.value })
            }
            setHexIn(e.target.value)
          }}
        />
      </div>

    </>

  )
}

export default ColorPicker
