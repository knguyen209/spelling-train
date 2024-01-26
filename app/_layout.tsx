import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { COLORS } from '../constants'
import ConfirmationModalContextProvider from '../providers/modal-dialog/ModalDialogProvider'

const PageLayout = () => {
    const [fontsLoaded] = useFonts({
        NunitoBold: require('../assets/fonts/Nunito-Bold.ttf'),
        NunitoSemiBold: require('../assets/fonts/Nunito-SemiBold.ttf'),
        NunitoRegular: require('../assets/fonts/Nunito-Regular.ttf'),
        NunitoMedium: require('../assets/fonts/Nunito-Medium.ttf'),
        ionicons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
    })

    if (!fontsLoaded) {
        return null
    }

    return (
        <ConfirmationModalContextProvider>
            <Stack initialRouteName='index'>
                <Stack.Screen
                    name='welcome'
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='get-started'
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='create-profile'
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='login'
                    options={{
                        headerTitle: 'Login',
                        headerStyle: { backgroundColor: COLORS.appBarBg },
                        headerTitleStyle: { color: COLORS.primary },
                        headerTintColor: COLORS.primary,
                    }}
                />
                <Stack.Screen name='tabs' options={{ headerShown: false }} />
            </Stack>
        </ConfirmationModalContextProvider>
    )
}

export default PageLayout
