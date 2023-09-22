import { AnimatePresence, MotiView } from 'moti'
import { View, Text, useWindowDimensions, SafeAreaView } from 'react-native'
import SBButton from '../../commons/sb-button/SBButton'
import { COLORS } from '../../../constants'
import AnimatedLottieView from 'lottie-react-native'
import { useRef } from 'react'
import SBText from '../../commons/sb-text/SBText'
import { useRouter } from 'expo-router'

const GameResult = () => {
    const animation = useRef<AnimatedLottieView>(null)
    const title = 'Perfect Lesson!'
    const router = useRouter()
    return (
        <SafeAreaView>
            <View
                style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                    padding: 20,
                }}
            >
                <View />
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                    <AnimatedLottieView
                        autoPlay
                        ref={animation}
                        source={require('../../../assets/lotties/lottie_cheer.json')}
                        style={{
                            height: 300,
                        }}
                    />
                    <SBText size='3xl' weight='bold' color='#E7B800'>
                        {title}
                    </SBText>
                </View>

                <View style={{ width: '100%', paddingHorizontal: 20 }}>
                    <SBButton
                        title='Continue'
                        type='contained'
                        textCentered
                        color={COLORS.speakerColor}
                        onPress={() => router.push('/tabs/practice')}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default GameResult
