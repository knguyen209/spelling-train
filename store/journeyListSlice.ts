import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import JourneyListStore from './JourneyListStore'
import {
    GameTypes,
    IJourneyGame,
    JourneyLevelType,
    JourneyType,
    WordListType,
    WordType,
} from '../types/genericTypes'
import { nanoid } from 'nanoid/non-secure'
import { randomInRange, shuffleArray } from '../utils'

const initialState = JourneyListStore

export const journeyListSlice = createSlice({
    name: 'journeyListSlice',
    initialState,
    reducers: {
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
    },
    extraReducers: (builder) => {
        // Generate journey games
        builder.addCase(generateJourney.pending, (state) => {
            state.generatingJourney = true
        })
        builder.addCase(generateJourney.fulfilled, (state, action) => {
            state.journeys.push(action.payload)
            state.generatingJourney = false
        })
        builder.addCase(generateJourney.rejected, (state) => {
            state.generatingJourney = false
        })

        builder.addCase(generateJourneyByWordList.pending, (state) => {
            state.generatingJourney = true
        })
        builder.addCase(
            generateJourneyByWordList.fulfilled,
            (state, action) => {
                state.journeys.push(action.payload)
                state.generatingJourney = false
            }
        )
        builder.addCase(generateJourneyByWordList.rejected, (state) => {
            state.generatingJourney = false
        })
    },
})

const { setSelectedJourneyLevel, completeJourneyLevel } =
    journeyListSlice.actions

export const JourneyListAction = {
    setSelectedJourneyLevel,
    completeJourneyLevel,
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
    const practiceList: WordListType = await response.json()

    return createJourneyByWordList(practiceList)
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
        let game = generateRandomJourneyLevelGame(words)
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
        words: shuffleArray(words).slice(
            0,
            words.length > 4 ? 4 : words.length
        ),
    }

    return journeyGame
}

export default journeyListSlice.reducer
