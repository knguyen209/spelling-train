import { useEffect, useState } from 'react'
import { ISpellWordGame } from '../../types/genericTypes'
import { Audio } from 'expo-av'
import { playCorrectSound, playIncorrectSound } from '../../utils'
import { useConfirmationModalContext } from '../../providers/modal-dialog/ModalDialogProvider'

const useSpellWordGameController = (gameData: ISpellWordGame) => {
    const [loading, setLoading] = useState(true)
    const [isSpeaking, setIsSpeaking] = useState(true)
    const [sound, setSound] = useState<Audio.Sound>()
    const [answer, setAnswer] = useState('')

    const confirm = useConfirmationModalContext()

    useEffect(() => {
        initialize()
    }, [])

    const initialize = async () => {
        setLoading(false)
        speak()
    }

    const validateAnswers = async () => {
        if (answer.toLowerCase().trim() === gameData.word.toLowerCase()) {
            playCorrectSound()
            return confirm.showConfirmation('Correct', 'Great job!', true, 'OK')
        } else {
            playIncorrectSound()
            confirm.showConfirmation(
                'Incorrect',
                'Please try again!',
                true,
                'Got it'
            )
            return false
        }
    }

    const onAnswerChanged = (newVal: string) => {
        setAnswer(newVal)
    }

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

    return {
        loading,
        isSpeaking,
        answer,
        onAnswerChanged,
        validateAnswers,

        speak,
    }
}

export default useSpellWordGameController
