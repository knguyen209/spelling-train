import { useRouter } from 'expo-router'
import { useConfirmationModalContext } from '../../providers/modal-dialog/ModalDialogProvider'
import { useAppDispatch, useAppSelector } from '../../store'
import { deleteWordList } from '../../store/spellTrainSlice'
import { useContext, useEffect, useState } from 'react'
import { AuthenticationContext } from '../../providers/authentication-provider/AuthenticationProvider'

const useWordListDetailsController = (id: number) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const authContext = useContext(AuthenticationContext)
    const confirmModalContext = useConfirmationModalContext()

    const {
        wordLists,
        fetchingWordData,
        deletingWordList,
        deletingWordListSuccess,
        deletingWordListError,
    } = useAppSelector((state) => state.spellTrain)

    const wordList = wordLists.find((item) => item.id == id)

    const [deletePressed, setDeletePress] = useState(false)

    useEffect(() => {
        if (deletePressed && deletingWordListSuccess) {
            confirmModalContext
                .showConfirmation(
                    'Information',
                    'Word list delete successfully.',
                    true,
                    'OK'
                )
                .then(() => {
                    setDeletePress(false)
                    router.back()
                })
        }

        if (deletePressed && deletingWordListError) {
            confirmModalContext
                .showConfirmation(
                    'Error',
                    'Error deleting word list, please try again',
                    true,
                    'OK'
                )
                .then(() => {
                    setDeletePress(false)
                })
        }
    }, [deletingWordListSuccess, deletingWordListError])

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
        if (wordList) {
            const result = await confirmModalContext.showConfirmation(
                'Confirm Action',
                'Do you want to delete this word list?'
            )
            if (result) {
                setDeletePress(true)
                dispatch(
                    deleteWordList({
                        id: wordList.id,
                        token: authContext?.userProfile?.accessToken || '',
                    })
                )
            }
        }
    }

    const onWordItemPress = (id: number | string) => {
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
