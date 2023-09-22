import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native'

import ListenGame from '../../../components/games/listen-game/ListenGame'

const ListenGameScreen = () => {
    const localParams = useLocalSearchParams()
    // console.log(localParams)

    const game: ListenGameType = {
        stages: [
            { word: 'red', options: ['get', 'wet', 'rid'] },
            { word: 'green', options: ['queen', 'greet', 'tween'] },
            { word: 'blue', options: ['boo', 'flu', 'shoo'] },
            { word: 'violet', options: ['violate', 'scarlet', 'tablet'] },
            { word: 'scarlet', options: ['scar', 'violet', 'palette'] },
        ],
    }

    return (
        // <SafeAreaView style={{ backgroundColor: '#FFF', height: '100%' }}>
        <ListenGame stages={game.stages} />
        // </SafeAreaView>
    )
}

export default ListenGameScreen
