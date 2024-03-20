import { useContext } from 'react'
import { AuthenticationContext } from '../../providers/authentication-provider/AuthenticationProvider'
import { useAppSelector } from '../../store'

const useProfileController = () => {
    const authContext = useContext(AuthenticationContext)

    const { user } = useAppSelector((state) => state.spellTrain)

    const onLogoutButtonPressed = () => {
        authContext?.logout()
    }

    return { user, onLogoutButtonPressed }
}

export default useProfileController
