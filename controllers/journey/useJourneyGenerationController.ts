import { useContext, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import {
    fetchWordLists,
    generateJourney,
    generateJourneyByWordList,
} from '../../store/spellTrainSlice'
import { WordListType } from '../../types/genericTypes'
import { AuthenticationContext } from '../../providers/authentication-provider/AuthenticationProvider'

const useJourneyGenerationController = () => {
    const dispatch = useAppDispatch()
    const [topicName, setTopicName] = useState('')
    const { generatingJourney, wordLists, fetchingWordLists } = useAppSelector(
        (state) => state.spellTrain
    )
    const authContext = useContext(AuthenticationContext)

    useEffect(() => {
        dispatch(
            fetchWordLists({
                token: authContext?.userProfile?.accessToken || '',
            })
        )
    }, [])

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
