import { useContext, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import {
    fetchWordLists,
    generateJourney,
    generateJourneyByWordList,
    generateJourneyGames,
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
        wordLists,
        fetchingWordLists,
    } = useAppSelector((state) => state.spellTrain)
    const [requestSent, setRequestSent] = useState(false)
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
            confirmationContext
                .showConfirmation(
                    'Error',
                    generatingJourneyLevelsErrorMessage,
                    true,
                    'OK'
                )
                .then(() => {
                    router.back()
                })
        }
    }, [
        requestSent,
        generatingJourneyLevelsSuccess,
        generatingJourneyLevelsError,
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
        dispatch(generateJourney(topicName))
        setRequestSent(true)
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
        generatingJourney,
        generatingJourneyLevels,
        wordLists,
        fetchingWordLists,
        onWordListItemPressed,
    }
}

export default useJourneyGenerationController
