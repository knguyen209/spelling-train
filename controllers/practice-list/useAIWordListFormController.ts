import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { generateWordList } from '../../store/spellTrainSlice'
import { useConfirmationModalContext } from '../../providers/modal-dialog/ModalDialogProvider'

const useAIWordListFormController = () => {
    const dispatch = useAppDispatch()

    const [topicName, setTopicName] = useState('')
    // a state to control whether a word list generating request is made
    const [isRequestMade, setIsRequestMade] = useState(false)

    const {
        user,
        generatedWordList,
        generatingWordList,
        generatingWordListSuccess,
        generatingWordListError,
        generatingWordListErrorMessage,
    } = useAppSelector((state) => state.spellTrain)

    const confirm = useConfirmationModalContext()

    useEffect(() => {
        if (isRequestMade && generatingWordListError) {
            confirm.showConfirmation(
                'Error',
                generatingWordListErrorMessage,
                true
            )
        }
    }, [isRequestMade, generatingWordListSuccess, generatingWordListError])

    const onGenerateBtnPress = async () => {
        if (topicName.length === 0) {
            confirm.showConfirmation(
                'Message',
                'Please enter a topic name',
                true
            )
        } else {
            setIsRequestMade(true)
            dispatch(
                generateWordList({ topicName, token: user?.accessToken || '' })
            )
        }
    }

    const onTopicNameChanged = (newVal: string) => {
        setTopicName(newVal)
    }

    return {
        topicName,
        generatedWordList,
        onTopicNameChanged,
        onGenerateBtnPress,
        generatingWordList,
        isRequestMade,
    }
}

export default useAIWordListFormController
