import { useEffect, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useConfirmationModalContext } from '../../providers/modal-dialog/ModalDialogProvider'
import { playCorrectSound, playIncorrectSound, shuffleArray } from '../../utils'
import { IJourneyGame, WordType } from '../../types/genericTypes'

const useMissingGameController = (gameData: IJourneyGame) => {
    const { words } = gameData
    const [quizzes, setQuizzes] = useState<Array<QuizData>>([])
    const [options, setOptions] = useState<Array<QuizOption>>([])
    const [answers, setAnswers] = useState<Array<QuizAnswer | undefined>>([])

    const confirm = useConfirmationModalContext()

    useEffect(() => {
        initialize()
    }, [])

    const initialize = () => {
        const quizData = generateQuizzes(words)
        setQuizzes(quizData)
        let missingLetters = shuffleArray(quizData.map((q) => q.missingLetter))
        let tOptions = missingLetters.map((i) => ({
            id: nanoid(),
            text: i,
            selected: false,
        }))

        setOptions(tOptions)

        setAnswers(Array(tOptions.length).fill(undefined))
    }

    const onAnswerOptionSelected = (id: string) => {
        let selectedOption = options.find((o) => o.id === id)
        if (selectedOption) {
            let updatedOptions = options.map((o) =>
                o.id === id ? { ...o, selected: !o.selected } : o
            )
            setOptions(updatedOptions)

            let nextIndex = answers.findIndex((a) => a === undefined)
            if (nextIndex !== -1) {
                let updatedAnswers = answers.map((a, i) =>
                    i === nextIndex
                        ? {
                              id: selectedOption!.id,
                              text: selectedOption!.text,
                              isCorrect:
                                  quizzes[i].missingLetter ===
                                  selectedOption!.text,
                          }
                        : a
                )
                if (quizzes[nextIndex].missingLetter === selectedOption!.text) {
                    playCorrectSound()
                } else {
                    playIncorrectSound()
                }
                setAnswers(updatedAnswers)
            }
        }
    }

    const onUncheckAnswerPress = (index: number) => {
        let answer = answers[index]
        if (answer) {
            let updatedAnswers = answers.map((a, i) =>
                i === index ? undefined : a
            )
            setAnswers(updatedAnswers)

            let updatedOptions = options.map((o) =>
                o.id === answer?.id ? { ...o, selected: !o.selected } : o
            )
            setOptions(updatedOptions)
        }
    }

    const validateAnswers = async () => {
        let correctAnswers = answers.filter(
            (a) => a != undefined && a.isCorrect === true
        )
        if (correctAnswers.length === quizzes.length) {
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
        quizzes,
        options,
        answers,
        onAnswerOptionSelected,
        onUncheckAnswerPress,
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

type QuizData = {
    quizWord: string
    correctAnswer: string
    missingLetter: string
}

type QuizOption = {
    id: string
    text: string
    selected: boolean
}

type QuizAnswer = {
    id: string
    text: string
    isCorrect: boolean
}

export default useMissingGameController
