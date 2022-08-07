import { createSlice } from '@reduxjs/toolkit'


export const slice = createSlice({
    name: "main",
    initialState: {
        user: undefined
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user
            console.log("USER SET TO: ", state.user)
        },
    }
})


export const {
    setUser
} = slice.actions

export const selectUser = state => state.main.user

export default slice.reducer