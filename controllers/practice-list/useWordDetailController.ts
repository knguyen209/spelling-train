import { useEffect, useState } from 'react'
import { fetchWordData } from '../../store/practiceListSlice'
import { useRouter } from 'expo-router'
import { Audio } from 'expo-av'
import { WordType } from '../../types/genericTypes'
import * as Speech from 'expo-speech'

const useWordDetailController = (id: number) => {
    const router = useRouter()

    const [fetchingWordData, setFetchingWordData] = useState(true)
    const [wordData, setWordData] = useState<WordType | undefined>(undefined)
    const getWordData = async (id: number) => {
        setFetchingWordData(true)
        try {
            const data = await fetchWordData(id)
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
            if (wordData.url) {
                const { sound } = await Audio.Sound.createAsync(
                    { uri: wordData.url },
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
