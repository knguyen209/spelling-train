import { useEffect, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useConfirmationModalContext } from '../../providers/modal-dialog/ModalDialogProvider'
import { playCorrectSound, playIncorrectSound, shuffleArray } from '../../utils'
import {
    IFindMissingLetterGame,
    IJourneyGame,
    WordType,
} from '../../types/genericTypes'

const useMissingGameController = (gameData: IFindMissingLetterGame) => {
    const [options, setOptions] = useState<Array<QuizOption>>([])

    const confirm = useConfirmationModalContext()

    useEffect(() => {
        initialize()
    }, [])

    const initialize = () => {
        const tOptions: Array<QuizOption> = gameData.options.map((o) => ({
            text: o,
            id: nanoid(),
            isSelected: false,
            isCorrect: false,
        }))
        setOptions(tOptions)
    }

    const onAnswerOptionSelected = (id: string) => {
        let updatedOptions = options.map((o) =>
            o.id === id
                ? {
                      ...o,
                      isCorrect: o.text === gameData.correctAnswer,
                      isSelected: true,
                  }
                : { ...o, isSelected: false }
        )
        setOptions(updatedOptions)
    }

    const validateAnswers = async () => {
        const isCorrect = options.filter((o) => o.isCorrect).length === 1
        if (isCorrect) {
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
        options,
        onAnswerOptionSelected,
        validateAnswers,
    }
}

const extractLetterIndex = (word: string) => {
    return Math.floor(Math.random() * word.length)
}

const generateQuizzes = (words: Array<WordType>) => {
    let quizzes = []

    for (const item of words) {
        let word = item.word
        let missingIndex = extractLetterIndex(word)
        quizzes.push({
            quizWord:
                word.substring(0, missingIndex) +
                '_' +
                word.substring(missingIndex + 1),
            correctAnswer: word,
            missingLetter: word[missingIndex],
        })
    }

    return quizzes
}

type QuizOption = {
    id: string
    text: string
    isSelected: boolean
    isCorrect: boolean
}

type QuizAnswer = {
    id: string
    text: string
    isCorrect: boolean
}

export default useMissingGameController
