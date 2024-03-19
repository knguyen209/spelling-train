import { useRouter } from 'expo-router'

import { JourneyListAction } from '../../store/journeyListSlice'
import { JourneyLevelType } from '../../types/genericTypes'
import { useDispatch } from 'react-redux'

const useJourneyListItemController = (
    journeyId: string,
    item: JourneyLevelType
) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { setSelectedJourneyLevel } = JourneyListAction

    const handleItemPressed = () => {
        dispatch(
            setSelectedJourneyLevel({
                journeyId: journeyId,
                journeyLevel: item,
            })
        )
        router.push('/tabs/journey/journey-game')
    }

    return { handleItemPressed }
}

export default useJourneyListItemController
