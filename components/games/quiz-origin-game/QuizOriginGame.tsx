import { forwardRef, useImperativeHandle } from 'react'
import {
    GameContainerControlHandle,
    IJourneyGame,
    IQuizOriginGame,
    ISpokenWordGame,
} from '../../../types/genericTypes'
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    TouchableOpacity,
    View,
} from 'react-native'
import { BORDER_RADIUS, COLORS, SVGS } from '../../../constants'
import STText from '../../commons/st-text/STText'
import STButton from '../../commons/st-button/STButton'

import { MotiView } from 'moti'
import useSpokenWordGameController from '../../../controllers/games/useSpokenWordGameController'
import { MotiPressable } from 'moti/interactions'
import { nanoid } from '@reduxjs/toolkit'
import useQuizOriginGameController from '../../../controllers/games/useQuizOriginGameController'

type QuizOriginGameProps = {
    gameData: IQuizOriginGame
}

const QuizOriginGame = forwardRef<
    GameContainerControlHandle,
    QuizOriginGameProps
>((props, ref) => {
    const {
        loading,
        options,
        answers,
        onAnswerOptionSelected,
        validateAnswers,
    } = useQuizOriginGameController(props.gameData)

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

            {loading ? (
                <ActivityIndicator />
            ) : (
                <>
                    <View>
                        <STText>{props.gameData.question}</STText>
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

type SpokenWordItemProps = {
    id: string
    word: string
    isCorrect?: boolean
    disabled?: boolean
    index: number
    onItemPressed: (id: string) => void
}
const SpokenWordItem = ({
    id,
    word,
    isCorrect = false,
    disabled = false,
    index,
    onItemPressed,
}: SpokenWordItemProps) => {
    return (
        <View
            style={[
                {
                    width: '50%',
                    position: 'relative',
                    paddingVertical: 5,
                    justifyContent: 'center',
                },
                index % 2 === 0
                    ? {
                          paddingRight: 5,
                      }
                    : {
                          paddingLeft: 5,
                      },
            ]}
        >
            <STButton
                text={word}
                listItemType
                onPress={() => onItemPressed(id)}
                disabled={disabled}
                textTransformType='lowercase'
            />
            {isCorrect && (
                <SVGS.CheckMark
                    width={20}
                    height={20}
                    style={{ position: 'absolute', right: 10 }}
                />
            )}
        </View>
    )
}

export default QuizOriginGame
