import { useContext, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import {
    GameContainerControlHandle,
    IJourneyGame,
} from '../../types/genericTypes'
import { useResultModalContext } from '../../providers/result-dialog/ResultDialogProvider'
import { useRouter } from 'expo-router'
import { useDispatch } from 'react-redux'
import { markJourneyStationCompleted } from '../../store/spellTrainSlice'
import { AuthenticationContext } from '../../providers/authentication-provider/AuthenticationProvider'

const useJourneyGameContainerController = (id: string) => {
    const { selectedLevel, selectedJourneyLevel } = useAppSelector(
        (state) => state.spellTrain
    )

    const [currentGameIndex, setCurrentGameIndex] = useState(0)
    const [currentGame, setCurrentGame] = useState<IJourneyGame | undefined>(
        undefined
    )
    const [loading, setLoading] = useState(true)

    const router = useRouter()
    const dispatch = useAppDispatch()

    const authContext = useContext(AuthenticationContext)

    const gameRef = useRef<GameContainerControlHandle>(null)

    const resultDialog = useResultModalContext()

    const games = selectedJourneyLevel?.games || []

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
                dispatch(
                    markJourneyStationCompleted({
                        stationId: selectedJourneyLevel?.id || '',
                        token: authContext?.userProfile?.accessToken || '',
                    })
                )
                let dialogResult = await resultDialog.showResult(
                    'Congrats',
                    `You have completed Level ${selectedJourneyLevel?.level}`
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
