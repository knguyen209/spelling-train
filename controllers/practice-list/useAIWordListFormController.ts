import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { generateWordList } from '../../store/spellTrainSlice'

const useAIWordListFormController = () => {
    const dispatch = useAppDispatch()

    const [topicName, setTopicName] = useState('')
    // a state to control whether a word list generating request is made
    const [isRequestMade, setIsRequestMade] = useState(false)

    const { user, generatedWordList, generatingWordList } = useAppSelector(
        (state) => state.spellTrain
    )

    const onGenerateBtnPress = async () => {
        setIsRequestMade(true)
        dispatch(
            generateWordList({ topicName, token: user?.accessToken || '' })
        )
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
