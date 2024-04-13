import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import STText from '../../commons/st-text/STText'
import { BORDER_RADIUS, COLORS, SVGS } from '../../../constants'
import {
    GameContainerControlHandle,
    ISpellWordGame,
} from '../../../types/genericTypes'

import { forwardRef, useImperativeHandle } from 'react'
import { MotiView } from 'moti'

import { MotiPressable } from 'moti/interactions'

import useSpellWordGameController from '../../../controllers/games/useSpellWordGameController'
import STTextField from '../../commons/st-textfield/STTextField'

type SpellWordGameProps = {
    gameData: ISpellWordGame
}

const SpellWordGame = forwardRef<
    GameContainerControlHandle,
    SpellWordGameProps
>((props, ref) => {
    const {
        loading,
        isSpeaking,
        answer,
        speak,
        onAnswerChanged,
        validateAnswers,
    } = useSpellWordGameController(props.gameData)

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
                            flexDirection: 'column',
                            gap: 20,
                            justifyContent: 'center',
                        }}
                    >
                        <View style={{ alignItems: 'center' }}>
                            <MotiPressable
                                onPress={speak}
                                animate={{ scale: isSpeaking ? 1.1 : 1.0 }}
                                disabled={isSpeaking}
                            >
                                <SVGS.GenieSpeaker width={200} height={200} />
                            </MotiPressable>
                        </View>
                        <STTextField
                            placeholder='Enter your guess'
                            val={answer}
                            onChange={(newVal) => onAnswerChanged(newVal)}
                        />
                    </View>
                </>
            )}
        </MotiView>
    )
})

export default SpellWordGame
