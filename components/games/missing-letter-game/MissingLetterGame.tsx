import { View } from 'react-native'
import STText from '../../commons/st-text/STText'
import { SVGS } from '../../../constants'
import {
    GameContainerControlHandle,
    IJourneyGame,
} from '../../../types/genericTypes'
import useMissingGameController from '../../../controllers/games/useMissingGameController'
import STButton from '../../commons/st-button/STButton'
import { forwardRef, useImperativeHandle } from 'react'
import { MotiView } from 'moti'

type MissingLetterGameProps = {
    gameData: IJourneyGame
}

const MissingLetterGame = forwardRef<
    GameContainerControlHandle,
    MissingLetterGameProps
>((props, ref) => {
    const {
        quizzes,
        options,
        answers,
        onAnswerOptionSelected,
        onUncheckAnswerPress,
        validateAnswers,
    } = useMissingGameController(props.gameData)

    useImperativeHandle(ref, () => ({
        onNextClick() {
            return validateAnswers()
        },
    }))

    return (
        <MotiView
            animate={{ translateX: 0 }}
            from={{ translateX: 200 }}
            transition={{ type: 'spring', duration: 1000 }}
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
                    Find the missing letter
                </STText>
            </View>
            <View
                style={{
                    alignItems: 'center',
                    gap: 20,
                }}
            >
                {quizzes.map((quiz, quizIdx) => (
                    <View
                        key={quizIdx}
                        style={{
                            flexDirection: 'row',
                            gap: 20,
                            alignItems: 'center',
                        }}
                    >
                        {quiz.quizWord.split('').map((letter, letterIdx) =>
                            letter === '_' ? (
                                <View key={letterIdx} style={{ marginTop: 8 }}>
                                    <STButton
                                        text={answers[quizIdx]?.text || '  '}
                                        textTransformType='lowercase'
                                        textSize='xl'
                                        listItemType
                                        onPress={() =>
                                            onUncheckAnswerPress(quizIdx)
                                        }
                                        disabled={answers[quizIdx]?.isCorrect}
                                    />
                                </View>
                            ) : (
                                <STText
                                    key={letterIdx}
                                    size='2xl'
                                    weight='bold'
                                >
                                    {letter}
                                </STText>
                            )
                        )}

                        {answers[quizIdx] && answers[quizIdx]?.isCorrect && (
                            <SVGS.CheckMark width={25} height={25} />
                        )}
                    </View>
                ))}
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    gap: 20,
                    justifyContent: 'center',
                }}
            >
                {options.map((option) => (
                    <STButton
                        key={option.id}
                        text={option.text}
                        textTransformType='lowercase'
                        textSize='xl'
                        listItemType
                        onPress={() => onAnswerOptionSelected(option.id)}
                        disabled={option.selected}
                    />
                ))}
            </View>
        </MotiView>
    )
})

export default MissingLetterGame
