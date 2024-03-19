import { useEffect, useState } from 'react'
// import { IMissingLetterGame } from '../../types/genericTypes'
import { nanoid } from '@reduxjs/toolkit'
import { useConfirmationModalContext } from '../../providers/modal-dialog/ModalDialogProvider'
import { playCorrectSound, playIncorrectSound } from '../../utils'
import { IJourneyGame, WordType } from '../../types/genericTypes'
import { fetchWordData } from '../../store/practiceListSlice'

const useUsageGameController = (gameData: IJourneyGame) => {
    const { words } = gameData
    const [wordList, setWordList] = useState<Array<WordType>>([])
    const [quiz, setQuiz] = useState<QuizData | undefined>(undefined)
    const [options, setOptions] = useState<Array<QuizOption>>([])
    const [answers, setAnswers] = useState<Array<QuizAnswer | undefined>>([])
    const [loading, setLoading] = useState(true)

    const confirm = useConfirmationModalContext()

    useEffect(() => {
        initialize()
    }, [])

    const initialize = async () => {
        const data: Array<WordType> = await Promise.all(
            words.map((word) =>
                word.usage!.length > 0 ? word : fetchWordData(word.id)
            )
        )

        setWordList(data)
        const quizData = generateQuestion(data)
        setQuiz(quizData)

        let tOptions = data.map((w) => {
            let option: QuizOption = {
                id: nanoid(),
                text: w.word,
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
            let isCorrect = selectedOption.text === quiz?.correctAnswer
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
        quiz,
        options,
        answers,
        onAnswerOptionSelected,
        validateAnswers,
    }
}

const generateQuestion = (words: Array<WordType>) => {
    let randomIndex = Math.floor(Math.random() * words.length)
    let randomWord = words[randomIndex]
    let sentence = (randomWord.usage || '').replace(randomWord.word, '________')
    let quiz = {
        sentence: sentence,
        correctAnswer: randomWord.word,
    }
    return quiz
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

export default useUsageGameController
