import * as React from 'react'

import Tag from '../Tag/Tag'

import { useDispatch, useSelector } from 'react-redux';
import { selectTags, selectUser, setTags } from '../../../redux/slice/slice';
import TagCreator from './TagCreator';

import axios from 'axios'

// props should contain an addTag to add selected tag
export const TagSelector = ({ selectTag, selectedTags, unselectTag }) => {
  const [openTagCreator, SetOpenTagCreator] = React.useState(false)
  const tags = useSelector(selectTags)
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  React.useEffect(() => {
    if (user) {
      console.log(user)
      axios.get(`/user/links/${user.uuid}`, {}, { withCredentials: true }).then(resp => {
        console.log("RESP:", resp)
        dispatch(setTags({ tags: resp.data.tags }))
        console.log('links data: ', resp.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }, [user])

  const tagLabels = tags.map(tag => tag.label)
  const labelExists = (label) => {
    return tagLabels.includes(label)
  }

  const handleToggleTagCreator = () => {
    SetOpenTagCreator(!openTagCreator)
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