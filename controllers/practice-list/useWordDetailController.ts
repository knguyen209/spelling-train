import { useContext, useEffect, useState } from 'react'

import { useRouter } from 'expo-router'
import { Audio } from 'expo-av'
import { WordType } from '../../types/genericTypes'
import * as Speech from 'expo-speech'
import { fetchWordData } from '../../store/spellTrainSlice'
import { useAppSelector } from '../../store'
import { AuthenticationContext } from '../../providers/authentication-provider/AuthenticationProvider'
import { isEmptyWordData } from '../../utils'

const useWordDetailController = (id: number, listId: number) => {
    const router = useRouter()
    const authContext = useContext(AuthenticationContext)

    const [fetchingWordData, setFetchingWordData] = useState(true)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [wordData, setWordData] = useState<WordType | undefined>(undefined)
    const [sound, setSound] = useState<Audio.Sound>()
    const { wordLists } = useAppSelector((state) => state.spellTrain)

    const wordList = wordLists.find((item) => item.id == listId)
    const getWordData = async (id: number) => {
        setFetchingWordData(true)
        const wData = wordList?.words.find((w) => w.id === id)
        if (wData) {
            try {
                if (isEmptyWordData(wData)) {
                    const data = await fetchWordData(
                        id,
                        authContext?.userProfile?.accessToken || ''
                    )

                    setWordData(data)
                } else {
                    setWordData(wData)
                }
            } catch (e) {
                console.log(e)
            } finally {
                setFetchingWordData(false)
            }
        }
    }

    useEffect(() => {
        getWordData(id)
    }, [])

    useEffect(() => {
        return sound
            ? () => {
                  sound.unloadAsync()
              }
            : undefined
    }, [sound])

    const speak = async () => {
        setIsSpeaking(true)
        if (wordData) {
            if (wordData.audioUrl) {
                const { sound } = await Audio.Sound.createAsync(
                    { uri: `http://localhost:8000/${wordData.audioUrl}` },
                    { shouldPlay: false }
                )
                setSound(sound)

                sound.playAsync().then(() => setIsSpeaking(false))
            } else {
                Speech.speak(wordData.word || '')
            }
        } else {
            setIsSpeaking(false)
        }
    }

    const closeModal = () => {
        sound?.unloadAsync()
        router.back()
    }

    return { fetchingWordData, wordData, closeModal, speak, isSpeaking }
}

export default useWordDetailController
