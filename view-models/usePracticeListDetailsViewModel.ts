import { useDispatch, useSelector } from 'react-redux'
import { PracticeListStateType, StoreType } from '../types/stateType'

const usePracticeListDetailsViewModel = () => {
    const { practiceLists }: PracticeListStateType = useSelector(
        (state: StoreType) => state.practiceList
    )

    return {
        practiceLists,
    }
}

export default usePracticeListDetailsViewModel
