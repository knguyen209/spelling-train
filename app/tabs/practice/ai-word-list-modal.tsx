import AIWordListForm from '../../../components/practice/ai-word-list-form/AIWordListForm'
import ConfirmationModalContextProvider from '../../../providers/modal-dialog/ModalDialogProvider'

export default function Page() {
    return (
        <ConfirmationModalContextProvider>
            <AIWordListForm />
        </ConfirmationModalContextProvider>
    )
}
