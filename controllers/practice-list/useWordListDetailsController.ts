import { useRouter } from 'expo-router'
import { useConfirmationModalContext } from '../../providers/modal-dialog/ModalDialogProvider'
import { useAppSelector } from '../../store'

const useWordListDetailsController = (id: number) => {
    const router = useRouter()

    const confirmModalContext = useConfirmationModalContext()

    const { wordLists, fetchingWordData } = useAppSelector(
        (state) => state.practiceList
    )

    const filteredLists = wordLists.filter((item) => item.id == id)

    const wordList = filteredLists.length == 1 ? filteredLists[0] : undefined

    const onStartPracticePress = () => {
        router.push({
            pathname: '/tabs/practice/practice-game',
            params: { id: wordList?.id },
        })
    }

    const onEditPress = () => {
        router.push({
            pathname: '/tabs/practice/word-list-modal',
            params: { id: wordList?.id },
        })
    }

    const onDeletePress = async () => {
        const result = await confirmModalContext.showConfirmation(
            'Confirm Action',
            'Do you want to delete this word list?'
        )
        if (result) {
            setTimeout(() => {
                // deletePracticeList(wordList?.id || '')
                router.back()
            }, 300)
        }
    }

    const onWordItemPress = (id: number) => {
        router.push({
            pathname: '/tabs/practice/word-detail-modal',
            params: { id: id },
        })
    }

    return {
        wordList,
        onStartPracticePress,
        onEditPress,
        onDeletePress,
        onWordItemPress,
        fetchingWordData,
    }
}

export default useWordListDetailsController
