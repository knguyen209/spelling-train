import { useLocalSearchParams } from 'expo-router'
import WordListForm from '../../../components/practice/word-list-form/WordListForm'
import ConfirmationModalContextProvider from '../../../providers/modal-dialog/ModalDialogProvider'

export default function Page() {
    const { id } = useLocalSearchParams()
    return (
        <ConfirmationModalContextProvider>
            <WordListForm id={id ? parseInt(id.toString()) : undefined} />
        </ConfirmationModalContextProvider>
    )
}
