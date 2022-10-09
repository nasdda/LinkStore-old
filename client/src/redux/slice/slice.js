import { createSlice } from '@reduxjs/toolkit'


export const slice = createSlice({
  name: "main",
  initialState: {
    user: undefined,
    attemptedLogin: false,
    links: [],
    tags: [], // {label, backgroundColor}
    collectionUUID: undefined
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user
    },
    setTags: (state, action) => {
      action.payload.tags.sort((taga, tagb) => {
        if (taga.label.toLowerCase() > tagb.label.toLowerCase()) {
          return 1
        }
        return -1
      })
      state.tags = [...action.payload.tags]
    },
    setLinks: (state, action) => {
      state.links = [...action.payload.links]
    },
    deleteLink: (state, action) => {
      const newLinks = []
      for (let i = 0; i < state.links.length; i++) {
        if (state.links[i]._id === action.payload.id) {
          continue
        }
        newLinks.push(state.links[i])
      }
      state.links = newLinks
    },
    addTag: (state, action) => {
      state.tags.push(action.payload.tag)
      state.tags.sort((taga, tagb) => {
        if (taga.label.toLowerCase() > tagb.label.toLowerCase()) {
          return 1
        }
        return -1
      })
      state.tags = [...state.tags]
    },
    attempted: (state, action) => {
      state.attemptedLogin = true
    },
    setCollectionUUID: (state, action) => {
      state.collectionUUID = action.payload.collectionUUID
    }
  }
})


export const {
  setUser,
  setTags,
  setLinks,
  addTag,
  deleteLink,
  attempted,
  setCollectionUUID
} = slice.actions

export const selectUser = state => state.main.user
export const selectTags = state => state.main.tags
export const selectLinks = state => state.main.links
export const selectAttemptedLogin = state => state.main.attemptedLogin
export const selectCollectionUUID = state => state.main.collectionUUID

export default slice.reducer