import { useRouter } from 'expo-router'
import { WordListType } from '../../types/genericTypes'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { fetchWordLists } from '../../store/practiceListSlice'

const useWordListHomeController = () => {
    const router = useRouter()

    const onAddNewListPress = () => {
        router.push('/tabs/practice/word-list-modal')
    }

    const onGenerateNewListPress = () => {
        router.push('/tabs/practice/ai-word-list-modal')
    }

    const onListItemPress = (listItem: WordListType) => {
        router.push({
            pathname: '/tabs/practice/word-list',
            params: { id: listItem.id },
        })
    }

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchWordLists())
    }, [])

    const { wordLists, fetchingWordLists } = useAppSelector(
        (state) => state.practiceList
    )

    return {
        // practiceLists,
        // fetchingPracticeLists,
        wordLists,
        fetchingWordLists,
        onListItemPress,
        onGenerateNewListPress,
        onAddNewListPress,
    }
}

export default useWordListHomeController
