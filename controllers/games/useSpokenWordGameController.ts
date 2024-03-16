import { useEffect, useState } from 'react'
import { ISpokenWordGame } from '../../types/genericTypes'
import * as Speech from 'expo-speech'
import { nanoid } from '@reduxjs/toolkit'
import { playCorrectSound, playIncorrectSound } from '../../utils'
import { useConfirmationModalContext } from '../../providers/modal-dialog/ModalDialogProvider'

const useSpokenWordGameController = (gameData: ISpokenWordGame) => {
    const { words } = gameData
    const [quizzes, setQuizzes] = useState<Array<string>>([])
    const [currentWord, setCurrentWord] = useState<string>('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [options, setOptions] = useState<Array<QuizOption>>([])

    useEffect(() => {
        const shuffledWords = shuffleWords(words)
        setQuizzes(shuffledWords)

        setCurrentWord(shuffledWords[0])
        Speech.speak(shuffledWords[0])

        let quizOptions = words.map((word) => ({
            id: nanoid(),
            text: word,
            isCorrect: false,
            answered: false,
        }))

        setOptions(quizOptions)
    }, [])

    const confirm = useConfirmationModalContext()

    const speakCurrentWord = () => {
        if (currentWord.length > 0) {
            Speech.speak(currentWord)
        }
    }

    const onQuizOpenSelected = (id: string) => {
        let selectedOption = options.find((option) => option.id === id)
        if (selectedOption) {
            let isCorrect = selectedOption.text === currentWord
            let updatedOptions = options.map((option) =>
                option.id === id
                    ? {
                          ...option,
                          isCorrect: isCorrect,
                          answered: isCorrect,
                      }
                    : option
            )
            setOptions(updatedOptions)

            if (isCorrect) {
                playCorrectSound()
                let nextIndex = currentIndex + 1
                if (nextIndex < quizzes.length) {
                    setCurrentIndex(nextIndex)
                    let nextWord = quizzes[nextIndex]
                    setCurrentWord(nextWord)
                }
            } else {
                playIncorrectSound()
            }
        }
    }

    const validateAnswers = async () => {
        let correctAnswers = options.filter(
            (option) => option.isCorrect === true
        )

        if (correctAnswers.length === quizzes.length) {
            return confirm.showConfirmation('Correct', 'Amazing!', true, 'OK')
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
        currentWord,
        options,
        speakCurrentWord,
        onQuizOpenSelected,
        validateAnswers,
    }
}

const shuffleWords = (words: string[]) => {
    const shuffledArray = words.slice()

    // Fisher-Yates shuffle algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
        ]
    }

    return shuffledArray
}

type QuizOption = {
    id: string
    text: string
    isCorrect: boolean
    answered: boolean
}

export default useSpokenWordGameController
