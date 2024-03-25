import { useRouter } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import { WordListType, WordType } from '../../types/genericTypes'
import { useAppDispatch, useAppSelector } from '../../store'
import { nanoid } from '@reduxjs/toolkit'
import {
    createCustomWordList,
    deleteWords,
    updateWordList,
} from '../../store/spellTrainSlice'
import { AuthenticationContext } from '../../providers/authentication-provider/AuthenticationProvider'
import { useConfirmationModalContext } from '../../providers/modal-dialog/ModalDialogProvider'

const useWordListFormController = ({
    id = undefined,
}: {
    id: number | undefined
}) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const confirmationModal = useConfirmationModalContext()
    const authContext = useContext(AuthenticationContext)
    const editMode = id ? true : false

    const [wordList, setWordList] = useState<EditableWordListType>({
        id: nanoid(),
        title: '',
        ownerId: -1,
        words: [
            {
                id: nanoid(),
                word: '',
                usage: '',
                rootOrigin: '',
                definition: '',
                languageOrigin: '',
                partsOfSpeech: '',
                alternatePronunciation: '',
                selected: false,
            },
        ],
    })
    const [deleteMode, setDeleteMode] = useState(false)
    const [saveBtnPressed, setSaveBtnPressed] = useState(false)

    const {
        wordLists,
        creatingCustomWordList,
        creatingCustomWordListError,
        creatingCustomWordListSuccess,

        updatingWordList,
        updatingWordListError,
        updatingWordListSuccess,

        deletingWordsSuccess,
        deletingWordsError,
    } = useAppSelector((state) => state.spellTrain)

    useEffect(() => {
        fetchWordListDetails(id)
    }, [])

    useEffect(() => {
        if (saveBtnPressed) {
            if (creatingCustomWordListSuccess) {
                confirmationModal
                    .showConfirmation(
                        'Information',
                        `${wordList.title} word list created successfully!`,
                        true
                    )
                    .then(() => {
                        setSaveBtnPressed(false)
                        router.back()
                    })
            }

            if (updatingWordListSuccess) {
                confirmationModal
                    .showConfirmation(
                        'Information',
                        `${wordList.title} word list updated successfully!`,
                        true
                    )
                    .then(() => {
                        setSaveBtnPressed(false)
                        router.back()
                    })
            }

            if (creatingCustomWordListError || updatingWordListError) {
                confirmationModal
                    .showConfirmation(
                        'Information',
                        `An error has occurred. Please try again!`,
                        true
                    )
                    .then(() => {
                        setSaveBtnPressed(false)
                    })
            }
        }
        if (deletingWordsSuccess) {
            let updatedList = {
                ...wordList,
                words: wordList.words.filter((w) => !w.selected),
            }
            setWordList(updatedList)
            setDeleteMode(false)
        }

        if (deletingWordsError) {
            setDeleteMode(false)
        }
    }, [
        creatingCustomWordListError,
        creatingCustomWordListSuccess,
        updatingWordListSuccess,
        updatingWordListError,
        deletingWordsSuccess,
        deletingWordsError,
    ])

    const fetchWordListDetails = (id: number | undefined) => {
        if (id) {
            let list = wordLists.filter((i) => i.id == id)[0]
            if (list) {
                let deletableWords: Array<DeleteableWordType> = []
                list.words.forEach((w) =>
                    deletableWords.push({ ...w, selected: false })
                )
                deletableWords.push({
                    id: nanoid(),
                    word: '',
                    usage: '',
                    rootOrigin: '',
                    definition: '',
                    languageOrigin: '',
                    partsOfSpeech: '',
                    alternatePronunciation: '',
                    selected: false,
                })
                let editableList: EditableWordListType = {
                    id: list.id,
                    ownerId: list.ownerId,
                    title: list.title,
                    words: deletableWords,
                }
                setWordList(editableList)
            }
        }
    }

    const onListTitleChanged = (newVal: string) => {
        let updatedPracticeList = { ...wordList, title: newVal }
        setWordList(updatedPracticeList)
    }

    const onWordTextChanged = (id: number | string, newVal: string) => {
        let updatedWords = wordList.words.map((w) =>
            w.id === id ? { ...w, word: newVal } : w
        )

        let length = updatedWords.length

        // When the last element of the list is empty, add another text field
        if (updatedWords[length - 1].word !== '') {
            updatedWords.push({
                id: nanoid(),
                word: '',
                usage: '',
                rootOrigin: '',
                definition: '',
                languageOrigin: '',
                partsOfSpeech: '',
                alternatePronunciation: '',
                selected: false,
            })
        }
        setWordList({ ...wordList, words: updatedWords })
    }

    const closeModal = () => {
        router.back()
    }

    const onSaveBtnPress = () => {
        setSaveBtnPressed(true)
        if (editMode) {
            dispatch(
                updateWordList({
                    wordList,
                    token: authContext?.userProfile?.accessToken || '',
                })
            )
        } else {
            dispatch(
                createCustomWordList({
                    wordList,
                    token: authContext?.userProfile?.accessToken || '',
                })
            )
        }
    }

    const onDeleteBtnPress = () => {
        setDeleteMode(true)
    }

    const onDeleteSelectedWordsBtnPress = async () => {
        const result = await confirmationModal.showConfirmation(
            'Confirm',
            'Are you sure you want to delete selected words?',
            false,
            'Yes',
            'Cancel'
        )
        if (result) {
            const selectedIds = wordList.words
                .filter((w) => typeof w.id === 'number' && w.selected)
                .map((w) => w.id as number)
            dispatch(
                deleteWords({
                    listId: wordList.id,
                    ids: selectedIds,
                    token: authContext?.userProfile?.accessToken || '',
                })
            )
        }
    }

    const onCancelBtnPress = () => {
        setDeleteMode(false)
        let updatedWords = wordList.words.map((w) =>
            w.id === id ? { ...w, selected: false } : w
        )
        setWordList({ ...wordList, words: [...updatedWords] })
    }

    const onCheckboxPress = (id: string | number) => {
        let updatedWords = wordList.words.map((w) =>
            w.id === id ? { ...w, selected: !w.selected } : w
        )
        setWordList({ ...wordList, words: [...updatedWords] })
    }

    return {
        deleteMode,
        editMode,
        wordList,
        onDeleteSelectedWordsBtnPress,
        onListTitleChanged,
        onSaveBtnPress,
        onWordTextChanged,
        closeModal,
        onDeleteBtnPress,
        onCancelBtnPress,
        onCheckboxPress,
        creatingCustomWordList,
        updatingWordList,
    }
}

interface EditableWordListType extends WordListType {
    words: Array<DeleteableWordType>
}

interface DeleteableWordType extends WordType {
    selected: boolean
}

export default useWordListFormController
