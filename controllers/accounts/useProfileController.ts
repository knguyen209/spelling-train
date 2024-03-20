import { useContext } from 'react'
import { AuthenticationContext } from '../../providers/authentication-provider/AuthenticationProvider'
import { useAppSelector } from '../../store'
import { useConfirmationModalContext } from '../../providers/modal-dialog/ModalDialogProvider'
import { useRouter } from 'expo-router'
import { useDispatch } from 'react-redux'
import { SpellTrainAction } from '../../store/spellTrainSlice'

const useProfileController = () => {
    const authContext = useContext(AuthenticationContext)
    const router = useRouter()
    const { user } = useAppSelector((state) => state.spellTrain)
    const dispatch = useDispatch()
    const confirmationContext = useConfirmationModalContext()
    const { signOut } = SpellTrainAction
    const onLogoutButtonPressed = () => {
        authContext?.logout().then(() => {
            dispatch(signOut())
            confirmationContext
                .showConfirmation(
                    'Information',
                    'User logged out successfully.',
                    true,
                    'OK'
                )
                .then(() => {
                    router.push('/welcome')
                })
        })
    }

    return { user, onLogoutButtonPressed }
}

export default useProfileController
