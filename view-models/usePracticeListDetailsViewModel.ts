import { useDispatch, useSelector } from 'react-redux'
import { PracticeListStateType, StoreType } from '../types/stateType'
import { PracticeListAction } from '../store/practiceListSlice'

const usePracticeListDetailsViewModel = () => {
    const dispatch = useDispatch()

    const { practiceLists }: PracticeListStateType = useSelector(
        (state: StoreType) => state.practiceList
    )

    const { deletePracticeList } = PracticeListAction

    return {
        practiceLists,

        deletePracticeList: (id: string) =>
            dispatch(deletePracticeList({ id })),
    }
}

export default usePracticeListDetailsViewModel
