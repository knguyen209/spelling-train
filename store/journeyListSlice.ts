import { createAction, createSlice } from '@reduxjs/toolkit'
import JourneyListStore from './JourneyListStore'
import { JourneyLevelType } from '../types/genericTypes'

const initialState = JourneyListStore

export const journeyListSlice = createSlice({
    name: 'journeyListSlice',
    initialState,
    reducers: {
        setSelectedJourneyLevel: (
            state,
            action: {
                payload: { journeyLevel: JourneyLevelType }
                type: string
            }
        ) => {
            state.selectedLevel = action.payload.journeyLevel
        },
    },
})

const { setSelectedJourneyLevel } = journeyListSlice.actions

export const JourneyListAction = {
    setSelectedJourneyLevel,
}

export default journeyListSlice.reducer
