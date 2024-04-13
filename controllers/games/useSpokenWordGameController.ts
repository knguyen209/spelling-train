import { useContext, useEffect, useState } from 'react'
import { ISpokenWordGame, WordType } from '../../types/genericTypes'

import { Audio } from 'expo-av'
import { nanoid } from '@reduxjs/toolkit'
import { playCorrectSound, playIncorrectSound } from '../../utils'
import { useConfirmationModalContext } from '../../providers/modal-dialog/ModalDialogProvider'
import { fetchWordData } from '../../store/spellTrainSlice'
import { AuthenticationContext } from '../../providers/authentication-provider/AuthenticationProvider'

const useSpokenWordGameController = (gameData: ISpokenWordGame) => {
    const [quiz, setQuiz] = useState<QuizData | undefined>(undefined)
    const [data, setData] = useState<Array<WordType>>([])

    const [options, setOptions] = useState<Array<QuizOption>>([])
    const [loading, setLoading] = useState(true)
    const [isSpeaking, setIsSpeaking] = useState(true)
    const [sound, setSound] = useState<Audio.Sound>()
    const authContext = useContext(AuthenticationContext)
    useEffect(() => {
        initialize()
    }, [])

    useEffect(() => {
        return sound
            ? () => {
                  sound.unloadAsync()
              }
            : undefined
    }, [sound])

    const initialize = async () => {
        let quizOptions = gameData.options.map((o) => ({
            id: nanoid(),
            text: o,
            isCorrect: false,
            selected: false,
        }))

        setOptions(quizOptions)
        setTimeout(() => {
            speak()
        }, 500)
        setLoading(false)
    }

    const confirm = useConfirmationModalContext()

    const speak = async () => {
        setIsSpeaking(true)
        const { sound } = await Audio.Sound.createAsync(
            { uri: `http://localhost:8000/${gameData.audioUrl}` || '' },
            { shouldPlay: false }
        )
        setSound(sound)

        sound.playAsync().then(() => {
            setTimeout(() => {
                setIsSpeaking(false)
            }, 500)
        })
    }

    const onQuizOpenSelected = (id: string) => {
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
        quiz,
        options,
        speak,
        isSpeaking,
        onQuizOpenSelected,
        validateAnswers,
        loading,
    }
}

const generateQuestion = (words: Array<WordType>) => {
    let randomIndex = Math.floor(Math.random() * words.length)
    let randomWord = words[randomIndex]
    let quiz = {
        id: randomWord.id,
        correctAnswer: randomWord.word,
        audioUrl: randomWord.audioUrl || '',
    }
    return quiz
}

type QuizData = {
    id: number | string
    correctAnswer: string
    audioUrl: string
}

type QuizOption = {
    id: string
    text: string
    isCorrect: boolean
    selected: boolean
}

export default useSpokenWordGameController
