import {
    JourneyLevelType,
    JourneyType,
    PracticeListType,
    WordListType,
    WordType,
} from './genericTypes'

export type PracticeListStateType = {
    fetchingPracticeLists: boolean
    practiceLists: Array<PracticeListType>
    wordLists: Array<WordListType>

    // creatingPracticeList: boolean
    // createPracticeListSuccess: boolean
    // createPracticeListError: boolean

    // updatingPracticeList: boolean
    // updatePracticeListSuccess: boolean
    // updatePracticeListError: boolean

    // deletingPracticeList: boolean
    // deletePracticeListSuccess: boolean
    // deletePracticeListError: boolean
}

export type JourneyListStateType = {
    journeys: Array<JourneyType>
    selectedLevel: JourneyLevelType | undefined
}

export type SpellingTrainStateType = {
    fetchingWordLists: boolean
    wordLists: Array<WordListType>

    fetchingWordData: boolean
    wordData: WordType | undefined

    generatingWordList: boolean
    generatedWordList: WordListType | undefined
}

export type StoreType = {
    practiceList: SpellingTrainStateType
}
