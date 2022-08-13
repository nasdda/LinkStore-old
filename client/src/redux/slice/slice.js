import { createSlice } from '@reduxjs/toolkit'


export const slice = createSlice({
    name: "main",
    initialState: {
        user: undefined,
        links: [],
        tags: [] // {label, backgroundColor}
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user
            console.log("user set to: ", state.user)
        },
        setTags: (state, action) => {
          state.tags = action.payload.tags
          console.log("tags set to: ", state.tags)
        },
        setLinks: (state, action) => {
          state.links = action.payload.links
        }
    }
})


export const {
    setUser,
    setTags,
    setLinks
} = slice.actions

export const selectUser = state => state.main.user
export const selectTags = state => state.main.tags
export const selectLinks = state => state.main.links

export default slice.reducer