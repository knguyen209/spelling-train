import { useRouter } from 'expo-router'

import { JourneyLevelType } from '../../types/genericTypes'
import { useDispatch } from 'react-redux'
import { SpellTrainAction } from '../../store/spellTrainSlice'

const useJourneyListItemController = (
    journeyId: string,
    item: JourneyLevelType
) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { setSelectedJourneyLevel } = SpellTrainAction

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
