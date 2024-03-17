import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { fetchWordData } from '../../store/practiceListSlice'
import { useRouter } from 'expo-router'

const useWordDetailController = (id: number) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { wordData, fetchingWordData } = useAppSelector(
        (state) => state.practiceList
    )

    useEffect(() => {
        dispatch(fetchWordData(id))
    }, [])

    const closeModal = () => {
        router.back()
    }

    return { fetchingWordData, wordData, closeModal }
}

export default useWordDetailController
