import { useEffect } from 'react'
import usePracticeListViewModel from '../../view-models/usePracticeListViewModel'
import { PracticeListType } from '../../types/genericTypes'
import { useRouter } from 'expo-router'

const usePracticeListController = () => {
    const router = useRouter()

    const { practiceLists, fetchingPracticeLists } = usePracticeListViewModel()

    useEffect(() => {}, [])

    const onPracticeListListItemPressed = (listItem: PracticeListType) => {
        // router.replace(`/screens/practice-list-details/${listItem.id}`)
        router.push(`/screens/practice-game-selection/${listItem.id}`)
    }

    return {
        practiceLists,
        fetchingPracticeLists,
        onPracticeListListItemPressed,
    }
}

export default usePracticeListController
