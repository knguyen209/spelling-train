import { useRouter } from 'expo-router'
import { PracticeListType } from '../../types/genericTypes'
import usePracticeListViewModel from '../../view-models/usePracticeListViewModel'

const usePracticeListHomeController = () => {
    const router = useRouter()

    const { practiceLists } = usePracticeListViewModel()

    const onAddNewListPress = () => {
        router.push('/tabs/practice/word-list-modal')
    }

    const onListItemPress = (listItem: PracticeListType) => {
        router.push({
            pathname: '/tabs/practice/word-list',
            params: { id: listItem.id },
        })
    }

    const onNewWordListPress = () => {
        /** TODO */
    }

    return {
        practiceLists,
        onListItemPress,
        onNewWordListPress,
        onAddNewListPress,
    }
}

export default usePracticeListHomeController
