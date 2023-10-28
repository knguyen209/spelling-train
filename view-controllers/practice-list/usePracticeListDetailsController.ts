import { useRouter } from 'expo-router'
import usePracticeListDetailsViewModel from '../../view-models/usePracticeListDetailsViewModel'

const usePracticeListDetailsController = (id: string) => {
    const router = useRouter()
    const { practiceLists } = usePracticeListDetailsViewModel()

    const filteredLists = practiceLists.filter((item) => item.id === id)
    const practiceList =
        filteredLists.length >= 1 ? filteredLists[0] : undefined

    const onStartPracticePress = () => {
        router.push({
            pathname: '/tabs/practice/practice-game',
            params: { id: practiceList?.id },
        })
    }

    return {
        practiceList,
        onStartPracticePress,
    }
}

export default usePracticeListDetailsController
