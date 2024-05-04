import { useRouter } from 'expo-router'

import {
    JourneyLevelType,
    JourneyStationLevelType,
} from '../../types/genericTypes'
import { useDispatch } from 'react-redux'
import { SpellTrainAction } from '../../store/spellTrainSlice'
import { useAppSelector } from '../../store'
import { useEffect, useState } from 'react'
import { useConfirmationModalContext } from '../../providers/modal-dialog/ModalDialogProvider'

const useJourneyListItemController = (
    journeyId: string,
    item: JourneyStationLevelType,
    index: number
) => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [disabled, setDisabled] = useState(true)
    const [isCurrentLevel, setIsCurrentLevel] = useState(false)

    const { journeyLevels } = useAppSelector((state) => state.spellTrain)
    const { setSelectedJourneyLevel } = SpellTrainAction

    const confirm = useConfirmationModalContext()

    useEffect(() => {
        initialize()
    }, [])

    useEffect(() => {
        initialize()
    }, [journeyLevels])

    const initialize = () => {
        if (index > 0) {
            const prevLevel = journeyLevels[index - 1]
            if (prevLevel.isCompleted) {
                setDisabled(false)
                setIsCurrentLevel(true)
            }
        } else {
            setDisabled(false)
        }
    }

    const handleItemPressed = () => {
        if (disabled) {
            confirm.showConfirmation(
                'Info',
                'Complete the previous level first',
                true,
                'OK'
            )
        } else {
            dispatch(
                setSelectedJourneyLevel({
                    journeyLevel: item,
                })
            )
            router.push('/tabs/journey/journey-game')
        }
    }

    return { isCurrentLevel, handleItemPressed }
}

export default useJourneyListItemController
