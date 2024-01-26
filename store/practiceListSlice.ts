import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import PracticeListStore from './PracticeListStore'
import {
    PracticeListItemType,
    PracticeListType,
    WordListType,
    WordType,
} from '../types/genericTypes'

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
                // state.wordLists = state.wordLists.concat([
                //     {
                //         id: nanoid(),
                //         title: action.payload.title,
                //         words: action.payload.words.filter(
                //             (w) => w.text !== ''
                //         ),
                //     },
                // ])
            }
        },
        updatePracticeList: (
            state,
            action: { payload: { practiceList: PracticeListType } }
        ) => {
            // let updatedLists = state.practiceLists.map((list) =>
            //     list.id === action.payload.practiceList.id
            //         ? {
            //               ...action.payload.practiceList,
            //               words: action.payload.practiceList.words.filter(
            //                   (w) => w.text !== ''
            //               ),
            //           }
            //         : list
            // )
            // state.practiceLists = updatedLists
        },
        deletePracticeList: (state, action: { payload: { id: string } }) => {
            // let updatedLists = state.practiceLists.filter(
            //     (list) => list.id !== action.payload.id
            // )
            // state.practiceLists = updatedLists
        },
    },
    extraReducers: (builder) => {
        // Fetch word lists
        builder.addCase(fetchWordLists.pending, (state) => {
            state.fetchingWordLists = true
        })
        builder.addCase(fetchWordLists.fulfilled, (state, action) => {
            state.wordLists = action.payload
            state.fetchingWordLists = false
        })
        builder.addCase(fetchWordLists.rejected, (state) => {
            state.fetchingWordLists = false
        })

        // Fetch word data
        builder.addCase(fetchWordData.pending, (state) => {
            state.fetchingWordData = true
        })
        builder.addCase(fetchWordData.fulfilled, (state, action) => {
            state.fetchingWordData = false
            state.wordData = action.payload
        })
        builder.addCase(fetchWordData.rejected, (state) => {
            state.fetchingWordData = false
        })

        // Generate word list by Generative AI
        builder.addCase(generateWordList.pending, (state) => {
            state.generatingWordList = true
        })
        builder.addCase(generateWordList.fulfilled, (state, action) => {
            state.generatingWordList = false
            console.log(action.payload)
            state.generatedWordList = action.payload
        })
        builder.addCase(generateWordList.rejected, (state) => {
            state.generatingWordList = false
        })
    },
})

const { createPracticeList, updatePracticeList, deletePracticeList } =
    practiceListSlice.actions

export const PracticeListAction = {
    createPracticeList,
    updatePracticeList,
    deletePracticeList,
}

export default practiceListSlice.reducer

/**
 * Asynchronous function to fetch the list of word lists -- by user id
 */
export const fetchWordLists = createAsyncThunk(
    'get/practice-lists',
    async (): Promise<[WordListType]> => {
        const response = await fetch('http://127.0.0.1:8000/word-lists/get-all')
        return await response.json()
    }
)

/**
 * Asynchronous function to fetch the metadata of a word
 */
export const fetchWordData = createAsyncThunk(
    'get/word-data',
    async (id: number): Promise<WordType> => {
        const response = await fetch(
            'http://127.0.0.1:8000/word-lists/words/' + id
        )
        return await response.json()
    }
)

/**
 * Asynchronous function to fetch a word list by the list id
 */
export const fetchWordList = createAsyncThunk(
    'get/word-list',
    async (id: number): Promise<WordListType> => {
        const response = await fetch('http://127.0.0.1:8000/word-lists/' + id)
        return await response.json()
    }
)

/**
 * Asynchronous function to generate a word list using Generative AI
 */
export const generateWordList = createAsyncThunk(
    'get/generate-word-list',
    async (topicName: string): Promise<WordListType> => {
        const response = await fetch(
            'http://127.0.0.1:8000/word-lists/?topic=' + topicName
        )
        return await response.json()
    }
)
