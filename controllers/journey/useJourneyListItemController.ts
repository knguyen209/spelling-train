import { useRouter } from 'expo-router'

import {
    JourneyLevelType,
    JourneyStationLevelType,
} from '../../types/genericTypes'
import { useDispatch } from 'react-redux'
import { SpellTrainAction } from '../../store/spellTrainSlice'

const useJourneyListItemController = (
    journeyId: string,
    item: JourneyStationLevelType
) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { setSelectedJourneyLevel } = SpellTrainAction

    const handleItemPressed = () => {
        dispatch(
            setSelectedJourneyLevel({
                journeyLevel: item,
            })
        )
        router.push('/tabs/journey/journey-game')
        item.games.map((game) => console.log(game))
    }

    return { handleItemPressed }
}

export default useJourneyListItemController
