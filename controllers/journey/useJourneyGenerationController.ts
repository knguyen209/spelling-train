import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import {
    generateJourney,
    generateJourneyByWordList,
} from '../../store/journeyListSlice'
import { WordListType } from '../../types/genericTypes'
import { shuffleArray } from '../../utils'

const useJourneyGenerationController = () => {
    const dispatch = useAppDispatch()
    const [topicName, setTopicName] = useState('')
    const { generatingJourney } = useAppSelector((state) => state.journeyList)
    const { wordLists, fetchingWordLists } = useAppSelector(
        (state) => state.practiceList
    )
    const onTopicNameChanged = (newValue: string) => {
        setTopicName(newValue)
    }

    const onGenerateButtonPressed = async () => {
        dispatch(generateJourney(topicName))
    }

    const onWordListItemPressed = async (wordList: WordListType) => {
        dispatch(generateJourneyByWordList(wordList))
    }

    return {
        topicName,
        onTopicNameChanged,
        onGenerateButtonPressed,
        generatingJourney,
        wordLists,
        fetchingWordLists,
        onWordListItemPressed,
    }
}

export default useJourneyGenerationController
