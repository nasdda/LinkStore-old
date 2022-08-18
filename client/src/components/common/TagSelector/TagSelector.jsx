import * as React from 'react'

import Tag from '../Tag/Tag'

import { useDispatch, useSelector } from 'react-redux'
import { selectTags, selectUser, setTags } from '../../../redux/slice/slice'
import TagCreator from './TagCreator'

import axios from 'axios'

// props should contain an addTag to add selected tag
export const TagSelector = ({ selectTag, selectedTags,
  unselectTag, insertable, openTagCreator, setOpenTagCreator }) => {
  const tags = useSelector(selectTags)

  const tagLabels = tags.map(tag => tag.label)
  const labelExists = (label) => {
    return tagLabels.includes(label)
  }
  const handleToggleTagCreator = () => {
    setOpenTagCreator(!openTagCreator)
  }
  return (
    <div>
      {tags.map(tag => {
        if (selectedTags.includes(tag.label)) {
          return <Tag
            key={tag.label}
            style={{ marginRight: "8px", marginBottom: "5px" }}
            backgroundColor={tag.backgroundColor}
            label={tag.label}
            onClick={unselectTag}
            onDelete={unselectTag}
          />
        }
        return <Tag
          key={tag.label}
          style={{ marginRight: "8px", marginBottom: "5px" }}
          backgroundColor={tag.backgroundColor}
          label={tag.label}
          onClick={selectTag}
        />
      })}
      {
        insertable && <>
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
        </>
      }

    </div>
  )
}