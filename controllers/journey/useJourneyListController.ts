import { useRouter } from 'expo-router'
import { useAppDispatch, useAppSelector } from '../../store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext, useEffect, useState } from 'react'
import { generateJourneyGames } from '../../store/spellTrainSlice'
import { AuthenticationContext } from '../../providers/authentication-provider/AuthenticationProvider'
import { useConfirmationModalContext } from '../../providers/modal-dialog/ModalDialogProvider'
import { UserType } from '../../types/genericTypes'

const useJourneyListController = () => {
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const {
        generatingJourneyLevels,
        generatingJourneyLevelsSuccess,
        generatingJourneyLevelsError,
        generatingJourneyLevelsErrorMessage,
        journeyLevels,
    } = useAppSelector((state) => state.spellTrain)

    const dispatch = useAppDispatch()

    const authContext = useContext(AuthenticationContext)

    const confirm = useConfirmationModalContext()

    useEffect(() => {
        fetchJourneyGames()
    }, [])

    useEffect(() => {
        if (generatingJourneyLevelsError) {
            confirm.showConfirmation(
                'Info',
                generatingJourneyLevelsErrorMessage ||
                    'Error loading journey levels.',
                true,
                'OK'
            )
        }
    }, [generatingJourneyLevelsSuccess, generatingJourneyLevelsError])

    const fetchJourneyGames = async () => {
        const wordListId = await getJourneyWordListIdFromLocalStorage()

        if (wordListId === null || wordListId === undefined) {
            setLoading(false)
        } else {
            dispatch(
                generateJourneyGames({
                    id: wordListId,
                    token: authContext?.userProfile?.accessToken || '',
                })
            )
        }
    }

    const onGenerateButtonPress = () => {
        router.push('/tabs/journey/generate-journey-games-modal')
    }

    // get stored word list id from local storage for preloading on start app
    const getJourneyWordListIdFromLocalStorage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('user-profile')
            const userProfile =
                jsonValue != null ? (JSON.parse(jsonValue) as UserType) : null

            if (userProfile) {
                return userProfile.selectedJourneyWordListId
            } else {
                return null
            }
            // const jsonValue = await AsyncStorage.getItem('journey-word-list-id')
            // return jsonValue != null ? (JSON.parse(jsonValue) as string) : null
        } catch (e) {
            console.log(e)
        }
    }

    return {
        generatingJourneyLevels,
        loading,
        journeyLevels,
        onGenerateButtonPress,
    }
}

export default useJourneyListController
