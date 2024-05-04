import { useEffect, useState } from 'react'
import { IMatchingPairGame } from '../../types/genericTypes'
import { Audio } from 'expo-av'
import { playCorrectSound } from '../../utils'

const useMatchingPairGameController = (gameData: IMatchingPairGame) => {
    const [loading, setLoading] = useState(true)
    const [leftOptions, setLeftOptions] = useState<Array<Option>>([])
    const [rightOptions, setRightOptions] = useState<Array<Option>>([])
    const [selectedLeftOption, setSelectedLeftOption] = useState<
        string | undefined
    >(undefined)
    const [selectedRightOption, setSelectedRightOption] = useState<
        string | undefined
    >(undefined)
    const [isSpeaking, setIsSpeaking] = useState(true)
    const [sound, setSound] = useState<Audio.Sound>()

    const [correctPairs, setCorrectPairs] = useState<Map<string, string>>()

    useEffect(() => {
        initialize()
    }, [])

    useEffect(() => {
        if (selectedLeftOption && selectedRightOption) {
            const correctRightOption = correctPairs?.get(selectedLeftOption)
            if (selectedRightOption === correctRightOption) {
                playCorrectSound()
                let tLeftOptions = leftOptions.map((o) =>
                    o.value === selectedLeftOption
                        ? { ...o, isCorrect: true }
                        : o
                )
                setLeftOptions(tLeftOptions)
                let tRightOptions = rightOptions.map((o) =>
                    o.value === selectedRightOption
                        ? { ...o, isCorrect: true }
                        : o
                )
                setRightOptions(tRightOptions)
            }
        }
    }, [selectedLeftOption, selectedRightOption])

    const initialize = async () => {
        setLoading(false)
        let tCorrectPairs: Map<string, string> = new Map<string, string>()
        gameData.correctPairs.forEach((pair) => {
            const key = Object.keys(pair)[0]
            const value = pair[key]
            tCorrectPairs.set(key, value)
        })

        setCorrectPairs(tCorrectPairs)

        let tLeftOptions: Array<Option> = []
        let tRightOptions: Array<Option> = []

        gameData.shuffledPairs.forEach((pair) => {
            const key = Object.keys(pair)[0]
            const value = pair[key]
            const leftOption: Option = {
                value: key,
                isSelected: false,
                isCorrect: false,
            }

            tLeftOptions.push(leftOption)

            const rightOption: Option = {
                value: value,
                isSelected: false,
                isCorrect: false,
            }
            tRightOptions.push(rightOption)
        })

        setLeftOptions(tLeftOptions)
        setRightOptions(tRightOptions)
    }

    const validateAnswers = async () => {
        let isAllLeftCorrect =
            leftOptions.filter((o) => o.isCorrect === false).length === 0
        let isAllRightCorrect =
            rightOptions.filter((o) => o.isCorrect === false).length === 0
        return isAllLeftCorrect && isAllRightCorrect
    }

    const onOptionSelected = (option: string, isRight: boolean) => {
        if (!isRight) {
            const updatedLeftOptions = leftOptions.map((o) => ({
                ...o,
                isSelected: option === o.value,
            }))
            setLeftOptions(updatedLeftOptions)
            setSelectedLeftOption(option)
        } else {
            const updatedRightOptions = rightOptions.map((o) => ({
                ...o,
                isSelected: option === o.value,
            }))
            setRightOptions(updatedRightOptions)
            setSelectedRightOption(option)
        }
    }

    const speak = async (audioUrl: string) => {
        setIsSpeaking(true)
        const { sound } = await Audio.Sound.createAsync(
            { uri: `http://localhost:8000/${audioUrl}` || '' },
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
        validateAnswers,
        leftOptions,
        rightOptions,
        speak,
        onOptionSelected,
    }
}

type Option = {
    value: string
    isSelected: boolean
    isCorrect: boolean
}

export default useMatchingPairGameController
