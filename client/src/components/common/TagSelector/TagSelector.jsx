import React, { useState } from 'react'

import Tag from '../Tag/Tag'

import { useSelector } from 'react-redux';
import { selectTags } from '../../../redux/slice/slice';
import TagCreator from './TagCreator';


// props should contain an addTag to add selected tag
export const TagSelector = (props) => {
  const tags = useSelector(selectTags)
  const [openTagCreator, SetOpenTagCreator] = useState(false)

  const tagLabels = tags.map(tag => tag.label)
  const labelExists = (label) => {
    return tagLabels.includes(label)
  }

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
          key={tag.label}
          style={{ marginRight: "8px", marginBottom: "5px" }}
          backgroundColor={tag.backgroundColor}
          label={tag.label}
          onClick={handleToggle}
        />
      ))}
      <Tag
        label={openTagCreator ? "-" : "+"}
        backgroundColor="#646464"
        onClick={handleToggleTagCreator}
        style={{ marginRight: "8px", marginBottom: "5px", width: "2rem", fontSize: "1.2rem" }}
      />
      <TagCreator
        labelExists={labelExists}
        open={openTagCreator}
      />
    </div>
  )
}