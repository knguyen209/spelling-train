import { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../store'
import {
    GameContainerControlHandle,
    IJourneyGame,
} from '../../types/genericTypes'
import { useResultModalContext } from '../../providers/result-dialog/ResultDialogProvider'
import { useRouter } from 'expo-router'
import { useDispatch } from 'react-redux'
import { JourneyListAction } from '../../store/journeyListSlice'

const useJourneyGameContainerController = (id: string) => {
    const { selectedLevel } = useAppSelector((state) => state.journeyList)

    const [currentGameIndex, setCurrentGameIndex] = useState(0)
    const [currentGame, setCurrentGame] = useState<IJourneyGame | undefined>(
        undefined
    )
    const [loading, setLoading] = useState(true)

    const router = useRouter()
    const dispatch = useDispatch()

    const { completeJourneyLevel } = JourneyListAction

    const gameRef = useRef<GameContainerControlHandle>(null)

    const resultDialog = useResultModalContext()

    const games = selectedLevel?.games || []

    useEffect(() => {
        if (games.length > 0) {
            setCurrentGame(games[0])
            setLoading(false)
        }
    }, [])

    useEffect(() => {}, [currentGameIndex])

    const handleNextButtonPress = async () => {
        let result = await gameRef.current?.onNextClick()
        if (result) {
            setLoading(true)
            let nextIndex = currentGameIndex + 1
            setCurrentGameIndex(nextIndex)
            setCurrentGame(games[nextIndex])
            setTimeout(() => {
                setLoading(false)
            }, 500)
            if (nextIndex >= games.length) {
                dispatch(completeJourneyLevel({ journeyLevel: selectedLevel! }))
                let dialogResult = await resultDialog.showResult(
                    'Congrats',
                    `You have completed Level ${selectedLevel?.level}`
                )
                if (dialogResult) {
                    router.back()
                }
            }
        }
    }

    const handleRetryButtonPress = () => {}

    return {
        loading,
        currentGame,
        currentGameIndex,
        games,
        gameRef,
        handleNextButtonPress,
        handleRetryButtonPress,
    }
}

export default useJourneyGameContainerController
