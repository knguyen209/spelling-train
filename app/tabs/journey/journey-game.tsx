import { View } from 'react-native'
import { COLORS } from '../../../constants'
import JourneyGameContainer from '../../../components/journey/journey-game-container/JourneyGameContainer'
import { useLocalSearchParams } from 'expo-router'

export default function Page() {
    const { id } = useLocalSearchParams()

    return (
        <View
            style={{
                backgroundColor: COLORS.appBodyBg,
                minHeight: '100%',
                padding: 20,
            }}
        >
            <JourneyGameContainer id={id?.toString() || ''} />
        </View>
    )
}
