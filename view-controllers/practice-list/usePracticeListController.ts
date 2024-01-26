import { useEffect } from 'react'
import usePracticeListViewModel from '../../view-models/usePracticeListViewModel'
import { PracticeListType } from '../../types/genericTypes'
import { useRouter } from 'expo-router'

const usePracticeListController = () => {
    const router = useRouter()

    const { practiceLists } = usePracticeListViewModel()

    const onPracticeListListItemPressed = (listItem: PracticeListType) => {
        // router.replace(`/screens/practice-list-details/${listItem.id}`)
        router.push(`/screens/practice-game-selection/${listItem.id}`)
    }

    return {
        practiceLists,
        onPracticeListListItemPressed,
    }
}

export default usePracticeListController
