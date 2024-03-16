import { useAppSelector } from '../../store'

const useJourneyListController = () => {
    const { journeys } = useAppSelector((state) => state.journeyList)

    return { journeys }
}

export default useJourneyListController
