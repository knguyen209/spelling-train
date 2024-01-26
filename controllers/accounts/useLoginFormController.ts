import { useRouter } from 'expo-router'
import { useReducer, useState } from 'react'
import { useConfirmationModalContext } from '../../providers/modal-dialog/ModalDialogProvider'

const useLoginFormController = () => {
    const router = useRouter()

    const modalContext = useConfirmationModalContext()

    const [showModal, toggleShowModal] = useReducer((s) => !s, false)
    const [userCredential, setUserCredential] = useState<UserCredentialType>({
        emailAddress: '',
        password: '',
    })

    const onTextFieldChanged = (name: string, value: string) => {
        setUserCredential({ ...userCredential, [name]: value })
    }

    const onForgotPasswordPress = () => {}

    const onLoginButtonPress = () => {
        if (userCredential.emailAddress && userCredential.password) {
            router.push('/tabs/journey')
        } else {
            modalContext.showConfirmation(
                'Alert',
                'Please fill in required fields.',
                true,
                'OK'
            )
        }
    }

    return {
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
