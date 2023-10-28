import { Audio } from 'expo-av'
import * as Speech from 'expo-speech'
import { useEffect, useState } from 'react'
import {
    MessageType,
    PracticeResultType,
    PracticeWordMetaDataType,
} from '../../types/genericTypes'
import { useRouter } from 'expo-router'

import usePracticeGameViewModel from '../../view-models/usePracticeGameViewModel'
import { playCorrectSound, playIncorrectSound } from '../../utils'

const usePracticeGameController = (practiceListId: string) => {
    const [messages, setMessages] = useState<Array<MessageType>>([])
    const [isLoading, setIsLoading] = useState(true)
    const [playerAnswer, setPlayerAnswer] = useState('')
    const [wordData, setWordData] = useState<PracticeWordMetaDataType | null>()
    const [practiceResult, setPracticeResult] = useState<PracticeResultType>({
        noQuestions: 0,
        noCorrect: 0,
        noHintsUsed: 0,
        totalTime: 0,
    })

    const startTime = new Date()

    const { getPracticeWord } = usePracticeGameViewModel(practiceListId)

    const router = useRouter()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setIsLoading(true)
        const data = await getPracticeWord()
        if (data) {
            setWordData(data)
            setPracticeResult({ ...practiceResult, noQuestions: 1 })
            speak(data)
        }
        setIsLoading(false)
    }

    const onDefinitionHintPress = () => {
        const requestMsg: MessageType = {
            type: 'player',
            text: 'Give me a definition',
        }

        const definition =
            wordData?.meaning.definitions[
                Math.floor(Math.random() * wordData.meaning.definitions.length)
            ] || ''

        const message: MessageType = {
            type: 'ai',
            text: definition,
        }

        increaseNoHints()

        const newMessages = [...messages, requestMsg, message]
        setMessages(newMessages)
    }

    const onPartOfSpeechHintPress = () => {
        const requestMsg: MessageType = {
            type: 'player',
            text: 'Part of speech',
        }

        const message: MessageType = {
            type: 'ai',
            text: wordData?.meaning.partOfSpeech || '',
        }

        increaseNoHints()

        const newMessages = [...messages, requestMsg, message]
        setMessages(newMessages)
    }

    const onSynonymHintPress = () => {
        const requestMsg: MessageType = {
            type: 'player',
            text: 'Give me a synonym of this word',
        }

        const synonym =
            wordData?.meaning.synonyms[
                Math.floor(Math.random() * wordData.meaning.synonyms.length)
            ] || 'This word has no synonyms.'

        const message: MessageType = {
            type: 'ai',
            text: synonym,
        }

        increaseNoHints()

        const newMessages = [...messages, requestMsg, message]
        setMessages(newMessages)
    }

    const onShowAnswerPress = () => {
        const requestMsg: MessageType = {
            type: 'player',
            text: 'Show me the answer',
        }

        const message: MessageType = {
            type: 'ai',
            text: `The correct answer is: ${wordData?.text}`,
        }

        const newMessages = [...messages, requestMsg, message]
        setMessages(newMessages)
    }

    const onAnotherWordPress = () => {
        const requestMsg: MessageType = {
            type: 'player',
            text: 'Give me another word',
        }

        const newMessages = [requestMsg]
        setMessages(newMessages)

        fetchData()
    }

    const onSendAnswerPress = () => {
        if (playerAnswer) {
            const isCorrect =
                playerAnswer.toLowerCase() === wordData?.text.toLowerCase()

            const requestMsg: MessageType = {
                type: 'player',
                text: playerAnswer,
            }

            const message: MessageType = {
                type: 'ai',
                text: isCorrect ? 'Correct!' : 'Incorrect. Try again.',
            }

            if (isCorrect) {
                playCorrectSound()
                const updatedResult: PracticeResultType = {
                    ...practiceResult,
                    noCorrect: practiceResult.noCorrect + 1,
                }
                setPracticeResult(updatedResult)
            } else {
                playIncorrectSound()
            }

            setPlayerAnswer('')

            const newMessages = [...messages, requestMsg, message]
            setMessages(newMessages)
        }
    }

    const speakCurrentWord = async () => {
        speak(wordData)
    }

    const speak = async (data: PracticeWordMetaDataType | null | undefined) => {
        if (data) {
            const audioUrl = data.audio || ''

            if (audioUrl) {
                const { sound } = await Audio.Sound.createAsync(
                    {
                        uri: audioUrl,
                    },
                    { shouldPlay: true }
                )

                await sound.playAsync()
            } else {
                Speech.speak(data.text)
            }
        }
    }

    const onEndPracicePress = () => {
        const endTime = new Date()

        // calculate the total time elapsed
        const elapsedTime = Math.floor(
            (endTime.getTime() - startTime.getTime()) / 1000 / 60
        )
        const result: PracticeResultType = {
            ...practiceResult,
            totalTime: elapsedTime,
        }

        router.push({
            pathname: '/tabs/practice/practice-result',
            params: result,
        })
    }

    const increaseNoHints = () => {
        const updatedResult: PracticeResultType = {
            ...practiceResult,
            noHintsUsed: practiceResult.noHintsUsed + 1,
        }
        setPracticeResult(updatedResult)
    }

    return {
        isLoading,
        wordData,
        playerAnswer,
        setPlayerAnswer,
        messages,
        speakCurrentWord,
        onDefinitionHintPress,
        onPartOfSpeechHintPress,
        onSynonymHintPress,
        onShowAnswerPress,
        onAnotherWordPress,
        onSendAnswerPress,
        onEndPracicePress,
    }
}

export default usePracticeGameController
