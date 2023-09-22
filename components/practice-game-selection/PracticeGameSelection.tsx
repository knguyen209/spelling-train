import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { useRouter } from 'expo-router'
import SBText from '../commons/sb-text/SBText'

interface IPracticeGame {
    name: string
    href: string
}

const PracticeGameSelection = () => {
    const router = useRouter()

    const renderGameItem = (game: IPracticeGame) => {
        const onGameSelected = () =>
            router.push({ pathname: game.href, params: { name: game.name } })
        return (
            <TouchableOpacity onPress={() => onGameSelected()}>
                <View style={styles.gameContainer}>
                    <Text style={styles.gameName}>{game.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const practiceTypes: Array<IPracticeGame> = [
        { name: 'Listen', href: 'screens/listen-game' },
        { name: 'Missing Letter', href: '' },
        { name: 'Matching', href: '' },
        { name: 'Word Scramble', href: '' },
    ]

    return (
        <View style={styles.container}>
            <SBText weight='bold' size='xl' style={{ paddingBottom: 10 }}>
                Choose a practice game
            </SBText>
            <FlatList
                data={practiceTypes}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => renderGameItem(item)}
            />
        </View>
    )
}

export default PracticeGameSelection
