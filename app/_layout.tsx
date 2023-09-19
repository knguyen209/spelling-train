import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'

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
        <Stack
            initialRouteName='index'
            screenOptions={{
                // headerStyle: {
                //     backgroundColor: '#FE516A',
                // },
                // headerTintColor: '#FFF',
                headerShown: false,
            }}
        >
            <Stack.Screen
                name='tabs'
                options={{
                    headerShown: false,
                    title: 'Home',
                }}
            />
            <Stack.Screen
                name='modals/new-list'
                options={{ presentation: 'modal' }}
            />
        </Stack>
    )
}

export default PageLayout
