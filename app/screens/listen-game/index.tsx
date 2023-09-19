import { Stack, useLocalSearchParams } from 'expo-router'
import { SafeAreaView, Text, View } from 'react-native'
import BackButton from '../../../components/commons/back-button/BackButton'
import GameHeader from '../../../components/commons/game-header/GameHeader'

const ListenGameScreen = () => {
    const localParams = useLocalSearchParams()
    console.log(localParams)

    return (
        <SafeAreaView style={{ backgroundColor: '#FFF', height: '100%' }}>
            <View>
                <GameHeader />
                <Text>Listen Game</Text>
            </View>
        </SafeAreaView>
    )
}

export default ListenGameScreen
