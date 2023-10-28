import { SafeAreaView, Image, View } from 'react-native'
import { COLORS, SVGS, gifs } from '../constants'
import ViewContainer from '../components/commons/view-container/ViewContainer'
import STButton from '../components/commons/st-button/STButton'
import STText from '../components/commons/st-text/STText'
import { useRouter } from 'expo-router'

export default function GetStartedScreen() {
    const router = useRouter()

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.appBodyBg }}>
            <ViewContainer>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#131D23',
                    }}
                >
                    <View>
                        <SVGS.SpellTrainLogo />
                    </View>
                    <Image
                        source={gifs.GetStartedTrainGif}
                        resizeMode='contain'
                        style={{ maxHeight: 300 }}
                    />
                    <View
                        style={{ width: '100%', gap: 20, alignItems: 'center' }}
                    >
                        <STText
                            color={COLORS.white}
                            size='xl'
                            weight='semibold'
                        >
                            Let's get started
                        </STText>
                        <STText
                            color={COLORS.disabledTxtColor}
                            size='xs'
                            style={{ textAlign: 'center' }}
                        >
                            Spell train is designed to be fun like game
                        </STText>
                    </View>
                    <View>
                        <STButton
                            text='Continue'
                            textCentered
                            onPress={() => {
                                router.push('/create-profile')
                            }}
                        />
                    </View>
                </View>
            </ViewContainer>
        </SafeAreaView>
    )
}
