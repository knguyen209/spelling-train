import { View } from 'react-native'
import STText from '../../commons/st-text/STText'
import { BORDER_RADIUS, COLORS, SVGS } from '../../../constants'
import {
    GameContainerControlHandle,
    IFindMissingLetterGame,
    IJourneyGame,
} from '../../../types/genericTypes'
import useMissingGameController from '../../../controllers/games/useMissingGameController'
import STButton from '../../commons/st-button/STButton'
import { forwardRef, useImperativeHandle } from 'react'
import { MotiView } from 'moti'
import { MotiPressable } from 'moti/interactions'

type MissingLetterGameProps = {
    gameData: IFindMissingLetterGame
}

const MissingLetterGame = forwardRef<
    GameContainerControlHandle,
    MissingLetterGameProps
>((props, ref) => {
    const { options, onAnswerOptionSelected, validateAnswers } =
        useMissingGameController(props.gameData)

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
                <STText size='lg' weight='semibold'>
                    {props.gameData.gameTitle}
                </STText>
            </View>
            <View
                style={{
                    alignItems: 'center',
                    gap: 20,
                }}
            >
                <View
                    style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}
                >
                    {props.gameData.wordWithMissingLetter
                        .split('')
                        .map((w, idx) => (
                            <MotiView
                                key={idx}
                                style={{
                                    padding: 10,
                                    borderRadius: BORDER_RADIUS.md,
                                    alignItems: 'center',
                                }}
                                animate={{
                                    backgroundColor:
                                        options.filter((o) => o.isCorrect)
                                            .length === 1
                                            ? COLORS.correctAnswer
                                            : COLORS.gray,
                                }}
                            >
                                <STText
                                    size={
                                        props.gameData.wordWithMissingLetter
                                            .length > 10
                                            ? 'md'
                                            : 'lg'
                                    }
                                    weight='bold'
                                    color='black'
                                >
                                    {w === '_'
                                        ? options.filter((o) => o.isCorrect)
                                              .length === 1
                                            ? props.gameData.correctAnswer
                                            : w
                                        : w}
                                </STText>
                            </MotiView>
                        ))}
                </View>
                <STText>Select an option:</STText>
                <View
                    style={{
                        gap: 16,
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                >
                    {options.map((option) => (
                        <MotiPressable
                            onPress={() => onAnswerOptionSelected(option.id)}
                            animate={{
                                backgroundColor: option.isSelected
                                    ? option.isCorrect
                                        ? COLORS.correctAnswer
                                        : COLORS.incorrectAnswer
                                    : COLORS.black,
                            }}
                            style={{
                                padding: 20,
                                borderRadius: BORDER_RADIUS.md,
                                minWidth: 40,
                                minHeight: 40,
                                alignItems: 'center',
                            }}
                            key={option.id}
                            disabled={
                                options.filter((o) => o.isCorrect).length === 1
                            }
                        >
                            <STText size='2xl' weight='bold'>
                                {option.text}
                            </STText>
                        </MotiPressable>
                    ))}
                </View>
            </View>
        </MotiView>
    )
})

export default MissingLetterGame
