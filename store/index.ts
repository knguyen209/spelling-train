import { configureStore } from '@reduxjs/toolkit'

import practiceListReducer from './practiceListSlice'

const store = configureStore({
    reducer: {
        practiceList: practiceListReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export default store
