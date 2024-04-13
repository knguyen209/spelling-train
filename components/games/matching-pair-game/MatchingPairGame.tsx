import { forwardRef, useImperativeHandle } from 'react'
import {
    GameContainerControlHandle,
    IMatchingPairGame,
} from '../../../types/genericTypes'
import { ActivityIndicator, View } from 'react-native'
import { BORDER_RADIUS, COLORS, SVGS } from '../../../constants'
import STText from '../../commons/st-text/STText'

import { MotiView } from 'moti'

import useMatchingPairGameController from '../../../controllers/games/useMatchingPairGameController'
import { MotiPressable } from 'moti/interactions'

type MatchingPairGameProps = {
    gameData: IMatchingPairGame
}

const MatchingPairGame = forwardRef<
    GameContainerControlHandle,
    MatchingPairGameProps
>((props, ref) => {
    const {
        loading,
        leftOptions,
        rightOptions,
        speak,
        onOptionSelected,
        validateAnswers,
    } = useMatchingPairGameController(props.gameData)

    useImperativeHandle(ref, () => ({
        onNextClick() {
            return validateAnswers()
        },
    }))

    return (
        <MotiView
            animate={{ translateX: 0 }}
            from={{ translateX: 200 }}
            transition={{ type: 'timing', duration: 500 }}
            style={{ gap: 40 }}
        >
            <View
                style={{
                    gap: 20,
                }}
            >
                <SVGS.GenieMale width={80} height={80} />
                <STText size='lg' weight='semibold'>
                    {props.gameData.gameTitle}
                </STText>
            </View>

            {loading ? (
                <ActivityIndicator />
            ) : (
                <>
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: 10,
                            justifyContent: 'space-between',
                        }}
                    >
                        <View style={{ gap: 10 }}>
                            {leftOptions.map((option) => (
                                <MotiPressable
                                    key={option.value}
                                    style={{
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        minWidth: 160,
                                        minHeight: 60,
                                        borderRadius: BORDER_RADIUS.sm,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    animate={{
                                        backgroundColor: option.isSelected
                                            ? option.isCorrect
                                                ? COLORS.correctAnswer
                                                : COLORS.incorrectAnswer
                                            : option.isCorrect
                                            ? COLORS.correctAnswer
                                            : '#223542',
                                    }}
                                    onPress={() =>
                                        onOptionSelected(option.value, false)
                                    }
                                    disabled={option.isCorrect}
                                >
                                    <STText>{option.value}</STText>
                                </MotiPressable>
                            ))}
                        </View>
                        <View style={{ gap: 10 }}>
                            {rightOptions.map((option) => (
                                <MotiPressable
                                    key={option.value}
                                    style={{
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        minWidth: 160,
                                        minHeight: 60,
                                        borderRadius: BORDER_RADIUS.sm,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    animate={{
                                        backgroundColor: option.isSelected
                                            ? option.isCorrect
                                                ? COLORS.correctAnswer
                                                : COLORS.incorrectAnswer
                                            : option.isCorrect
                                            ? COLORS.correctAnswer
                                            : '#223542',
                                    }}
                                    onPress={() => {
                                        onOptionSelected(option.value, true)
                                        speak(option.value)
                                    }}
                                    disabled={option.isCorrect}
                                >
                                    <SVGS.SpeakerWaveIcon
                                        width={20}
                                        height={20}
                                        color='#FFF'
                                    />
                                </MotiPressable>
                            ))}
                        </View>
                    </View>
                </>
            )}
        </MotiView>
    )
})

export default MatchingPairGame
