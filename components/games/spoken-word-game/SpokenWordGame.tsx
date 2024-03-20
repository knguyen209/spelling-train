import { forwardRef, useImperativeHandle } from 'react'
import {
    GameContainerControlHandle,
    IJourneyGame,
} from '../../../types/genericTypes'
import {
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    View,
} from 'react-native'
import { BORDER_RADIUS, COLORS, SVGS } from '../../../constants'
import STText from '../../commons/st-text/STText'
import STButton from '../../commons/st-button/STButton'

import { MotiView } from 'moti'
import useSpokenWordGameController from '../../../controllers/games/useSpokenWordGameController'
import { MotiPressable } from 'moti/interactions'

type SpokenWordGameProps = {
    gameData: IJourneyGame
}

const SpokenWordGame = forwardRef<
    GameContainerControlHandle,
    SpokenWordGameProps
>((props, ref) => {
    const {
        quiz,
        options,
        isSpeaking,
        speak,
        onQuizOpenSelected,
        validateAnswers,
        loading,
    } = useSpokenWordGameController(props.gameData)

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
                    Choose the spoken word
                </STText>
            </View>

            {loading ? (
                <ActivityIndicator />
            ) : (
                <>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => quiz && speak(quiz)}>
                            <SVGS.GenieSpeaker width={160} height={160} />
                        </TouchableOpacity>
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
                                onPress={() => onQuizOpenSelected(option.id)}
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
            {/* <View>
                <FlatList
                    data={options}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <SpokenWordItem
                            id={item.id}
                            word={item.text}
                            index={index}
                            isCorrect={item.isCorrect}
                            disabled={
                                isSpeaking || (item.isCorrect && item.answered)
                            }
                            onItemPressed={onQuizOpenSelected}
                        />
                    )}
                    numColumns={2}
                />
            </View> */}
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

export default SpokenWordGame
