import * as Speech from 'expo-speech'
import { Audio } from 'expo-av'
import { useEffect, useState } from 'react'
import {
    MessageType,
    PracticeResultType,
    WordType,
} from '../../types/genericTypes'
import { useRouter } from 'expo-router'
import { fetchWordData } from '../../store/practiceListSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import { playCorrectSound, playIncorrectSound } from '../../utils'

const usePracticeGameController = (wordListId: number) => {
    const router = useRouter()

    const { wordLists } = useAppSelector((state) => state.practiceList)

    const [wordData, setWordData] = useState<WordType | undefined>(undefined)
    const [fetchingWordData, setFetchingWordData] = useState(true)
    const [messages, setMessages] = useState<Array<MessageType>>([])

    const [playerAnswer, setPlayerAnswer] = useState('')
    const [practiceResult, setPracticeResult] = useState<PracticeResultType>({
        noQuestions: 0,
        noCorrect: 0,
        noHintsUsed: 0,
        totalTime: 0,
    })

    const startTime = new Date()

    useEffect(() => {
        fetchAnotherWord()
    }, [])

    useEffect(() => {
        speak(wordData)
    }, [wordData])

    const fetchAnotherWord = async () => {
        let wordList = wordLists.filter((item) => item.id == wordListId)[0]
        setFetchingWordData(true)
        if (wordList) {
            // randomly select a word in the list
            let index = Math.floor(Math.random() * wordList.words.length)
            let word = wordList.words[index]
            try {
                let data = await fetchWordData(word.id)
                setWordData(data)
            } catch (e) {
                console.log(e)
            } finally {
                setFetchingWordData(false)
            }
        }
    }

    const onDefinitionHintPress = () => {
        const requestMsg: MessageType = {
            type: 'player',
            text: 'Give me a definition',
        }

        const definition = wordData?.definition || ''

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
            text: wordData?.partsOfSpeech || '',
        }

        increaseNoHints()

        const newMessages = [...messages, requestMsg, message]
        setMessages(newMessages)
    }

    const onSynonymHintPress = () => {
        increaseNoHints()
    }

    const onShowAnswerPress = () => {
        const requestMsg: MessageType = {
            type: 'player',
            text: 'Show me the answer',
        }

        const message: MessageType = {
            type: 'ai',
            text: `The correct answer is: ${wordData?.word}`,
        }

        const newMessages = [...messages, requestMsg, message]
        setMessages(newMessages)

        fetchAnotherWord()
    }

    const onAnotherWordPress = () => {
        const requestMsg: MessageType = {
            type: 'player',
            text: 'Give me another word',
        }

        const newMessages = [requestMsg]
        setMessages(newMessages)

        fetchAnotherWord()
    }

    const onSendAnswerPress = () => {
        if (playerAnswer.trim()) {
            const isCorrect =
                playerAnswer.toLowerCase() === wordData?.word.toLowerCase()

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

            fetchAnotherWord()
        }
    }

    const onUsagePress = () => {
        const requestMsg: MessageType = {
            type: 'player',
            text: 'Show me how the word is used',
        }

        const message: MessageType = {
            type: 'ai',
            text: wordData?.usage || '',
        }

        const newMessages = [...messages, requestMsg, message]
        setMessages(newMessages)

        increaseNoHints()
    }

    const onRootOriginPress = () => {
        const requestMsg: MessageType = {
            type: 'player',
            text: 'Give the the root origin of the word',
        }

        const message: MessageType = {
            type: 'ai',
            text: wordData?.rootOrigin || '',
        }

        const newMessages = [...messages, requestMsg, message]
        setMessages(newMessages)

        increaseNoHints()
    }

    const onLanguageOriginPress = () => {
        const requestMsg: MessageType = {
            type: 'player',
            text: 'Give the the language origin of the word',
        }

        const message: MessageType = {
            type: 'ai',
            text: wordData?.languageOrigin || '',
        }

        const newMessages = [...messages, requestMsg, message]
        setMessages(newMessages)

        increaseNoHints()
    }

    const onAlternatePronunciationPress = () => {
        const requestMsg: MessageType = {
            type: 'player',
            text: 'Give the the alternate pronunciation of the word',
        }

        const message: MessageType = {
            type: 'ai',
            text: wordData?.alternatePronunciation || '',
        }

        const newMessages = [...messages, requestMsg, message]
        setMessages(newMessages)

        increaseNoHints()
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

    const speakCurrentWord = async () => {
        speak(wordData)
    }

    const speak = async (data: WordType | null | undefined) => {
        if (data) {
            if (data.url) {
                const { sound } = await Audio.Sound.createAsync(
                    { uri: data.url },
                    { shouldPlay: true }
                )
                await sound.playAsync()
            } else {
                Speech.speak(data.word)
            }
        }
    }

    const increaseNoHints = () => {
        const updatedResult: PracticeResultType = {
            ...practiceResult,
            noHintsUsed: practiceResult.noHintsUsed + 1,
        }
        setPracticeResult(updatedResult)
    }

    return {
        fetchingWordData,
        wordData,
        playerAnswer,
        setPlayerAnswer,
        messages,
        speakCurrentWord,
        onDefinitionHintPress,
        onUsagePress,
        onRootOriginPress,
        onLanguageOriginPress,
        onAlternatePronunciationPress,
        onPartOfSpeechHintPress,
        onSynonymHintPress,
        onShowAnswerPress,
        onAnotherWordPress,
        onSendAnswerPress,
        onEndPracicePress,
    }
}

export default usePracticeGameController
