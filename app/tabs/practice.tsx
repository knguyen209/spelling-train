import { View } from 'react-native'
import { Tabs } from 'expo-router/tabs'

import usePracticeListController from '../../view-controllers/practice-list/usePracticeListController'
import PracticeListListView from '../../components/practice-list-list-view/PracticeListListView'

const Practice = () => {
    const { practiceLists, onPracticeListListItemPressed } =
        usePracticeListController()

    return (
        <View>
            <Tabs.Screen
                options={{
                    title: 'Practice',
                }}
            />
            <PracticeListListView
                data={practiceLists}
                type='list'
                onListItemPressed={onPracticeListListItemPressed}
            />
        </View>
    )
}

export default Practice
