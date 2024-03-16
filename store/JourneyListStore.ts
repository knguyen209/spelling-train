import { nanoid } from '@reduxjs/toolkit'
import { JourneyListStateType } from '../types/stateType'
import { IMissingLetterGame, ISpokenWordGame } from '../types/genericTypes'

const JourneyListStore: JourneyListStateType = {
    journeys: [
        {
            id: nanoid(),
            title: 'Journey 1',
            levels: [
                {
                    id: nanoid(),
                    level: 1,
                    games: [
                        {
                            gameType: 'find-missing-letter',
                            words: [
                                'interface',
                                'password',
                                'terminal',
                                'malware',
                            ],
                        } as IMissingLetterGame,
                        {
                            gameType: 'choose-spoken-word',
                            words: [
                                'interface',
                                'password',
                                'terminal',
                                'malware',
                            ],
                        } as ISpokenWordGame,
                    ],
                    isCompleted: false,
                },
                {
                    id: nanoid(),
                    level: 2,
                    games: [],
                    isCompleted: false,
                },
                {
                    id: nanoid(),
                    level: 3,
                    games: [],
                    isCompleted: false,
                },
                {
                    id: nanoid(),
                    level: 4,
                    games: [],
                    isCompleted: false,
                },
                {
                    id: nanoid(),
                    level: 5,
                    games: [],
                    isCompleted: false,
                },
                {
                    id: nanoid(),
                    level: 6,
                    games: [],
                    isCompleted: false,
                },
            ],
        },
    ],
    selectedLevel: undefined,
}

export default JourneyListStore
