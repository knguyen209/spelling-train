import { useLocalSearchParams } from 'expo-router'

import WordList from '../../../components/practice/word-list/WordList'

export default function Page() {
    const params = useLocalSearchParams<{ id: string }>()
    const { id } = params

    return <WordList id={id || ''} />
}
