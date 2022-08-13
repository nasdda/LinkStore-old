import React, { useState } from 'react'

import { Tag } from '../Tag/Tag'

import { useSelector } from 'react-redux';
import { selectTags } from '../../../redux/slice/slice';
import TagCreator from './TagCreator';


// props should contain an addTag to add selected tag
export const TagSelector = (props) => {
  const tags = useSelector(selectTags)
  const [openTagCreator, SetOpenTagCreator] = useState(false)

  const handleToggle = (label) => {
    props.addTag(label)
  }

  const handleToggleTagCreator = () => {
    SetOpenTagCreator(!openTagCreator)
  }

  return (
    <div>
      {tags.map(tag => (
        <Tag
          style={{ marginRight: "8px", marginBottom: "5px" }}
          backgroundColor={tag.backgroundColor}
          label={tag.label}
          onClick={handleToggle}
        />
      ))}
      <Tag
        label="+"
        backgroundColor="#646464"
        onClick={handleToggleTagCreator}
        style={{ marginRight: "8px", marginBottom: "5px" }}
      />
      <TagCreator open={openTagCreator}/>
    </div>
  )
}