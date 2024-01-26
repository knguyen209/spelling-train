import { useLocalSearchParams } from 'expo-router'
import WordListForm from '../../../components/practice/word-list-form/WordListForm'

export default function Page() {
    const { id } = useLocalSearchParams()
    return <WordListForm id={id?.toString()} />
}
