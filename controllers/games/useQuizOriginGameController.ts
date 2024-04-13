import { useEffect, useState } from 'react'

import { nanoid } from '@reduxjs/toolkit'
import { useConfirmationModalContext } from '../../providers/modal-dialog/ModalDialogProvider'
import { playCorrectSound, playIncorrectSound } from '../../utils'
import { IQuizOriginGame } from '../../types/genericTypes'

const useQuizOriginGameController = (gameData: IQuizOriginGame) => {
    const [options, setOptions] = useState<Array<QuizOption>>([])
    const [answers, setAnswers] = useState<Array<QuizAnswer | undefined>>([])
    const [loading, setLoading] = useState(true)

    const confirm = useConfirmationModalContext()

    useEffect(() => {
        initialize()
    }, [])

    const initialize = async () => {
        let tOptions = gameData.options.map((o) => {
            let option = {
                id: nanoid(),
                text: o,
                selected: false,
                isCorrect: false,
            }
            return option
        })
        setOptions(tOptions)
        setLoading(false)
    }

    const onAnswerOptionSelected = (id: string) => {
        let selectedOption = options.find((o) => o.id === id)
        if (selectedOption) {
            let isCorrect = selectedOption.text === gameData.correctAnswer
            let updatedOptions = options.map((o) =>
                o.id === id
                    ? { ...o, selected: true, isCorrect: isCorrect }
                    : { ...o, selected: false, isCorrect: false }
            )
            setOptions(updatedOptions)
            if (isCorrect) {
                playCorrectSound()
            } else {
                playIncorrectSound()
            }
        }
    }

    const validateAnswers = async () => {
        let selectedOption = options.find((o) => o.isCorrect)
        if (selectedOption) {
            return confirm.showConfirmation('Correct', 'Great job!', true, 'OK')
        } else {
            confirm.showConfirmation(
                'Incorrect',
                'Please try again!',
                true,
                'Got it'
            )
            return false
        }
    }

    return {
        loading,
        options,
        answers,
        onAnswerOptionSelected,
        validateAnswers,
    }
}

type QuizOption = {
    id: string
    text: string
    selected: boolean
    isCorrect: boolean
}

type QuizAnswer = {
    id: string
    text: string
    isCorrect: boolean
}

export default useQuizOriginGameController
