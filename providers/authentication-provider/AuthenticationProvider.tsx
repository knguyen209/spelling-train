import { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserType } from '../../types/genericTypes'
import { useRouter } from 'expo-router'

export const AuthenticationContext =
    createContext<AuthenticationContextType | null>(null)

export type AuthenticationContextType = {
    userProfile: UserType | null | undefined
    updateUserProfile: (newProfile: UserType) => void
    logout: () => void
}

const AuthenticationProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [userProfile, setUserProfile] = useState<UserType | null | undefined>(
        null
    )
    const router = useRouter()

    useEffect(() => {
        fetchUserProfile()
    }, [])

    const fetchUserProfile = async () => {
        const tProfile = await getData()
        setUserProfile(tProfile)

        if (tProfile) {
            router.push('/tabs/journey')
        }
    }

    const updateUserProfile = (newProfile: UserType) => {
        setUserProfile(newProfile)
        storeData(newProfile)
    }

    const logout = () => {
        setUserProfile(null)
        storeData(null)
        router.push('/login')
    }

    return (
        <AuthenticationContext.Provider
            value={{ userProfile, updateUserProfile, logout }}
        >
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationProvider

const storeData = async (value: UserType | undefined | null) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('user-profile', jsonValue)
    } catch (e) {
        console.log(e)
    }
}

const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('user-profile')
        return jsonValue != null ? (JSON.parse(jsonValue) as UserType) : null
    } catch (e) {
        console.log(e)
    }
}
