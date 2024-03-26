import * as Speech from 'expo-speech'
import { Audio } from 'expo-av'
import { useEffect, useState } from 'react'
import {
    MessageType,
    PracticeResultType,
    WordType,
} from '../../types/genericTypes'
import { useRouter } from 'expo-router'

import { useAppSelector } from '../../store'
import {
    isEmptyWordData,
    playCorrectSound,
    playIncorrectSound,
} from '../../utils'
import { fetchWordData } from '../../store/spellTrainSlice'
import { useConfirmationModalContext } from '../../providers/modal-dialog/ModalDialogProvider'
import { View } from 'react-native'
import STText from '../../components/commons/st-text/STText'

const usePracticeGameController = (wordListId: number) => {
    const router = useRouter()

    const { user, wordLists } = useAppSelector((state) => state.spellTrain)

    const [wordData, setWordData] = useState<WordType | undefined>(undefined)
    const [fetchingWordData, setFetchingWordData] = useState(true)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [messages, setMessages] = useState<Array<MessageType>>([])

    const [playerAnswer, setPlayerAnswer] = useState('')
    const [sound, setSound] = useState<Audio.Sound>()
    const [noQuestions, setNoQuestions] = useState(0)
    const [noHints, setNoHints] = useState(0)
    const [noCorrects, setNoCorrects] = useState(0)
    const [startTime, setStartTime] = useState<Date>()

    const confirmModal = useConfirmationModalContext()

    useEffect(() => {
        fetchAnotherWord()
        setStartTime(new Date())
    }, [])

    useEffect(() => {
        speak(wordData)
    }, [wordData])

    useEffect(() => {
        return sound
            ? () => {
                  sound.unloadAsync()
              }
            : undefined
    }, [sound])

    const fetchAnotherWord = async () => {
        let wordList = wordLists.filter((item) => item.id == wordListId)[0]
        setFetchingWordData(true)
        if (wordList) {
            // randomly select a word in the list
            let index = Math.floor(Math.random() * wordList.words.length)
            let word = wordList.words[index]
            try {
                if (isEmptyWordData(word)) {
                    let data = await fetchWordData(
                        word.id,
                        user?.accessToken || ''
                    )
                    setWordData(data)
                } else {
                    setWordData(word)
                }
            } catch (e) {
                console.log(e)
            } finally {
                setFetchingWordData(false)
                setNoQuestions(noQuestions + 1)
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
                playerAnswer.toLowerCase().trim() ===
                wordData?.word.toLowerCase()

            const requestMsg: MessageType = {
                type: 'player',
                text: playerAnswer,
            }

            const message: MessageType = {
                type: 'ai',
                text: isCorrect ? 'Correct!' : 'Incorrect. Try again.',
            }

            if (isCorrect) {
                setNoCorrects(noCorrects + 1)
                playCorrectSound()
                fetchAnotherWord()
            } else {
                playIncorrectSound()
            }

            const newMessages = [...messages, requestMsg, message]
            setMessages(newMessages)

            setPlayerAnswer('')
        }
    }

    const onUsagePress = () => {
        const requestMsg: MessageType = {
            type: 'player',
            text: 'Show me how the word is used',
        }

        const message: MessageType = {
            type: 'ai',
            text:
                wordData?.usage?.replace(
                    wordData.word,
                    Array(wordData.word.length).fill('_').join('')
                ) || '',
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

    const onEndPracicePress = async () => {
        const result = await confirmModal.showConfirmation(
            'Message',
            'Are you sure you want to end the practice?',
            false,
            'End Practice',
            'No'
        )
        if (result) {
            const endTime = new Date()

            let elapsedTime = 0
            if (startTime) {
                // calculate the total time elapsed
                elapsedTime = Math.floor(
                    (endTime.getTime() - startTime.getTime()) / 1000 / 60
                )
            }

            confirmModal
                .showConfirmation(
                    'Your practice result',
                    createPracticeResultView(
                        noQuestions,
                        noCorrects,
                        noHints,
                        elapsedTime
                    ),
                    true,
                    'Continue'
                )
                .then(() => {
                    sound?.unloadAsync()
                    router.back()
                })
        }
    }

    const speakCurrentWord = async () => {
        speak(wordData)
    }

    const speak = async (data: WordType | null | undefined) => {
        setIsSpeaking(true)
        if (data) {
            if (data.audioUrl) {
                const { sound } = await Audio.Sound.createAsync(
                    { uri: `http://localhost:8000/${data.audioUrl}` },
                    { shouldPlay: false }
                )
                setSound(sound)
                setTimeout(() => {
                    sound.playAsync().then(() => {
                        setTimeout(() => setIsSpeaking(false), 500)
                    })
                }, 500)
            } else {
                Speech.speak(data.word)
            }
        }
        setIsSpeaking(false)
    }

    const increaseNoHints = () => {
        setNoHints(noHints + 1)
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
        isSpeaking,
    }
}

const createPracticeResultView = (
    noQuestions: number,
    noCorrects: number,
    noHints: number,
    totalTime: number
) => {
    return (
        <View style={{ width: '100%' }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <STText>Practice Time:</STText>
                <STText>
                    {(totalTime?.toString() || '') +
                        ` minute` +
                        (totalTime != 1 ? 's' : '')}
                </STText>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <STText>No. of Questions:</STText>
                <STText>{noQuestions?.toString() || ''}</STText>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <STText>No. of Correct Answers:</STText>
                <STText>{noCorrects?.toString() || ''}</STText>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <STText>No. of Hints Used:</STText>
                <STText>{noHints?.toString() || ''}</STText>
            </View>
        </View>
    )
}

export default usePracticeGameController
