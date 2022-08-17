import React from 'react'


import Container from '@mui/material/Container'
import LinkCard from '../LinkCard/LinkCard'

import Form from 'react-bootstrap/Form'

import Box from '@mui/material/Box'
import { Masonry } from '@mui/lab'
import SearchBar from '../common/SearchBar/SearchBar'
import { TagSelector } from '../common/TagSelector/TagSelector'
import { useSelector } from 'react-redux'
import { selectTags } from '../../redux/slice/slice'


function LinksContainer({ links }) {
  return (
    <Container
      maxWidth="xl"
      sx={{
        marginTop: "2rem"
      }}
    >
      <SearchBar />
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
        ><TagSelector selectedTags={[]} /></Container>

      </div>
      <Box sx={{ width: "100%" }}>
        <Masonry
          columns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
          spacing={2}
        >
          {links.map((link, i) => (
            <LinkCard
              key={i}
              title={link.title}
              url={link.url}
              tags={link.tags}
              description={link.description}
            />
          ))}
        </Masonry>
      </Box>
    </Container >
  )
}

export default LinksContainer