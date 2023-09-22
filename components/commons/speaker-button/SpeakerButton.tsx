import AnimatedLottieView from 'lottie-react-native'
import { useRef, useEffect } from 'react'
import { Pressable, View } from 'react-native'
import * as Speech from 'expo-speech'

import styles from './styles'

type Props = {
    width?: number
    height?: number
    elevated?: boolean
    speakContent?: string
}

const SpeakerButton = ({
    width = 100,
    height = 100,
    elevated = true,
    speakContent = '',
}: Props) => {
    const animation = useRef<AnimatedLottieView>(null)

    useEffect(() => {
        animation.current?.play()
        speak()
    }, [])

    const speak = () => {
        Speech.speak(speakContent, {
            onDone: () => {
                setTimeout(() => {
                    animation.current?.reset()
                }, 300)
            },
        })
    }

    const replay = () => {
        animation.current?.play()
        Speech.isSpeakingAsync().then((isSpeaking) => {
            if (!isSpeaking) {
                speak()
            }
        })
    }

    return (
        <Pressable
            onPress={() => {
                replay()
            }}
        >
            {({ pressed }) => {
                const styleSheet = styles({
                    width,
                    height,
                    elevated,
                    pressed,
                })
                return (
                    <View>
                        <View style={styleSheet.darkerShade} />
                        <View style={styleSheet.container}>
                            <AnimatedLottieView
                                resizeMode='contain'
                                loop={false}
                                ref={animation}
                                source={require('../../../assets/lotties/lottie_sound_wave_drk_theme.json')}
                            />
                        </View>
                    </View>
                )
            }}
        </Pressable>
    )
}

export default SpeakerButton
