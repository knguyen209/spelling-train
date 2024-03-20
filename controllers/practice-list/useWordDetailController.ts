import { useContext, useEffect, useState } from 'react'

import { useRouter } from 'expo-router'
import { Audio } from 'expo-av'
import { WordType } from '../../types/genericTypes'
import * as Speech from 'expo-speech'
import { fetchWordData } from '../../store/spellTrainSlice'
import { useAppSelector } from '../../store'
import { AuthenticationContext } from '../../providers/authentication-provider/AuthenticationProvider'

const useWordDetailController = (id: number) => {
    const router = useRouter()
    const authContext = useContext(AuthenticationContext)

    const [fetchingWordData, setFetchingWordData] = useState(true)
    const [wordData, setWordData] = useState<WordType | undefined>(undefined)
    const getWordData = async (id: number) => {
        setFetchingWordData(true)
        try {
            const data = await fetchWordData(
                id,
                authContext?.userProfile?.accessToken || ''
            )
            setWordData(data)
        } catch (e) {
            console.log(e)
        } finally {
            setFetchingWordData(false)
        }
    }

    useEffect(() => {
        getWordData(id)
    }, [])

    const speak = async () => {
        if (wordData) {
            if (wordData.audioUrl) {
                const { sound } = await Audio.Sound.createAsync(
                    { uri: `http://localhost:8000/${wordData.audioUrl}` },
                    { shouldPlay: true }
                )
                await sound.playAsync()
            } else {
                Speech.speak(wordData.word)
            }
        } else {
            console.log('Cannot play')
        }
    }

    const closeModal = () => {
        router.back()
    }

    return { fetchingWordData, wordData, closeModal, speak }
}

export default useWordDetailController
