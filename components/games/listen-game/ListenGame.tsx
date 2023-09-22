import {
    View,
    Text,
    useWindowDimensions,
    SafeAreaView,
    ScrollView,
} from 'react-native'

import SBButton from '../../commons/sb-button/SBButton'

import styles from './styles'

import SpeakerButton from '../../commons/speaker-button/SpeakerButton'
import { useEffect, useReducer, useState } from 'react'
import GameHeader from '../../commons/game-header/GameHeader'
import { COLORS } from '../../../constants'

import { AnimatePresence, MotiView } from 'moti'
import {
    playCorrectSound,
    playIncorrectSound,
    shuffleArray,
} from '../../../utils'
import ResultDialog from '../../commons/result-dialog/ResultDialog'
import GameResult from '../game-result/GameResult'
import SBText from '../../commons/sb-text/SBText'

const ListenGame = ({ stages }: { stages: Array<ListenGameStageType> }) => {
    const [currentStage, setCurrentStage] = useState(0)
    const [mistakes, setMistakes] = useState<Array<string>>([])
    const [resultScreenVisible, toggleResultScreen] = useReducer(
        (s) => !s,
        false
    )

    const nextStage = () => {
        if (currentStage < stages.length - 1) {
            setCurrentStage(currentStage + 1)
        } else {
            toggleResultScreen()
        }
    }

    const checkAnswer = (selectedOption: string) => {
        if (selectedOption === stages[currentStage].word) {
            return true
        } else {
            const updatedMistakes = [...mistakes, stages[currentStage].word]
            setMistakes(updatedMistakes)
            return false
        }
    }

    return (
        <View style={{ height: '100%', justifyContent: 'space-between' }}>
            {!resultScreenVisible && (
                <SafeAreaView>
                    <GameHeader progress={(currentStage + 1) / stages.length} />
                </SafeAreaView>
            )}
            {!resultScreenVisible && (
                <ListenGameStage
                    stage={stages[currentStage]}
                    moveToNextStage={nextStage}
                    checkAnswer={checkAnswer}
                />
            )}
            {resultScreenVisible && (
                <SafeAreaView>
                    <GameResult />
                </SafeAreaView>
            )}
        </View>
    )
}

const ListenGameStage = ({
    stage,
    moveToNextStage,
    checkAnswer,
}: {
    stage: ListenGameStageType
    moveToNextStage: () => void
    checkAnswer: (selectedOption: string) => boolean
}) => {
    const { width } = useWindowDimensions()
    const [selectedOption, setSelectedOption] = useState('')
    const [options, setOptions] = useState<Array<string>>([])
    const [resultDialogVisible, toggleResultDialog] = useReducer(
        (s) => !s,
        false
    )
    const [isCorrect, setIsCorrect] = useState(false)

    const onOptionSelected = (option: string) => {
        setSelectedOption(option)
    }

    const onCheckButtonPressed = () => {
        if (selectedOption) {
            const answerResult = checkAnswer(selectedOption)

            setIsCorrect(answerResult)
            toggleResultDialog()

            if (!resultDialogVisible) {
                if (answerResult) {
                    playCorrectSound()
                } else {
                    playIncorrectSound()
                }
            }
        }
        if (resultDialogVisible) {
            setSelectedOption('')
            moveToNextStage()
        }
    }

    useEffect(() => {
        const shuffledOptions = shuffleArray([...stage.options, stage.word])
        setOptions(shuffledOptions)
    }, [stage])

    return (
        <AnimatePresence initial={false}>
            <MotiView
                style={{ ...styles.body }}
                key={stage.word}
                from={{
                    opacity: 0,
                    translateX: width,
                }}
                animate={{
                    opacity: 1,
                    translateX: 0,
                }}
                transition={{
                    translateX: {
                        type: 'timing',
                        duration: 300,
                    },
                }}
            >
                <ScrollView
                    contentContainerStyle={{
                        height: '100%',
                    }}
                >
                    <SBText size='xl' weight='bold'>
                        Tap what you hear
                    </SBText>
                    <View
                        style={{
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}
                    >
                        <SpeakerButton speakContent={stage.word} />
                    </View>
                    <OptionsView
                        options={options}
                        selectedOption={selectedOption}
                        onOptionSelected={onOptionSelected}
                    />
                </ScrollView>

                <View
                    style={{
                        flexDirection: 'column',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        paddingHorizontal: 20,
                        paddingBottom: 140,
                    }}
                >
                    <View style={{ zIndex: 1 }}>
                        <SBButton
                            title={
                                resultDialogVisible
                                    ? isCorrect
                                        ? 'Continue'
                                        : 'Got it'
                                    : 'Check'
                            }
                            type='contained'
                            textCentered
                            onPress={onCheckButtonPressed}
                            disabled={selectedOption === ''}
                            style={{ zIndex: 10 }}
                            color={
                                resultDialogVisible
                                    ? isCorrect
                                        ? COLORS.correctAnswer
                                        : COLORS.incorrectAnswer
                                    : COLORS.correctAnswer
                            }
                        />
                    </View>
                    <ResultDialog
                        visible={resultDialogVisible}
                        isCorrect={isCorrect}
                        correctAnswer={stage.word}
                    />
                </View>
            </MotiView>
        </AnimatePresence>
    )
}

const OptionsView = ({
    options,
    selectedOption,
    onOptionSelected,
}: {
    options: Array<string>
    selectedOption: string
    onOptionSelected: (option: string) => void
}) => {
    return (
        <View style={styles.optionsContainer}>
            {options.map((option) => (
                <OptionView
                    key={option}
                    option={option}
                    selectedOption={selectedOption}
                    onOptionSelected={() => {
                        onOptionSelected(option)
                    }}
                />
            ))}
        </View>
    )
}

const OptionView = ({
    option,
    selectedOption,
    onOptionSelected,
}: {
    option: string
    selectedOption: string
    onOptionSelected: () => void
}) => {
    return (
        <SBButton
            title={option}
            type='outlined'
            textTransformType='lowercase'
            onPress={onOptionSelected}
            color={
                selectedOption === option
                    ? COLORS.speakerColor
                    : COLORS.disabledBtnColor
            }
        />
    )
}

export default ListenGame
