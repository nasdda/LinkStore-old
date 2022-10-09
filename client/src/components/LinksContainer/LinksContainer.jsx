import './react-masonry.css'

import * as React from 'react'

import LinkCard from '../LinkCard/LinkCard'
// import { Masonry } from '@mui/lab'
import { Box, Modal, Typography, Container } from '@mui/material'

import SearchBar from '../common/SearchBar/SearchBar'
import { TagSelector } from '../common/TagSelector/TagSelector'
import LinkEditor from '../LinkEditor/LinkEditor'

import Masonry from 'react-masonry-css'

import Select from 'react-select'

const breakpointColumnsObj = {
  default: 6,
  1500: 5,
  1300: 4,
  1000: 3,
  700: 2,
  500: 1
}

// Escape special characters for regex matching
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function LinksContainer({ links, editable }) {
  const [selectedTags, setSelectedTags] = React.useState([])
  const [searchValue, setSearchValue] = React.useState("")
  const [edit, setEdit] = React.useState(false)
  const [editLink, setEditLink] = React.useState(undefined)
  const [disabled, setDisabled] = React.useState(false)
  const [order, setOrder] = React.useState('Newest')
  const selectTag = (tagLabel) => {
    setSelectedTags([...selectedTags, tagLabel])
  }

  const unselectTag = (tagLabel) => {
    selectedTags.splice(selectedTags.indexOf(tagLabel), 1)
    setSelectedTags([...selectedTags])
  }

  const handleSearch = (value) => {
    setSearchValue(value)
  }

  const handleOpenEditor = (targetLink) => {
    setEditLink(targetLink)
    setEdit(true)
  }

  const handleCloseEditor = () => {
    setEdit(false)
  }

  const options = [
    {
      value: 'Newest',
      label: 'Newest'
    },
    {
      value: 'Oldest',
      label: 'Oldest'
    }
  ]

  let renderLinks = [...links]

  console.log(renderLinks)
  if (order === 'Newest') {
    renderLinks.sort((a, b) => (b.createdAt - a.createdAt))
  } else {
    renderLinks.sort((a, b) => (a.createdAt - b.createdAt))
  }

  // filter by tags
  if (selectedTags.length !== 0) {
    renderLinks = links.filter(link => {
      for (const label of selectedTags) {
        let found = false
        for (const linkTag of link.tags) {
          if (linkTag.label === label) {
            found = true
            break
          }
        }
        if (!found) {
          return false
        }
      }
      return true
    })
  }

  // finter by keyword
  if (searchValue.trim().length !== 0) {
    let keyword = escapeRegExp(searchValue.trim().toLowerCase())
    renderLinks = renderLinks.filter(link => {
      let regex = new RegExp(keyword, "i")
      if (regex.test(link.title) || regex.test(link.url) || regex.test(link.description)) {
        return true
      }
      return false
    })
  }

  return (
    <Container maxWidth="xl">
      <SearchBar
        handleSearch={handleSearch}
      />
      <div
        style={{
          width: "100%",
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: "1rem"
          }}
        >
          <TagSelector
            selectedTags={selectedTags}
            selectTag={selectTag}
            unselectTag={unselectTag}
          />
        </Container>
      </div>

      <Container
        maxWidth='sm'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
        <Typography sx={{ marginRight: '5px' }}>Order By: </Typography>
        <div style={{ width: '8rem' }}>
          <Select
            value={options.filter((option) => {
              return option.value === order
            })}
            isSearchable={false}
            options={options}
            onChange={selected => {
              setOrder(selected.value)
            }}
            isDisabled={disabled}
          />
        </div>
      </Container>

      <Box sx={{ width: "100%" }}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {renderLinks.map((link, i) => (
            <LinkCard
              key={link._id}
              title={link.title}
              url={link.url}
              tags={link.tags}
              description={link.description}
              id={link._id}
              openEditor={handleOpenEditor}
              editable={editable}
            />
          ))}
        </Masonry>
      </Box>
      <Modal
        open={edit}
        onClose={handleCloseEditor}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'fit-content',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <LinkEditor
            link={editLink}
            setEdit={setEdit}
          />
        </Box>
      </Modal>
    </Container >
  )
}

export default LinksContainer