import { useContext, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import {
    fetchWordLists,
    generateJourney,
    generateJourneyByWordList,
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
        wordLists,
        fetchingWordLists,
    } = useAppSelector((state) => state.spellTrain)
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
        if (generatingJourneySuccess && !generatingJourneyError) {
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
        if (!generatingJourneySuccess && generatingJourneyError) {
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
    }, [generatingJourneySuccess, generatingJourneyError])

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
