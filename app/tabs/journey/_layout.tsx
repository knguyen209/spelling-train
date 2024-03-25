import { Stack, useRouter } from 'expo-router'
import { COLORS, SVGS } from '../../../constants'
import { TouchableOpacity } from 'react-native'
import ResultModalContextProvider from '../../../providers/result-dialog/ResultDialogProvider'
import ConfirmationModalContextProvider from '../../../providers/modal-dialog/ModalDialogProvider'

export default function Layout() {
    const router = useRouter()
    return (
        <ResultModalContextProvider>
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: COLORS.appBarBg },
                    headerTintColor: COLORS.primary,
                    headerBackTitleVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                router.back()
                            }}
                        >
                            <SVGS.BackIcon width={40} height={40} />
                        </TouchableOpacity>
                    ),
                    headerShadowVisible: false,
                }}
            >
                <Stack.Screen
                    name='index'
                    options={{ headerTitle: 'Journey', headerLeft: () => null }}
                />
                <Stack.Screen
                    name='journey-game'
                    options={{
                        headerTitle: 'Journey',
                        headerLeft: () => (
                            <TouchableOpacity
                                onPress={() => {
                                    router.back()
                                }}
                            >
                                <SVGS.CloseIcon
                                    width={30}
                                    height={30}
                                    fill={COLORS.primary}
                                />
                            </TouchableOpacity>
                        ),
                        presentation: 'fullScreenModal',
                    }}
                />
                <Stack.Screen
                    name='generate-journey-games-modal'
                    options={{
                        headerTitle: 'Create Journey Games by AI',
                    }}
                />
            </Stack>
        </ResultModalContextProvider>
    )
}
