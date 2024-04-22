import { useContext, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import {
    fetchWordLists,
    generateJourney,
    generateJourneyByWordList,
    generateJourneyGames,
    generateWordList,
} from '../../store/spellTrainSlice'
import { WordListType } from '../../types/genericTypes'
import { AuthenticationContext } from '../../providers/authentication-provider/AuthenticationProvider'
import { useConfirmationModalContext } from '../../providers/modal-dialog/ModalDialogProvider'
import { useRouter } from 'expo-router'

const useJourneyGenerationController = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [topicName, setTopicName] = useState('')
    const {
        generatingJourney,
        generatingJourneySuccess,
        generatingJourneyError,
        generatingJourneyLevels,
        generatingJourneyLevelsSuccess,
        generatingJourneyLevelsErrorMessage,
        generatingJourneyLevelsError,
        generatingWordList,
        generatingWordListSuccess,
        generatingWordListError,
        generatingWordListErrorMessage,
        wordLists,
        fetchingWordLists,
    } = useAppSelector((state) => state.spellTrain)
    const [requestSent, setRequestSent] = useState(false)
    const [requestWithTopicSent, setRequestWithTopicSent] = useState(false)
    const authContext = useContext(AuthenticationContext)
    const confirmationContext = useConfirmationModalContext()

    useEffect(() => {
        dispatch(
            fetchWordLists({
                token: authContext?.userProfile?.accessToken || '',
            })
        )
    }, [])

    useEffect(() => {
        if (requestSent && generatingJourneyLevelsSuccess) {
            setRequestSent(false)
            confirmationContext
                .showConfirmation(
                    'Information',
                    'Journey generated successfully',
                    true,
                    'OK'
                )
                .then(() => {
                    router.back()
                })
        }
        if (requestSent && generatingJourneyLevelsError) {
            setRequestSent(false)
            confirmationContext.showConfirmation(
                'Error',
                generatingJourneyLevelsErrorMessage,
                true,
                'OK'
            )
        }
    }, [
        requestSent,
        generatingJourneyLevelsSuccess,
        generatingJourneyLevelsError,
    ])

    useEffect(() => {
        if (requestWithTopicSent && generatingWordListSuccess) {
            dispatch(
                generateJourneyGames({
                    id: wordLists[wordLists.length - 1].id,
                    token: authContext?.userProfile?.accessToken || '',
                })
            )
            setRequestSent(true)
        }
        if (requestWithTopicSent && generatingWordListError) {
            setRequestSent(false)
            confirmationContext.showConfirmation(
                'Error',
                generatingWordListErrorMessage,
                true,
                'OK'
            )
        }
    }, [
        requestWithTopicSent,
        generatingWordListSuccess,
        generatingWordListError,
    ])

    useEffect(() => {
        if (requestSent && generatingJourneySuccess) {
            confirmationContext
                .showConfirmation(
                    'Information',
                    'Journey generated successfully',
                    true,
                    'OK'
                )
                .then(() => {
                    router.back()
                })
        }
        if (requestSent && generatingJourneyError) {
            confirmationContext
                .showConfirmation(
                    'Error',
                    'Error generating journey. Please try again.',
                    true,
                    'OK'
                )
                .then(() => {
                    router.back()
                })
        }
    }, [requestSent, generatingJourneySuccess, generatingJourneyError])

    const onTopicNameChanged = (newValue: string) => {
        setTopicName(newValue)
    }

    const onGenerateButtonPressed = async () => {
        // dispatch(generateJourney(topicName))
        dispatch(
            generateWordList({
                topicName: topicName,
                token: authContext?.userProfile?.accessToken || '',
            })
        )
        setRequestWithTopicSent(true)
    }

    const onWordListItemPressed = async (wordList: WordListType) => {
        // dispatch(generateJourneyByWordList(wordList))
        dispatch(
            generateJourneyGames({
                id: wordList.id,
                token: authContext?.userProfile?.accessToken || '',
            })
        )
        setRequestSent(true)
    }

    return {
        topicName,
        onTopicNameChanged,
        onGenerateButtonPressed,
        generatingWordList,
        generatingJourney,
        generatingJourneyLevels,
        wordLists,
        fetchingWordLists,
        onWordListItemPressed,
    }
}

export default useJourneyGenerationController
