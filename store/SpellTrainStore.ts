import { SpellTrainStateType } from '../types/stateType'

const SpellTrainStore: SpellTrainStateType = {
    fetchingWordLists: false,
    wordLists: [],

    fetchingWordData: false,
    wordData: undefined,

    generatingWordList: false,
    generatingWordListSuccess: false,
    generatingWordListError: false,
    generatingWordListErrorMessage: '',
    generatedWordList: undefined,

    journeys: [],
    selectedJourneyId: undefined,
    selectedLevel: undefined,

    generatingJourney: false,
    generatingJourneySuccess: false,
    generatingJourneyError: false,

    user: undefined,
    userSigningIn: false,
    userSignInError: false,
    userSignInSuccess: false,

    registeringAccount: false,
    registerAccountSuccess: false,
    registerAccountError: false,
    registerAccountErrorMessage: '',

    creatingCustomWordList: false,
    creatingCustomWordListSuccess: false,
    creatingCustomWordListError: false,
    creatingCustomWordListErrorMessage: '',

    updatingWordList: false,
    updatingWordListSuccess: false,
    updatingWordListError: false,
    updatingWordListErrorMessage: '',

    deletingWordList: false,
    deletingWordListSuccess: false,
    deletingWordListError: false,
    deletingWordListErrorMessage: '',

    deletingWords: false,
    deletingWordsSuccess: false,
    deletingWordsError: false,
    deletingWordsErrorMessage: '',

    journeyLevels: [],
    selectedJourneyLevel: undefined,
    generatingJourneyLevels: false,
    generatingJourneyLevelsSuccess: false,
    generatingJourneyLevelsError: false,
    generatingJourneyLevelsErrorMessage: '',

    markingStationCompleted: false,
    markingStationCompletedSuccess: false,
    markingStationCompletedError: false,
    markingStationCompletedErrorMessage: '',
}

export default SpellTrainStore
