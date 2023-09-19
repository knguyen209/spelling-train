import { PracticeListType } from './genericTypes'

export type PracticeListStateType = {
    fetchingPracticeLists: boolean
    practiceLists: Array<PracticeListType>

    creatingPracticeList: boolean
    creatingPracticeListSuccess: boolean
    creatingPracticeListError: boolean

    updatingPracticeList: boolean
    updatingPracticeListSuccess: boolean
    updatingPracticeListError: boolean

    deletingPracticeList: boolean
    deletingPracticeListSuccess: boolean
    deletingPracticeListError: boolean
}

export type StoreType = {
    practiceList: PracticeListStateType
}
