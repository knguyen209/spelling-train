import { useRouter } from 'expo-router'
import { useContext, useEffect, useReducer, useState } from 'react'
import { useConfirmationModalContext } from '../../providers/modal-dialog/ModalDialogProvider'

import { useAppDispatch, useAppSelector } from '../../store'
import { signIn } from '../../store/spellTrainSlice'
import { AuthenticationContext } from '../../providers/authentication-provider/AuthenticationProvider'

const useLoginFormController = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { user, userSigningIn, userSignInSuccess, userSignInError } =
        useAppSelector((state) => state.spellTrain)
    const modalContext = useConfirmationModalContext()
    const authContext = useContext(AuthenticationContext)

    const [showModal, toggleShowModal] = useReducer((s) => !s, false)
    const [loginPressed, setLoginPressed] = useState(false)
    const [userCredential, setUserCredential] = useState<UserCredentialType>({
        emailAddress: 'john@sjsu.edu',
        password: 'Password@123',
    })

    useEffect(() => {
        if (userSignInSuccess) {
            if (user) {
                authContext?.updateUserProfile(user).then(() => {
                    modalContext
                        .showConfirmation(
                            'Information',
                            'User login successfully.',
                            true,
                            'OK'
                        )
                        .then(() => {
                            router.push('/tabs/journey')
                        })
                })
            }
        }

        if (userSignInError) {
            modalContext.showConfirmation(
                'Error',
                'Invalid email or password',
                true,
                'OK'
            )
        }
    }, [userSignInSuccess, userSignInError])

    const onTextFieldChanged = (name: string, value: string) => {
        setUserCredential({ ...userCredential, [name]: value })
    }

    const onForgotPasswordPress = () => {}

    const onLoginButtonPress = async () => {
        setLoginPressed(true)
        if (userCredential.emailAddress && userCredential.password) {
            dispatch(
                signIn({
                    email: userCredential.emailAddress,
                    password: userCredential.password,
                })
            )
        } else {
            modalContext.showConfirmation(
                'Alert',
                'Please fill in Email & Password',
                true,
                'OK'
            )
        }
    }

    return {
        userSigningIn,
        userCredential,
        showModal,
        toggleShowModal,
        onTextFieldChanged,
        onForgotPasswordPress,
        onLoginButtonPress,
    }
}

type UserCredentialType = {
    emailAddress: string
    password: string
}

export default useLoginFormController
