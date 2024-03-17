import { useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'
import WordDetailView from '../../../components/commons/word-detail-view/WordDetailView'

export default function Page() {
    const { id } = useLocalSearchParams()
    return <WordDetailView id={id?.toString() || ''} />
}
