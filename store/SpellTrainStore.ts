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

    user: undefined,
    userSigningIn: false,
    userSignInError: false,
    userSignInSuccess: false,
}

export default SpellTrainStore
