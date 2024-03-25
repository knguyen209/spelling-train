import { useLocalSearchParams } from 'expo-router'
import PracticeGame from '../../../components/games/practice-game/PracticeGame'
import ConfirmationModalContextProvider from '../../../providers/modal-dialog/ModalDialogProvider'

export default function Page() {
    const { id } = useLocalSearchParams()
    const wordListId = parseInt(id!.toString())
    if (wordListId) {
        return (
            <ConfirmationModalContextProvider>
                <PracticeGame practiceListId={wordListId} />
            </ConfirmationModalContextProvider>
        )
    }
}
