import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { WordListType, WordType } from '../../types/genericTypes'

const useAIWordListFormController = () => {
    const dispatch = useAppDispatch()

    const [topicName, setTopicName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [wordList, setWordList] = useState<WordListType | undefined>(
        undefined
    )

    const { generatingWordList, generatedWordList } = useAppSelector(
        (state) => state.practiceList
    )

    const onGenerateBtnPress = () => {
        // console.log(topicName)
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            let tempWordList: WordListType = {
                id: 5,
                ownerId: 1,
                title: 'Fruit',
                words: [
                    { id: 5, word: 'Orange' },
                    { id: 6, word: 'Lychee' },
                    { id: 7, word: 'Dragonfruit' },
                    { id: 8, word: 'Mango' },
                    { id: 9, word: 'Durian' },
                    { id: 10, word: 'Mangosteen' },
                ],
            }
            setWordList(tempWordList)
        }, 5000)
    }

    const onTopicNameChanged = (newVal: string) => {
        setTopicName(newVal)
    }

    return {
        isLoading,
        topicName,
        wordList,
        onTopicNameChanged,
        onGenerateBtnPress,
        generatingWordList,
    }
}

export default useAIWordListFormController
