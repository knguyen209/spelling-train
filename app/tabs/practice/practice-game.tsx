import { useLocalSearchParams } from 'expo-router'
import PracticeGame from '../../../components/games/practice-game/PracticeGame'

export default function Page() {
    const { id } = useLocalSearchParams()
    return <PracticeGame practiceListId={id?.toString() || ''} />
}
