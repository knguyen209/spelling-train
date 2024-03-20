import { useRouter } from 'expo-router'
import { WordListType } from '../../types/genericTypes'
import { useContext, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { fetchWordLists } from '../../store/spellTrainSlice'
import { AuthenticationContext } from '../../providers/authentication-provider/AuthenticationProvider'

const useWordListHomeController = () => {
    const router = useRouter()

    const { wordLists, fetchingWordLists } = useAppSelector(
        (state) => state.spellTrain
    )

    const authContext = useContext(AuthenticationContext)

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
        dispatch(
            fetchWordLists({
                token: authContext?.userProfile?.accessToken || '',
            })
        )
    }, [])

    return {
        wordLists,
        fetchingWordLists,
        onListItemPress,
        onGenerateNewListPress,
        onAddNewListPress,
    }
}

export default useWordListHomeController
