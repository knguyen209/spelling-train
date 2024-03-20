import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import SpellTrainStore from './SpellTrainStore'

import axios from 'axios'
import {
    GameTypes,
    IJourneyGame,
    JourneyLevelType,
    JourneyType,
    PracticeListItemType,
    PracticeListType,
    UserType,
    WordListType,
    WordType,
} from '../types/genericTypes'
import { randomInRange, shuffleArray } from '../utils'

const initialState = SpellTrainStore

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
                payload: { journeyId: string; journeyLevel: JourneyLevelType }
                type: string
            }
        ) => {
            state.selectedJourneyId = action.payload.journeyId
            state.selectedLevel = action.payload.journeyLevel
        },
        completeJourneyLevel: (
            state,
            action: {
                payload: { journeyLevel: JourneyLevelType }
                type: string
            }
        ) => {
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
                state.user = action.payload
                state.userSignInSuccess = true
                state.userSignInError = false
            } else {
                state.userSignInError = true
                state.userSignInSuccess = false
            }
        })
        builder.addCase(signIn.rejected, (state) => {
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
    },
})

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
    const url = 'http://127.0.0.1:8000/users/'
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
    }): Promise<UserType | undefined> => {
        const url = 'http://127.0.0.1:8000/users/login'
        try {
            const response = await axios.post(url, credential)
            if (response.status === 200) {
                return response.data
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
        // const response = await fetch('http://127.0.0.1:8000/word-lists/get-all')
        const url = 'http://127.0.0.1:8000/word-lists/get-all'
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${request.token}` },
        })
        return response.data
    }
)

/**
 * Asynchronous function to fetch the metadata of a word
 */
export const fetchWordData = async (id: number, token: string) => {
    const url = `http://127.0.0.1:8000/word-lists/words/${id}`
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
        const response = await fetch('http://127.0.0.1:8000/word-lists/' + id)
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

export const createWordList = async (topicName: string, token: string) => {
    const url = `http://127.0.0.1:8000/word-lists/?topic=${topicName}`

    const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
}

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
    const response = await fetch(
        'http://127.0.0.1:8000/word-lists/?topic=' + topicName
    )
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
    }

    return journeyGame
}
