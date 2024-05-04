import {
    JourneyLevelType,
    JourneyStationLevelType,
    JourneyType,
    PracticeListType,
    UserType,
    WordListType,
    WordType,
} from './genericTypes'

export type PracticeListStateType = {
    fetchingPracticeLists: boolean
    practiceLists: Array<PracticeListType>
    wordLists: Array<WordListType>
}

export type JourneyListStateType = {
    journeys: Array<JourneyType>
    selectedJourneyId: string | undefined
    selectedLevel: JourneyLevelType | undefined
    generatingJourney: boolean
}

export type SpellingTrainStateType = {
    fetchingWordLists: boolean
    wordLists: Array<WordListType>

    fetchingWordData: boolean
    wordData: WordType | undefined

    generatingWordList: boolean
    generatedWordList: WordListType | undefined
}

export type AccountStateType = {
    user: UserType | undefined
    userSigningIn: boolean
    userSignInSuccess: boolean
    userSignInError: boolean
}

export type StoreType = {
    practiceList: SpellingTrainStateType
}

export type SpellTrainStateType = {
    user: UserType | undefined

    registeringAccount: boolean
    registerAccountSuccess: boolean
    registerAccountError: boolean
    registerAccountErrorMessage: string

    userSigningIn: boolean
    userSignInSuccess: boolean
    userSignInError: boolean

    journeyLevels: Array<JourneyStationLevelType>
    selectedJourneyLevel: JourneyStationLevelType | undefined
    generatingJourneyLevels: boolean
    generatingJourneyLevelsSuccess: boolean
    generatingJourneyLevelsError: boolean
    generatingJourneyLevelsErrorMessage: string

    journeys: Array<JourneyType>
    selectedJourneyId: string | undefined
    selectedLevel: JourneyLevelType | undefined
    generatingJourney: boolean
    generatingJourneySuccess: boolean
    generatingJourneyError: boolean

    fetchingWordLists: boolean
    wordLists: Array<WordListType>

    fetchingWordData: boolean
    wordData: WordType | undefined

    generatingWordList: boolean
    generatingWordListSuccess: boolean
    generatingWordListError: boolean
    generatingWordListErrorMessage: string
    generatedWordList: WordListType | undefined

    creatingCustomWordList: boolean
    creatingCustomWordListSuccess: boolean
    creatingCustomWordListError: boolean
    creatingCustomWordListErrorMessage: string

    updatingWordList: boolean
    updatingWordListSuccess: boolean
    updatingWordListError: boolean
    updatingWordListErrorMessage: string

    deletingWordList: boolean
    deletingWordListSuccess: boolean
    deletingWordListError: boolean
    deletingWordListErrorMessage: string

    deletingWords: boolean
    deletingWordsSuccess: boolean
    deletingWordsError: boolean
    deletingWordsErrorMessage: string

    markingStationCompleted: boolean
    markingStationCompletedSuccess: boolean
    markingStationCompletedError: boolean
    markingStationCompletedErrorMessage: string
}
