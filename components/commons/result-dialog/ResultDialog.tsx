import { MotiView } from 'moti'
import React from 'react'
import { View, Image, Text, useWindowDimensions } from 'react-native'
import { COLORS, icons } from '../../../constants'
import styles from './result-dialog.styles'

const ResultDialog = ({
    isCorrect,
    correctAnswer,
    visible = false,
}: {
    isCorrect: boolean
    correctAnswer: string
    visible?: boolean
}) => {
    if (visible)
        return (
            <MotiView
                from={{ translateY: 200 }}
                animate={{ translateY: 0 }}
                transition={{
                    translateY: {
                        type: 'timing',
                        duration: 300,
                    },
                }}
                style={{
                    ...styles.resultContainer,
                    zIndex: 0,
                    backgroundColor: isCorrect
                        ? COLORS.correctAnswerBg
                        : COLORS.incorrectAnswerBg,
                }}
            >
                <View style={styles.resultStatusContainer}>
                    <Image
                        source={
                            isCorrect ? icons.correctIcon : icons.incorrectIcon
                        }
                        style={styles.statusImage}
                        resizeMode='contain'
                    />
                    <Text
                        style={{
                            ...styles.statusText,
                            color: isCorrect
                                ? COLORS.correctAnswer
                                : COLORS.incorrectAnswer,
                        }}
                        allowFontScaling={false}
                    >
                        {isCorrect ? 'Correct' : 'Incorrect'}
                    </Text>
                </View>
                {!isCorrect && (
                    <View>
                        <Text
                            style={{
                                ...styles.answerText,
                                color: isCorrect
                                    ? COLORS.correctAnswer
                                    : COLORS.incorrectAnswer,
                            }}
                        >
                            Correct answer: {correctAnswer}
                        </Text>
                    </View>
                )}
            </MotiView>
        )
}

export default ResultDialog
