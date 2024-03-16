import { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../store'
import {
    GameContainerControlHandle,
    IJourneyGame,
} from '../../types/genericTypes'
import { useResultModalContext } from '../../providers/result-dialog/ResultDialogProvider'
import { useRouter } from 'expo-router'

const useJourneyGameContainerController = (id: string) => {
    const { selectedLevel } = useAppSelector((state) => state.journeyList)

    const [currentGameIndex, setCurrentGameIndex] = useState(0)
    const [currentGame, setCurrentGame] = useState<IJourneyGame | undefined>(
        undefined
    )

    const router = useRouter()

    const missingGameRef = useRef<GameContainerControlHandle>(null)

    const resultDialog = useResultModalContext()

    const games = selectedLevel?.games || []

    useEffect(() => {
        if (games.length > 0) {
            setCurrentGame(games[0])
        }
    }, [])

    const handleNextButtonPress = async () => {
        let result = await missingGameRef.current?.onNextClick()
        if (result) {
            let nextIndex = currentGameIndex + 1
            setCurrentGameIndex(nextIndex)
            setCurrentGame(games[nextIndex])
            if (nextIndex >= games.length) {
                let dialogResult = await resultDialog.showResult(
                    'Congrats',
                    'You have completed Level 1'
                )
                if (dialogResult) {
                    router.back()
                }
            }
        }
    }

    const handleRetryButtonPress = () => {}

    return {
        currentGame,
        currentGameIndex,
        games,
        missingGameRef,
        handleNextButtonPress,
        handleRetryButtonPress,
    }
}

export default useJourneyGameContainerController
