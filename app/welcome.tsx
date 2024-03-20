import { useRouter } from 'expo-router'
import { Image, SafeAreaView, Text, View } from 'react-native'
import ViewContainer from '../components/commons/view-container/ViewContainer'
import { COLORS, SVGS, gifs } from '../constants'
import STButton from '../components/commons/st-button/STButton'
import { useContext, useEffect } from 'react'
import { AuthenticationContext } from '../providers/authentication-provider/AuthenticationProvider'

export default function WelcomeScreen() {
    const router = useRouter()
    const authContext = useContext(AuthenticationContext)

    useEffect(() => {
        checkIfUserLoggedIn()
    }, [])

    const checkIfUserLoggedIn = async () => {
        if (authContext?.userProfile) {
            console.log('Auth: ' + authContext?.userProfile.accessToken)
            router.push('/tabs/journey')
        }
    }

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
                    <View style={{ width: '100%', gap: 20 }}>
                        <STButton
                            text='Get started'
                            textCentered
                            onPress={() => {
                                router.push('/get-started')
                            }}
                        />
                        <STButton
                            text='Already have an account'
                            textCentered
                            primary={false}
                            onPress={() => {
                                router.push('/login')
                            }}
                        />
                    </View>
                </View>
            </ViewContainer>
        </SafeAreaView>
    )
}
