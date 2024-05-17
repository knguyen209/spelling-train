import { useEffect, useState } from 'react'
import { IHangmanGame } from '../../types/genericTypes'

import { playCorrectSound, playIncorrectSound } from '../../utils'
import { useConfirmationModalContext } from '../../providers/modal-dialog/ModalDialogProvider'

const useHangmanGameController = (gameData: IHangmanGame) => {
    const [loading, setLoading] = useState(true)

    const [answer, setAnswer] = useState('')
    const [keys, setKeys] = useState<Array<KeyType>>([])
    const [selectedKeys, setSelectedKeys] = useState<Array<string>>([])
    const [attempts, setAttempts] = useState(0)
    const confirm = useConfirmationModalContext()

    useEffect(() => {
        initialize()
    }, [])

    const initialize = async () => {
        const mKeys = 'abcdefghijklmnopqrstuvwxyz'.split('').map((l) => {
            const key: KeyType = { character: l, isSelected: false }
            return key
        })
        setKeys(mKeys)

        setLoading(false)
    }

    const validateAnswers = async () => {
        let currentAnswer = gameData.correctAnswer
            .split('')
            .map((c) => (selectedKeys.includes(c) ? c : '_'))
            .join('')
        if (currentAnswer === gameData.correctAnswer) {
            // playCorrectSound()
            return confirm.showConfirmation(
                'Correct',
                'Great job!',
                true,
                'Continue'
            )
        } else {
            // playIncorrectSound()
            confirm.showConfirmation(
                'Incorrect',
                'Please try again!',
                true,
                'OK'
            )
            return false
        }
    }

    const onAnswerChanged = (newVal: string) => {
        setAnswer(newVal)
    }

    const onKeyPress = (key: string) => {
        const mKeys = keys.map((k) =>
            k.character === key ? { ...k, isSelected: true } : k
        )
        const mSelectedKeys = mKeys
            .filter((k) => k.isSelected)
            .map((k) => k.character)

        setSelectedKeys(mSelectedKeys)
        setKeys(mKeys)

        gameData.correctAnswer.includes(key)
            ? playCorrectSound()
            : playIncorrectSound()

        const newAttempts =
            attempts + (!gameData.correctAnswer.includes(key) ? 1 : 0)
        setAttempts(newAttempts)

        let currentAnswer = gameData.correctAnswer
            .split('')
            .map((c) => (mSelectedKeys.includes(c) ? c : '_'))
            .join('')
        if (currentAnswer === gameData.correctAnswer) {
            // playCorrectSound()
        } else {
            if (newAttempts >= gameData.correctAnswer.length) {
                // playIncorrectSound()
                confirm
                    .showConfirmation(
                        'Incorrect',
                        'You have used all of your attempts. Please try again',
                        true,
                        'Try again'
                    )
                    .then(() => {
                        const mKeys = keys.map((k) => {
                            return { ...k, isSelected: false }
                        })
                        setKeys(mKeys)
                        setSelectedKeys([])
                        setAttempts(0)
                    })
            }
        }
    }

    return {
        loading,
        answer,
        keys,
        selectedKeys,
        attempts,
        onKeyPress,
        onAnswerChanged,
        validateAnswers,
    }
}

type KeyType = {
    character: string
    isSelected: boolean
}

export default useHangmanGameController
