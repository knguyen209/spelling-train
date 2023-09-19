import { useSelector, useDispatch } from 'react-redux'
import { StoreType, PracticeListStateType } from '../types/stateType'
import { PracticeListAction } from '../store/practiceListSlice'
import { PracticeListItemType } from '../types/genericTypes'

const usePracticeListViewModel = () => {
    const dispatch = useDispatch()
    const {
        fetchingPracticeLists,
        practiceLists,

        creatingPracticeList,
        creatingPracticeListSuccess,
        creatingPracticeListError,
    }: PracticeListStateType = useSelector(
        (state: StoreType) => state.practiceList
    )

    const { createPracticeList } = PracticeListAction

    return {
        practiceLists,
        fetchingPracticeLists,

        createPracticeList: (
            title: string,
            words: Array<PracticeListItemType>
        ) => dispatch(createPracticeList({ title, words })),

        creatingPracticeList,
        creatingPracticeListSuccess,
        creatingPracticeListError,
    }
}

export default usePracticeListViewModel
