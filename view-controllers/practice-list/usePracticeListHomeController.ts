import { useRouter } from 'expo-router'
import { PracticeListType } from '../../types/genericTypes'
import usePracticeListViewModel from '../../view-models/usePracticeListViewModel'
import { useAppDispatch } from '../../store'
import { useEffect } from 'react'
import { fetchPracticeLists } from '../../store/practiceListSlice'

const usePracticeListHomeController = () => {
    const router = useRouter()

    const { practiceLists, fetchingPracticeLists } = usePracticeListViewModel()

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchPracticeLists())
    }, [])

    const onAddNewListPress = () => {
        router.push('/tabs/practice/word-list-modal')
    }

    const onGenerateNewListPress = () => {
        router.push('/tabs/practice/ai-word-list-modal')
    }

    const onListItemPress = (listItem: PracticeListType) => {
        router.push({
            pathname: '/tabs/practice/word-list',
            params: { id: listItem.id },
        })
    }

    return {
        practiceLists,
        fetchingPracticeLists,
        onListItemPress,
        onGenerateNewListPress,
        onAddNewListPress,
    }
}

export default usePracticeListHomeController
