import * as React from 'react'


import Container from '@mui/material/Container'
import LinkCard from '../LinkCard/LinkCard'


import Box from '@mui/material/Box'
import { Masonry } from '@mui/lab'
import SearchBar from '../common/SearchBar/SearchBar'
import { TagSelector } from '../common/TagSelector/TagSelector'


function LinksContainer({ links }) {
  const [selectedTags, setSelectedTags] = React.useState([])
  const [searchValue, setSearchValue] = React.useState("")

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

  let renderLinks = links

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
    let keyword = searchValue.trim().toLowerCase()
    renderLinks = renderLinks.filter(link => {
      let regex = new RegExp(keyword, "i")
      if (regex.test(link.title) || regex.test(link.url) || regex.test(link.description)) {
        return true
      }
      return false
    })
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        marginTop: "2rem"
      }}
    >
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
            marginBottom: "2rem"
          }}
        >
          <TagSelector
            selectedTags={selectedTags}
            selectTag={selectTag}
            unselectTag={unselectTag}
          />
        </Container>

      </div>
      <Box sx={{ width: "100%" }}>
        <Masonry
          columns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
          spacing={2}
        >
          {renderLinks.map((link, i) => (
            <LinkCard
              key={link._id}
              title={link.title}
              url={link.url}
              tags={link.tags}
              description={link.description}
              id={link._id}
            />
          ))}
        </Masonry>
      </Box>
    </Container >
  )
}

export default LinksContainer