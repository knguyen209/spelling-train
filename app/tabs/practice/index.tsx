import { Link } from 'expo-router'
import { View, Text, ScrollView } from 'react-native'
import { COLORS } from '../../../constants'
import STButton from '../../../components/commons/st-button/STButton'
import PracticeList from '../../../components/practice/practice-list/PracticeList'

export default function PracticeTab() {
    return <PracticeList />
}
