import { useRouter } from 'expo-router'
import { useAppSelector } from '../../store'

const useJourneyListController = () => {
    const router = useRouter()
    const { journeys } = useAppSelector((state) => state.spellTrain)

    const onGenerateButtonPress = () => {
        router.push('/tabs/journey/generate-journey-games-modal')
    }

    return { journeys, onGenerateButtonPress }
}

export default useJourneyListController
