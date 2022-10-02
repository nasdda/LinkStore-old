import * as React from 'react'

import Tag from '../Tag/Tag'

import { useSelector } from 'react-redux'
import { selectTags } from '../../../redux/slice/slice'
import TagCreator from './TagCreator'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import { Chip, Tooltip } from '@mui/material'

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
          <Tooltip title={openTagCreator ? "hide" : "create"} placement="right">
            <Chip
              variant="outlined"
              size="small"
              label={
                openTagCreator ? <RemoveIcon /> : <AddIcon />
              }
              onClick={handleToggleTagCreator}
              style={{
                marginBottom: "5px",
                backgroundColor: "#e6e6e6",
                color: "grey"
              }}
            />
          </Tooltip>

          <TagCreator
            labelExists={labelExists}
            open={openTagCreator}
          />
        </>
      }

    </div>
  )
}