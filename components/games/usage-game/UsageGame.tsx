import { ActivityIndicator, View } from 'react-native'
import STText from '../../commons/st-text/STText'
import { BORDER_RADIUS, COLORS, SVGS } from '../../../constants'
import {
    GameContainerControlHandle,
    IJourneyGame,
} from '../../../types/genericTypes'
import STButton from '../../commons/st-button/STButton'
import { forwardRef, useImperativeHandle } from 'react'
import { AnimatePresence, MotiView } from 'moti'
import useUsageGameController from '../../../controllers/games/useUsageGameController'
import { MotiPressable } from 'moti/interactions'

type UsageGameProps = {
    gameData: IJourneyGame
}

const UsageGame = forwardRef<GameContainerControlHandle, UsageGameProps>(
    (props, ref) => {
        const {
            loading,
            quiz,
            options,

            onAnswerOptionSelected,

            validateAnswers,
        } = useUsageGameController(props.gameData)

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
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 20,
                    }}
                >
                    <SVGS.GenieMale width={80} height={80} />
                    <STText size='md' weight='semibold'>
                        Select the right usage of the word
                    </STText>
                </View>
                {loading ? (
                    <ActivityIndicator />
                ) : (
                    <>
                        {quiz && <STText>{quiz.sentence}</STText>}
                        <View
                            style={{
                                flexDirection: 'column',
                                gap: 20,
                                justifyContent: 'center',
                            }}
                        >
                            {options.map((option) => (
                                <MotiPressable
                                    onPress={() =>
                                        onAnswerOptionSelected(option.id)
                                    }
                                    animate={{
                                        backgroundColor: option.selected
                                            ? option.isCorrect
                                                ? COLORS.correctAnswer
                                                : COLORS.incorrectAnswer
                                            : COLORS.black,
                                    }}
                                    style={{
                                        paddingHorizontal: 20,
                                        paddingVertical: 16,
                                        borderRadius: BORDER_RADIUS.md,
                                    }}
                                    key={option.id}
                                >
                                    <STText weight='semibold'>
                                        {option.text}
                                    </STText>
                                </MotiPressable>
                            ))}
                        </View>
                    </>
                )}
            </MotiView>
        )
    }
)

export default UsageGame
