import { useSelector, useDispatch } from 'react-redux'
import { StoreType, PracticeListStateType } from '../types/stateType'
import { PracticeListAction } from '../store/practiceListSlice'
import { PracticeListItemType, PracticeListType } from '../types/genericTypes'
import { useAppSelector } from '../store'

const usePracticeListViewModel = () => {
    const dispatch = useDispatch()

    // const { practiceLists }: PracticeListStateType = useSelector(
    //     (state: StoreType) => state.practiceList
    // )

    const { practiceLists, fetchingPracticeLists } = useAppSelector(
        (state) => state.practiceList
    )

    const { createPracticeList, updatePracticeList, deletePracticeList } =
        PracticeListAction

    return {
        practiceLists,
        fetchingPracticeLists,
        createPracticeList: (
            title: string,
            words: Array<PracticeListItemType>
        ) => dispatch(createPracticeList({ title, words })),

        updatePracticeList: (practiceList: PracticeListType) =>
            dispatch(updatePracticeList({ practiceList })),

        deletePracticeList: (id: string) =>
            dispatch(deletePracticeList({ id })),
    }
}

export default usePracticeListViewModel
