import { configureStore } from '@reduxjs/toolkit'

import practiceListReducer from './practiceListSlice'
import journeyListReducer from './journeyListSlice'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const store = configureStore({
    reducer: {
        practiceList: practiceListReducer,
        journeyList: journeyListReducer,
    },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
