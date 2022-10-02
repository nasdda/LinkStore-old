import { createSlice } from '@reduxjs/toolkit'


export const slice = createSlice({
  name: "main",
  initialState: {
    user: undefined,
    attemptedLogin: false,
    links: [],
    tags: [] // {label, backgroundColor}
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user
      console.log("user set to: ", state.user)
    },
    setTags: (state, action) => {
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
      state.tags = [...state.tags]
    },
    attempted: (state, action) => {
      state.attemptedLogin = true
      console.log("ATTEMPED")
    }
  }
})


export const {
  setUser,
  setTags,
  setLinks,
  addTag,
  deleteLink,
  attempted
} = slice.actions

export const selectUser = state => state.main.user
export const selectTags = state => state.main.tags
export const selectLinks = state => state.main.links
export const selectAttemptedLogin = state => state.main.attemptedLogin

export default slice.reducer