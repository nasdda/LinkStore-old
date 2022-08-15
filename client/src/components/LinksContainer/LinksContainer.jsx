import React from 'react'


import Container from '@mui/material/Container';
import LinkCard from '../LinkCard/LinkCard';

import Box from '@mui/material/Box';

import { Masonry } from '@mui/lab';

function LinksContainer({ links }) {
  console.log('rendering links:', links)

  return (
    <Container
      maxWidth="xl"
      sx={{
        marginTop: "2rem"
      }}
    >
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