import { SpellTrainStateType } from '../types/stateType'

const SpellTrainStore: SpellTrainStateType = {
    fetchingWordLists: false,
    wordLists: [],

    fetchingWordData: false,
    wordData: undefined,

    generatingWordList: false,
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
}

export default SpellTrainStore
