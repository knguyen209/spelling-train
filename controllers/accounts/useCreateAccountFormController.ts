import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useConfirmationModalContext } from '../../providers/modal-dialog/ModalDialogProvider'
import { registerAccount } from '../../store/spellTrainSlice'
import { useAppDispatch, useAppSelector } from '../../store'

type CreateAccountProfileType = {
    name: string
    phone: string
    email: string
    password: string
    confirmPassword: string
    source?: string
    learningGoal?: string
}

const useCreateAccountFormController = () => {
    const noStages = 4
    const router = useRouter()
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [profile, setProfile] = useState<CreateAccountProfileType>({
        name: 'John Doe',
        phone: '4083241234',
        email: 'john@sjsu.edu',
        password: 'Password@123',
        confirmPassword: 'Password@123',
        source: '',
        learningGoal: '',
    })

    const {
        registeringAccount,
        registerAccountSuccess,
        registerAccountError,
        registerAccountErrorMessage,
    } = useAppSelector((state) => state.spellTrain)

    const dispatch = useAppDispatch()

    const confirm = useConfirmationModalContext()

    useEffect(() => {
        if (registerAccountSuccess) {
            onRegisterAccountSuccess()
        }

        if (registerAccountError) {
            onRegisterFailed()
        }
    }, [registerAccountSuccess, registerAccountError])

    const onRegisterAccountSuccess = async () => {
        let result = await confirm.showConfirmation(
            'Information',
            'Account registered successfully!',
            true
        )
        if (result) {
            router.push('login')
        }
    }

    const onRegisterFailed = () => {
        confirm.showConfirmation(
            'Error',
            registerAccountErrorMessage,
            true,
            'Try again'
        )
    }

    const onTextFieldChanged = (name: string, value: string) => {
        setProfile({ ...profile, [name]: value })
    }

    const handleGoBackPress = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        } else {
            router.back()
        }
    }

    const handleContinuePress = async () => {
        if (currentIndex === 0) {
            if (isValidProfileStage()) {
                setCurrentIndex(1)
            }
        }

        if (currentIndex === 1) {
            if (isValidSourceStage()) {
                setCurrentIndex(2)
            }
        }

        if (currentIndex === 2) {
            let result = await confirm.showConfirmation(
                'Information',
                "You're almost there",
                true
            )
            if (result) {
                setCurrentIndex(3)
            }
        }

        if (currentIndex === 3 && isValidLearningGoalStage()) {
            dispatch(
                registerAccount({
                    ...profile,
                })
            )
        }
    }

    const handleSourceSelected = (source: string) => {
        if (sources.includes(source)) {
            setProfile({ ...profile, source: source })
        }
    }

    const handleGoalSelected = (goal: string) => {
        if (goals.includes(goal)) {
            setProfile({ ...profile, learningGoal: goal })
        }
    }

    const isValidProfileStage = () => {
        if (profile.name.length === 0) {
            confirm.showConfirmation('Alert', 'Name field is required', true)
            return false
        }

        if (profile.phone.length === 0) {
            confirm.showConfirmation(
                'Alert',
                'Phone number field is required',
                true
            )
            return false
        }

        if (profile.email.length === 0) {
            confirm.showConfirmation(
                'Alert',
                'Email address field is required',
                true
            )
            return false
        }

        let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (!profile.email.match(emailFormat)) {
            confirm.showConfirmation('Alert', 'Invalid email format.', true)
            return false
        }

        if (profile.password.length === 0) {
            confirm.showConfirmation(
                'Alert',
                'Password field is required',
                true
            )
            return false
        }

        if (profile.confirmPassword.length === 0) {
            confirm.showConfirmation(
                'Alert',
                'Confirm password field is required',
                true
            )
            return false
        }

        let passwordFormat =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/

        if (!profile.password.match(passwordFormat)) {
            confirm.showConfirmation(
                'Alert',
                'Password must be between 8 and 15 characters, contain at least one uppercase letter, one lowercase letter, one numeric, and one special character.',
                true
            )
            return false
        }

        if (profile.confirmPassword !== profile.password) {
            confirm.showConfirmation('Alert', 'Passwords do not match', true)
            return false
        }

        return true
    }

    const isValidSourceStage = () => {
        if (profile.source?.length === 0) {
            confirm.showConfirmation('Alert', 'Please choose an option', true)
            return false
        }
        return true
    }

    const isValidLearningGoalStage = () => {
        if (profile.learningGoal?.length === 0) {
            confirm.showConfirmation('Alert', 'Please choose an option', true)
            return false
        }
        return true
    }

    return {
        router,
        noStages,
        sources,
        objectives,
        goals,
        currentIndex,
        profile,
        registeringAccount,
        handleContinuePress,
        handleGoBackPress,
        handleSourceSelected,
        handleGoalSelected,
        onTextFieldChanged,
    }
}

const sources = [
    'TV',
    'News / Article / Blog',
    'Google Search',
    'Tiktok',
    'Facebook / Instagram',
    'YouTube',
    'AppStore',
    'Family / Friends',
    'Others',
]

const objectives = [
    {
        icon: 'conversation',
        primaryText: 'Converse with confidence',
        secondaryText: '2000+ words spell free interactive exercises.',
    },
    {
        icon: 'file',
        primaryText: 'Build a large vocabulary',
        secondaryText: '500+ practical words.',
    },
    {
        icon: 'clock',
        primaryText: 'Develop a learning habit',
        secondaryText: 'Smart reminders, fun challenges and more.',
    },
]

const goals = [
    '5 mins / day',
    '10 mins / day',
    '15 mins / day',
    '20 mins / day',
    '30 mins / day',
    '1 hour / day',
    '2 hours / day',
]

export default useCreateAccountFormController
