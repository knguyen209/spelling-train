import { useEffect, useState } from 'react'

import { nanoid } from '@reduxjs/toolkit'
import { useConfirmationModalContext } from '../../providers/modal-dialog/ModalDialogProvider'
import { playCorrectSound, playIncorrectSound } from '../../utils'
import { IFindCorrectWord } from '../../types/genericTypes'

import { useAppSelector } from '../../store'

const useFindCorrectWordGameController = (gameData: IFindCorrectWord) => {
    const [options, setOptions] = useState<Array<QuizOption>>([])
    const [answers, setAnswers] = useState<Array<QuizAnswer | undefined>>([])
    const [loading, setLoading] = useState(false)

    const { user } = useAppSelector((state) => state.spellTrain)

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

type QuizData = {
    sentence: string
    correctAnswer: string
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

export default useFindCorrectWordGameController
