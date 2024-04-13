import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import SpellTrainStore from './SpellTrainStore'

import axios, { AxiosResponse } from 'axios'
import {
    GameTypes,
    IJourneyGame,
    JourneyLevelType,
    JourneyStationLevelType,
    JourneyType,
    PracticeListItemType,
    PracticeListType,
    UserType,
    WordListType,
    WordType,
} from '../types/genericTypes'
import { randomInRange, shuffleArray } from '../utils'

const initialState = SpellTrainStore

const backEndUrl = process.env.EXPO_PUBLIC_BACK_END_BASE_URL
const portNumber = process.env.EXPO_PUBLIC_BACK_END_PORT_NUM
const baseUrl = backEndUrl + ':' + portNumber

export const spellTrainSlice = createSlice({
    name: 'spellTrain',
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

        setSelectedJourneyLevel: (
            state,
            action: {
                payload: { journeyLevel: JourneyStationLevelType } //{ journeyId: string; journeyLevel: JourneyLevelType }
                type: string
            }
        ) => {
            // state.selectedJourneyId = action.payload.journeyId
            // state.selectedLevel = action.payload.journeyLevel
            state.selectedJourneyLevel = action.payload.journeyLevel
        },
        completeJourneyLevel: (
            state,
            action: {
                payload: { journeyLevel: JourneyStationLevelType }
                type: string
            }
        ) => {
            const { journeyLevel } = action.payload
            // state.journeyLevels.map((level) => level.id === journeyLevel.id && level.gameId === journeyLevel.gameId && level.level === journeyLevel.level ? { ...level, })
            const updatedJourney = state.journeys.map((j) =>
                j.id === state.selectedJourneyId
                    ? {
                          ...j,
                          levels: j.levels.map((l) =>
                              l.id === state.selectedLevel?.id
                                  ? { ...l, isCompleted: true }
                                  : l
                          ),
                      }
                    : j
            )
            state.journeys = updatedJourney
        },

        signOut: (state) => {
            state.user = undefined
            state.userSignInSuccess = false
            state.userSignInError = false
            state.userSigningIn = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state) => {
            state.userSigningIn = true
            state.userSignInSuccess = false
            state.userSignInError = false
        })
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.userSigningIn = false
            if (action.payload) {
                state.user = action.payload as UserType
                state.userSignInSuccess = true
                state.userSignInError = false
            } else {
                state.userSignInSuccess = false
                state.userSignInError = true
            }
        })
        builder.addCase(signIn.rejected, (state, action) => {
            state.userSigningIn = false
            state.userSignInSuccess = false
            state.userSignInError = true
        })

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

        // Generate word list by Generative AI
        builder.addCase(generateWordList.pending, (state) => {
            state.generatingWordList = true
            state.generatedWordList = undefined
        })
        builder.addCase(generateWordList.fulfilled, (state, action) => {
            state.generatingWordList = false
            state.generatedWordList = action.payload
            if (
                state.wordLists.find((i) => i.id === action.payload.id) ===
                undefined
            ) {
                state.wordLists.push(action.payload)
            }
        })
        builder.addCase(generateWordList.rejected, (state) => {
            state.generatingWordList = false
            state.generatedWordList = undefined
        })

        // Create custom word list - i.e. manually enter words
        builder.addCase(createCustomWordList.pending, (state) => {
            resetManipulatingState(state)

            state.creatingCustomWordList = true
            state.creatingCustomWordListError = false
            state.creatingCustomWordListSuccess = false
        })
        builder.addCase(createCustomWordList.fulfilled, (state, action) => {
            state.creatingCustomWordList = false

            if (action.payload) {
                state.wordLists.push(action.payload)
                state.creatingCustomWordListError = false
                state.creatingCustomWordListSuccess = true
            } else {
                state.creatingCustomWordListError = true
                state.creatingCustomWordListSuccess = false
            }
        })
        builder.addCase(createCustomWordList.rejected, (state, action) => {
            state.creatingCustomWordList = false
            state.creatingCustomWordListError = true
            state.creatingCustomWordListSuccess = false
            state.creatingCustomWordListErrorMessage = String(action.payload)
        })

        // Update word list
        builder.addCase(updateWordList.pending, (state) => {
            resetManipulatingState(state)

            state.updatingWordList = true
            state.updatingWordListError = false
            state.updatingWordListSuccess = false
        })
        builder.addCase(updateWordList.fulfilled, (state, action) => {
            state.updatingWordList = false

            if (action.payload && typeof action.payload === 'object') {
                state.updatingWordList = false
                state.updatingWordListError = false
                state.updatingWordListSuccess = true

                const updatedWordList = action.payload

                const updatedWordLists = state.wordLists.map((list) =>
                    list.id === updatedWordList.id ? updatedWordList : list
                )
                state.wordLists = updatedWordLists
            } else {
                state.updatingWordListError = true
                state.updatingWordListSuccess = false
            }
        })
        builder.addCase(updateWordList.rejected, (state, action) => {
            state.updatingWordList = false
            state.updatingWordListError = true
            state.updatingWordListSuccess = false
            state.updatingWordListErrorMessage = String(action.payload)
        })

        // Delete a word list
        builder.addCase(deleteWordList.pending, (state) => {
            resetManipulatingState(state)

            state.deletingWordList = true
            state.deletingWordListSuccess = false
            state.deletingWordListError = false
        })
        builder.addCase(deleteWordList.fulfilled, (state, action) => {
            state.deletingWordList = false
            if (action.payload) {
                state.deletingWordListSuccess = true
                state.deletingWordListError = false
                const updatedWordLists = state.wordLists.filter(
                    (w) => w.id != action.payload.id
                )
                state.wordLists = updatedWordLists
            } else {
                state.deletingWordListSuccess = false
                state.deletingWordListError = true
            }
        })
        builder.addCase(deleteWordList.rejected, (state) => {
            state.deletingWordList = false
            state.deletingWordListSuccess = false
            state.deletingWordListError = true
        })

        // Deleting words by ids
        builder.addCase(deleteWords.pending, (state) => {
            resetManipulatingState(state)

            state.deletingWords = true
            state.deletingWordsSuccess = false
            state.deletingWordsError = false
        })
        builder.addCase(deleteWords.fulfilled, (state, action) => {
            resetManipulatingState(state)

            const { listId, deletedWords } = action.payload
            const deletedWordIds = deletedWords.map((w) => w.id)

            const updatedWordLists = state.wordLists.map((list) =>
                list.id === listId
                    ? {
                          ...list,
                          words: list.words.filter(
                              (w) => !deletedWordIds.includes(w.id)
                          ),
                      }
                    : list
            )
            state.wordLists = updatedWordLists
            state.deletingWords = false
            state.deletingWordsSuccess = true
            state.deletingWordsError = false
        })
        builder.addCase(deleteWords.rejected, (state) => {
            resetManipulatingState(state)

            state.deletingWords = false
            state.deletingWordsSuccess = false
            state.deletingWordsError = true
        })

        // Generate journey games
        builder.addCase(generateJourney.pending, (state) => {
            state.generatingJourney = true
            state.generatingJourneySuccess = false
            state.generatingJourneyError = false
        })
        builder.addCase(generateJourney.fulfilled, (state, action) => {
            state.journeys.push(action.payload)
            state.generatingJourney = false
            state.generatingJourneySuccess = true
            state.generatingJourneyError = false
        })
        builder.addCase(generateJourney.rejected, (state) => {
            state.generatingJourney = false
            state.generatingJourneySuccess = false
            state.generatingJourneyError = true
        })

        // Generate journey games by word list
        builder.addCase(generateJourneyByWordList.pending, (state) => {
            state.generatingJourney = true
            state.generatingJourneySuccess = false
            state.generatingJourneyError = false
        })
        builder.addCase(
            generateJourneyByWordList.fulfilled,
            (state, action) => {
                state.journeys.push(action.payload)
                state.generatingJourney = false
                state.generatingJourneySuccess = true
                state.generatingJourneyError = false
            }
        )
        builder.addCase(generateJourneyByWordList.rejected, (state) => {
            state.generatingJourney = false
            state.generatingJourneySuccess = false
            state.generatingJourneyError = true
        })

        builder.addCase(generateJourneyGames.pending, (state) => {
            state.generatingJourneyLevels = true
            state.generatingJourneyLevelsSuccess = false
            state.generatingJourneyLevelsError = false
            state.generatingJourneyLevelsErrorMessage = ''
        })
        builder.addCase(generateJourneyGames.fulfilled, (state, action) => {
            // console.log(action.payload.levels)
            state.generatingJourneyLevels = false
            state.generatingJourneyLevelsSuccess = true
            state.generatingJourneyLevelsError = false
            state.generatingJourneyLevelsErrorMessage = ''

            let levels: Array<JourneyStationLevelType> = action.payload
            state.journeyLevels = levels
        })
        builder.addCase(generateJourneyGames.rejected, (state) => {
            console.log('rejected generating journey station games')
            state.generatingJourneyLevels = false
            state.generatingJourneyLevelsSuccess = false
            state.generatingJourneyLevelsError = true
            state.generatingJourneyLevelsErrorMessage = ''
        })
    },
})

const resetManipulatingState = (state: any) => {
    state.creatingCustomWordList = false
    state.creatingCustomWordListError = false
    state.creatingCustomWordListSuccess = false
    state.creatingCustomWordListErrorMessage = ''

    state.updatingWordList = false
    state.updatingWordListError = false
    state.updatingWordListSuccess = false
    state.updatingWordListErrorMessage = ''

    state.deletingWordList = false
    state.deletingWordListSuccess = false
    state.deletingWordListError = false
    state.deletingWordListErrorMessage = ''

    state.deletingWords = false
    state.deletingWordsSuccess = false
    state.deletingWordsError = false
    state.deletingWordListErrorMessage = ''
}

const {
    createPracticeList,
    updatePracticeList,
    deletePracticeList,
    setSelectedJourneyLevel,
    completeJourneyLevel,
    signOut,
} = spellTrainSlice.actions

export const SpellTrainAction = {
    createPracticeList,
    updatePracticeList,
    deletePracticeList,

    setSelectedJourneyLevel,
    completeJourneyLevel,

    signOut,
}

export default spellTrainSlice.reducer

export const createAccount = async (
    name: string,
    email: string,
    phone: string,
    password: string
) => {
    const url = `${baseUrl}/users/`
    try {
        const response = await axios.post(url, {
            name: name,
            email: email,
            phone: phone,
            password: password,
            wordLists: [],
        })

        if (response.status === 200) {
            return {
                isSuccess: true,
                message: 'Account created successfully.',
            }
        }

        if (response.status === 400) {
            return {
                isSuccess: false,
                message: response.data.detail,
            }
        }
    } catch (e: any) {
        return {
            isSuccess: false,
            message: e.response.data.detail,
        }
    } finally {
        return {
            isSuccess: false,
            message: 'Error creating your account. Please try again.',
        }
    }
}

export const signIn = createAsyncThunk(
    'post/login',
    async (credential: {
        email: string
        password: string
    }): Promise<UserType | string | undefined> => {
        const url = `${baseUrl}/users/login`
        try {
            const response = await axios.post(url, credential)
            if (response.status === 200) {
                return response.data
            } else {
                return undefined
            }
        } catch (e: any) {
            return undefined
        }
    }
)

/**
 * Asynchronous function to fetch the list of word lists -- by user id
 */
export const fetchWordLists = createAsyncThunk(
    'get/practice-lists',
    async (request: { token: string }): Promise<[WordListType]> => {
        const url = `${baseUrl}/word-lists/get-all`
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${request.token}` },
        })
        return response.data
    }
)

/**
 * Asynchronous function to fetch the metadata of a word
 */
export const fetchWordData = async (id: number | string, token: string) => {
    const url = `${baseUrl}/word-lists/words/${id}`
    const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
}

/**
 * Asynchronous function to fetch a word list by the list id
 */
export const fetchWordList = createAsyncThunk(
    'get/word-list',
    async (id: number): Promise<WordListType> => {
        const response = await fetch(`${baseUrl}/word-lists/${id}`)
        return await response.json()
    }
)

/**
 * Asynchronous function to generate a word list using Generative AI
 */
export const generateWordList = createAsyncThunk(
    'get/generate-word-list',
    async (request: {
        topicName: string
        token: string
    }): Promise<WordListType> => {
        return await createWordList(request.topicName, request.token)
    }
)

export const createCustomWordList = createAsyncThunk(
    'put/create-custom-word-list',
    async (
        request: {
            wordList: WordListType
            token: string
        },
        { rejectWithValue }
    ) => {
        const url = `${baseUrl}/word-lists/`
        const words = request.wordList.words.filter((w) => w.word.length > 0)
        try {
            const response = await axios.put(
                url,
                { title: request.wordList.title, words: words },
                {
                    headers: {
                        Authorization: `Bearer ${request.token}`,
                    },
                }
            )
            return response.data
        } catch (err: any) {
            return rejectWithValue(
                err.response.data.detail || 'Error updating word list.'
            )
        }
    }
)

export const updateWordList = createAsyncThunk(
    'patch/update-word-list',
    async (
        request: {
            wordList: WordListType
            token: string
        },
        { rejectWithValue }
    ) => {
        const updateTitleUrl = `${baseUrl}/word-lists/`
        const wordsUrl = `${baseUrl}/word-lists/words`

        const updateWords = request.wordList.words.filter(
            (w) => typeof w.id === 'number' && w.word.length > 0
        )
        let newWords = request.wordList.words
            .filter((w) => typeof w.id !== 'number' && w.word.length > 0)
            .map((w) => ({ word: w.word, wordListId: request.wordList.id }))

        if (newWords.length > 0) {
            try {
                const response = await axios
                    .patch(
                        updateTitleUrl,
                        {
                            id: request.wordList.id,
                            title: request.wordList.title,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${request.token}`,
                            },
                        }
                    )
                    .then(() =>
                        axios.patch(wordsUrl, updateWords, {
                            headers: {
                                Authorization: `Bearer ${request.token}`,
                            },
                        })
                    )
                    .then(() =>
                        axios.post(wordsUrl, newWords, {
                            headers: {
                                Authorization: `Bearer ${request.token}`,
                            },
                        })
                    )

                let updatedWordList: WordListType = response.data
                return updatedWordList
            } catch (err: any) {
                return rejectWithValue(
                    err.response.data.detail || 'Error updating word list.'
                )
            }
        } else {
            try {
                const response = await axios
                    .patch(
                        updateTitleUrl,
                        {
                            id: request.wordList.id,
                            title: request.wordList.title,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${request.token}`,
                            },
                        }
                    )
                    .then(() =>
                        axios.patch(wordsUrl, updateWords, {
                            headers: {
                                Authorization: `Bearer ${request.token}`,
                            },
                        })
                    )

                let updatedWordList: WordListType = response.data
                return updatedWordList
            } catch (err: any) {
                return rejectWithValue(
                    err.response.data.detail || 'Error updating word list.'
                )
            }
        }
    }
)

export const deleteWordList = createAsyncThunk(
    'delete/word-list',
    async (request: {
        id: number | string
        token: string
    }): Promise<WordListType> => {
        const url = `${baseUrl}/word-lists/?word_list_id=${request.id}`

        const response = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${request.token}`,
            },
        })
        return response.data
    }
)

export const deleteWords = createAsyncThunk(
    'delete/words',
    async (request: {
        listId: number | string
        ids: number[]
        token: string
    }): Promise<{ listId: number | string; deletedWords: Array<WordType> }> => {
        let deleteIdsUrl = 'word_ids=' + request.ids.join('&word_ids=')
        const url = `${baseUrl}/word-lists/words?${deleteIdsUrl}`

        const response = await axios.delete(url, {
            headers: { Authorization: `Bearer ${request.token}` },
        })
        return { listId: request.listId, deletedWords: response.data }
    }
)

export const createWordList = async (topicName: string, token: string) => {
    const url = `${baseUrl}/word-lists/?topic=${topicName}`

    const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
}

export const generateJourneyGames = createAsyncThunk(
    'get/generate-journey-games',
    async (request: { id: number | string; token: string }) => {
        const url = `${baseUrl}/games/?word_list_id=${request.id}`
        const response = await axios.post(
            url,
            {},
            { headers: { Authorization: `Bearer ${request.token}` } }
        )
        return response.data
    }
)

export const generateJourney = createAsyncThunk(
    'get/generate-journey-levels',
    async (topicName: string): Promise<JourneyType> => {
        return await createJourney(topicName)
    }
)

export const generateJourneyByWordList = createAsyncThunk(
    'get/generate-journey-levels-by-word-list',
    async (wordList: WordListType): Promise<JourneyType> => {
        return await createJourneyByWordList(wordList)
    }
)

export const createJourney = async (topicName: string) => {
    const response = await fetch(`${baseUrl}/word-lists/?topic=${topicName}`)
    const wordList: WordListType = await response.json()

    return createJourneyByWordList(wordList)
}

export const createJourneyByWordList = (wordList: WordListType) => {
    const numLevels = 3
    const numGameMultiplier = 3

    let journey: JourneyType = {
        id: nanoid(),
        title: wordList.title,
        levels: [],
    }

    for (let i = 1; i <= numLevels; i++) {
        const journeyLevel = generateJourneyLevel(
            wordList.words,
            i,
            i * numGameMultiplier
        )
        journey.levels.push(journeyLevel)
    }

    return journey
}

const generateJourneyLevel = (
    words: Array<WordType>,
    level: number,
    numGames: number
) => {
    let levelObj: JourneyLevelType = {
        id: nanoid(),
        level: level,
        games: [],
        isCompleted: false,
    }
    for (let i = 0; i < numGames; i++) {
        let arr = Array.from({ length: words.length }, (_, index) => index)
        let shuffledArr = shuffleArray(arr)
        let shuffledWords = shuffledArr.map((i) => words[i])
        let game = generateRandomJourneyLevelGame(shuffledWords)
        levelObj.games.push(game)
    }
    return levelObj
}

const generateRandomJourneyLevelGame = (words: Array<WordType>) => {
    const gameTypes: GameTypes[] = [
        'choose-spoken-word',
        'find-missing-letter',
        'right-usage',
    ]

    const randomGameType = gameTypes[randomInRange(gameTypes.length)]
    // const shuffledWords = shuffleArray(words)
    let journeyGame: IJourneyGame = {
        id: nanoid(),
        gameType: randomGameType,
        // Get first 4 words of the shuffled array
        words: words.slice(0, 4),
        gameTitle: '',
    }

    return journeyGame
}
