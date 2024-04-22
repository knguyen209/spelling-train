import { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserType } from '../../types/genericTypes'
import { useRouter } from 'expo-router'

export const AuthenticationContext =
    createContext<AuthenticationContextType | null>(null)

export type AuthenticationContextType = {
    userProfile: UserType | null | undefined
    updateUserProfile: (newProfile: UserType) => Promise<void>
    logout: () => Promise<void>
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
        return storeData(newProfile)
    }

    const logout = () => {
        setUserProfile(null)
        return storeData(null)
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
        return await AsyncStorage.setItem(
            'user-profile',
            value ? JSON.stringify(value) : JSON.stringify({})
        )
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
