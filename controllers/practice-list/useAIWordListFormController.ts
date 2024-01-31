import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { generateWordList } from '../../store/practiceListSlice'
import { WordListType } from '../../types/genericTypes'

const useAIWordListFormController = () => {
    const dispatch = useAppDispatch()

    const [topicName, setTopicName] = useState('')
    // a state to control whether a word list generating request is made
    const [isRequestMade, setIsRequestMade] = useState(false)

    const { generatedWordList, generatingWordList } = useAppSelector(
        (state) => state.practiceList
    )

    const onGenerateBtnPress = async () => {
        setIsRequestMade(true)
        dispatch(generateWordList(topicName))
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
