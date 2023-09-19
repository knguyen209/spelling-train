import { createSlice, nanoid } from '@reduxjs/toolkit'
import PracticeListStore from './PracticeListStore'
import { PracticeListItemType } from '../types/genericTypes'

const initialState = PracticeListStore

export const practiceListSlice = createSlice({
    name: 'practiceList',
    initialState,
    reducers: {
        createPracticeList: (
            state,
            action: {
                payload: { title: string; words: Array<PracticeListItemType> }
                type: string
            }
        ) => {
            state.practiceLists = state.practiceLists.concat([
                {
                    id: nanoid(),
                    title: action.payload.title,
                    words: action.payload.words,
                },
            ])
        },
    },
})

const { createPracticeList } = practiceListSlice.actions

export const PracticeListAction = {
    createPracticeList,
}

export default practiceListSlice.reducer
