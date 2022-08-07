import { configureStore } from '@reduxjs/toolkit'
import mainReducer from '../slice/slice'

export default configureStore({
    reducer: {
        main: mainReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})