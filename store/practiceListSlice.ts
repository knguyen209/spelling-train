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
            if (
                action.payload.title !== '' &&
                action.payload.words.length > 0
            ) {
                state.practiceLists = state.practiceLists.concat([
                    {
                        id: nanoid(),
                        title: action.payload.title,
                        words: action.payload.words.filter(
                            (w) => w.text !== ''
                        ),
                    },
                ])
            }
        },
    },
})

const { createPracticeList } = practiceListSlice.actions

export const PracticeListAction = {
    createPracticeList,
}

export default practiceListSlice.reducer
