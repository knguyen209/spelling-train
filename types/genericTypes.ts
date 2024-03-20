export type PracticeListItemType = {
    id: string
    text: string
}

export type PracticeListType = {
    id: string
    title: string
    words: Array<PracticeListItemType>
}

export type MessageType = {
    type: 'player' | 'ai'
    text: string
}

export type WordMeaningType = {
    partOfSpeech: string
    definitions: Array<string>
    synonyms: Array<string>
}

export type WordMetaDataType = {
    audio: Array<string>
    meanings: Array<WordMeaningType>
}

export type PracticeWordMeaningType = {
    partOfSpeech: string
    definitions: Array<string>
    synonyms: Array<string>
}

export type PracticeWordMetaDataType = {
    text: string
    audio: string
    meaning: PracticeWordMeaningType
}

export type PracticeResultType = {
    noQuestions: number
    noCorrect: number
    noHintsUsed: number
    totalTime: number
}

export type WordListType = {
    id: number
    title: string
    ownerId: number
    words: Array<WordType>
}

export type WordType = {
    id: number
    word: string
    definition?: string
    rootOrigin?: string
    usage?: string
    languageOrigin?: string
    partsOfSpeech?: string
    alternatePronunciation?: string
    audioUrl?: string
}

export type JourneyType = {
    id: string
    title: string
    levels: Array<JourneyLevelType>
}

export type JourneyLevelType = {
    id: string
    level: number
    games: Array<IJourneyGame>
    isCompleted: boolean
}

export interface IJourneyGame {
    id: string
    gameType:
        | 'spell-word'
        | 'quiz'
        | 'right-usage'
        | 'match-origin-pair'
        | 'choose-spoken-word'
        | 'find-missing-letter'
    words: Array<WordType>
}

export type GameTypes = IJourneyGame['gameType']

// export interface ISpellWordGame extends IJourneyGame {
//     words: Array<string>
// }

// export interface IQuizGame extends IJourneyGame {
//     question: string
//     options: Array<string>
//     correctOption: string
// }

// export interface IMatchPronunciationGame extends IJourneyGame {
//     pairs: Map<string, string>
// }

// export interface IMatchOriginGame extends IJourneyGame {
//     pairs: Map<string, string>
// }

// export interface IRightUsageGame extends IJourneyGame {
//     words: Array<string>
// }

// export interface IMissingLetterGame extends IJourneyGame {
//     words: Array<string>
// }

// export interface ISpokenWordGame extends IJourneyGame {
//     words: Array<string>
// }

export type SentenceType = {
    firstSentence: string
    middleSentence: string
    lastSentence: string
}

export type GameContainerControlHandle = {
    onNextClick: () => void
}

export type UserType = {
    name: string
    email: string
    phone: string
    password?: string
    accessToken?: string
    isActive?: boolean
}

interface IWithTabsProps {
    title: string
    icon?: string
    tabs: string[]
    activeTab: string
    onSelectTab: (tab: string) => void
}

interface IWithOutTabsProps extends Pick<IWithTabsProps, 'title' | 'icon'> {}
