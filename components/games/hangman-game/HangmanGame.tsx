import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import STText from '../../commons/st-text/STText'
import { BORDER_RADIUS, COLORS, SVGS } from '../../../constants'
import {
    GameContainerControlHandle,
    IHangmanGame,
} from '../../../types/genericTypes'

import { forwardRef, useImperativeHandle } from 'react'
import { MotiView } from 'moti'
import { MotiPressable } from 'moti/interactions'
import useHangmanGameController from '../../../controllers/games/useHangmanGameController'

type HangmanGameProps = {
    gameData: IHangmanGame
}

const HangmanGame = forwardRef<GameContainerControlHandle, HangmanGameProps>(
    (props, ref) => {
        const {
            loading,
            keys,
            selectedKeys,
            attempts,
            onKeyPress,
            validateAnswers,
        } = useHangmanGameController(props.gameData)

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
                exit={{ translateX: -200 }}
                style={{ gap: 40 }}
            >
                <View
                    style={{
                        alignItems: 'center',
                        gap: 20,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}
                >
                    <View>
                        <SVGS.GenieMale width={80} height={80} />
                    </View>
                    <STText size='md' weight='semibold'>
                        {props.gameData.gameTitle}
                    </STText>
                </View>
                {loading ? (
                    <ActivityIndicator />
                ) : (
                    <View style={{ gap: 20 }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                gap: 10,
                                justifyContent: 'center',
                            }}
                        >
                            {props.gameData.correctAnswer
                                .split('')
                                .map((c, idx) => (
                                    <View key={idx}>
                                        <STText size='2xl'>
                                            {selectedKeys.includes(c) ? c : '_'}
                                        </STText>
                                    </View>
                                ))}
                        </View>
                        <View style={{ gap: 8 }}>
                            <STText color={COLORS.primary} weight='bold'>
                                Usage:
                            </STText>
                            <STText>{props.gameData.usageWithBlanks}</STText>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 6 }}>
                            <STText>You have</STText>
                            <STText color={COLORS.primary} weight='bold'>
                                {(
                                    props.gameData.defaultAttempts - attempts
                                ).toString()}
                            </STText>
                            <STText>{`attempt${
                                props.gameData.defaultAttempts - attempts > 1
                                    ? 's'
                                    : ''
                            } left`}</STText>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                gap: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {keys.map((key) => (
                                <MotiPressable
                                    key={key.character}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: BORDER_RADIUS.sm,
                                    }}
                                    animate={{
                                        backgroundColor: key.isSelected
                                            ? props.gameData.correctAnswer.includes(
                                                  key.character
                                              )
                                                ? COLORS.correctAnswer
                                                : COLORS.incorrectAnswer
                                            : '#243946',
                                    }}
                                    onPress={() => onKeyPress(key.character)}
                                    disabled={
                                        attempts ===
                                        props.gameData.defaultAttempts
                                    }
                                >
                                    <STText weight='bold'>
                                        {key.character.toUpperCase()}
                                    </STText>
                                </MotiPressable>
                            ))}
                        </View>
                    </View>
                )}
            </MotiView>
        )
    }
)

export default HangmanGame
