import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { Text, View } from 'react-native'

import BackButton from '../../../components/commons/back-button/BackButton'

import usePracticeListDetailsController from '../../../view-controllers/practice-list/usePracticeListDetailsController'
import PracticeListDetails from '../../../components/practice-list-details/PracticeListDetails'

const PracticeListDetailsScreen = () => {
    const router = useRouter()
    const { id } = useLocalSearchParams()

    const { practiceList } = usePracticeListDetailsController(id as string)

    if (!practiceList) {
        return (
            <View>
                <Text>Error loading list</Text>
            </View>
        )
    }

    return (
        <View>
            <Stack.Screen
                options={{
                    title: 'Practice List',
                    headerLeft: () => <BackButton />,
                }}
            />
            <PracticeListDetails practiceList={practiceList} />
        </View>
    )
}

export default PracticeListDetailsScreen
