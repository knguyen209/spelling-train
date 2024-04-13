import { useRouter } from 'expo-router'
import { useAppSelector } from '../../store'

const useJourneyListController = () => {
    const router = useRouter()
    const { journeyLevels } = useAppSelector((state) => state.spellTrain)

    const onGenerateButtonPress = () => {
        router.push('/tabs/journey/generate-journey-games-modal')
    }

    return { journeyLevels, onGenerateButtonPress }
}

export default useJourneyListController
