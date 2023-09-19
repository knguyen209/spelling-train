import { Stack } from 'expo-router'
import { View, Text } from 'react-native'
import BackButton from '../../../components/commons/back-button/BackButton'
import PracticeGameSelection from '../../../components/practice-game-selection/PracticeGameSelection'

const PracticeGameSelectionSreen = () => {
    return (
        <View>
            <Stack.Screen
                options={{
                    title: '',
                    headerLeft: () => <BackButton />,
                    headerShadowVisible: false,
                }}
            />
            <PracticeGameSelection />
        </View>
    )
}

export default PracticeGameSelectionSreen
