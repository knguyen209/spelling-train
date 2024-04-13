import { ActivityIndicator, View } from 'react-native'
import STText from '../../commons/st-text/STText'
import { BORDER_RADIUS, COLORS, SVGS } from '../../../constants'
import {
    GameContainerControlHandle,
    IFindCorrectWord,
    IJourneyGame,
} from '../../../types/genericTypes'

import { forwardRef, useImperativeHandle } from 'react'
import { MotiView } from 'moti'

import { MotiPressable } from 'moti/interactions'
import useFindCorrectWordGameController from '../../../controllers/games/useFindCorrectWordGameController'

type FindCorrectWordGameProps = {
    gameData: IFindCorrectWord
}

const FindCorrectWordGame = forwardRef<
    GameContainerControlHandle,
    FindCorrectWordGameProps
>((props, ref) => {
    const { loading, options, onAnswerOptionSelected, validateAnswers } =
        useFindCorrectWordGameController(props.gameData)

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
                <>
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: 10,
                            flexWrap: 'wrap',
                        }}
                    >
                        <STText color={COLORS.primary} weight='bold'>
                            Definition:
                        </STText>
                        <STText>{props.gameData.definition}</STText>
                    </View>

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
                                <STText weight='semibold'>{option.text}</STText>
                            </MotiPressable>
                        ))}
                    </View>
                </>
            )}
        </MotiView>
    )
})

export default FindCorrectWordGame
