import { AnimatePresence, MotiView } from 'moti'
import { View, Text, useWindowDimensions, SafeAreaView } from 'react-native'
import SBButton from '../../commons/sb-button/SBButton'
import { COLORS } from '../../../constants'
import AnimatedLottieView from 'lottie-react-native'
import { useRef } from 'react'
import SBText from '../../commons/sb-text/SBText'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ViewContainer from '../../commons/view-container/ViewContainer'
import STText from '../../commons/st-text/STText'
import STButton from '../../commons/st-button/STButton'
import { PracticeResultType } from '../../../types/genericTypes'

const GameResult = () => {
    const animation = useRef<AnimatedLottieView>(null)
    const title = 'Perfect Lesson!'
    const router = useRouter()
    const { totalTime, noCorrect, noHintsUsed, noQuestions } =
        useLocalSearchParams()
    return (
        <ViewContainer>
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
                <View style={{ width: '100%' }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <STText>Practice Time:</STText>
                        <STText>{totalTime?.toString() || ''}</STText>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <STText>No. of Correct Answers:</STText>
                        <STText>{noCorrect?.toString() || ''}</STText>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <STText>No. of Hints Used:</STText>
                        <STText>{noHintsUsed?.toString() || ''}</STText>
                    </View>
                </View>

                <View style={{ width: '100%', paddingHorizontal: 20 }}>
                    <STButton
                        text='Continue'
                        textTransformType='uppercase'
                        textCentered
                        onPress={() => {
                            router.push('/')
                        }}
                    />
                </View>
            </View>
        </ViewContainer>
    )
}

export default GameResult
