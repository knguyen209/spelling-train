import { useEffect, useState } from 'react'
import usePracticeListViewModel from '../../view-models/usePracticeListViewModel'
import { PracticeListType } from '../../types/genericTypes'

import { nanoid } from '@reduxjs/toolkit'
import { useRouter } from 'expo-router'

const useWordListFormController = (id = '') => {
    const { practiceLists, createPracticeList, updatePracticeList } =
        usePracticeListViewModel()

    const router = useRouter()

    const editMode = id === '' ? false : true

    const [practiceList, setPracticeList] = useState<PracticeListType>({
        id: nanoid(),
        title: '',
        words: [{ id: nanoid(), text: '' }],
    })

    const fetchPracticeList = (id: string) => {
        if (id) {
            let list = practiceLists.filter((i) => i.id === id)[0]
            if (list) {
                list = {
                    ...list,
                    words: [...list.words, { id: nanoid(), text: '' }],
                }
                setPracticeList(list)
            }
        }
    }

    const onListTitleChanged = (newVal: string) => {
        let updatedPracticeList = { ...practiceList, title: newVal }
        setPracticeList(updatedPracticeList)
    }

    const onWordTextChanged = (id: string, newVal: string) => {
        let updatedWords = practiceList.words.map((w) =>
            w.id === id ? { ...w, text: newVal } : w
        )

        let length = updatedWords.length

        // When the last element of the list is empty, add another text field
        if (updatedWords[length - 1].text !== '') {
            updatedWords.push({ id: nanoid(), text: '' })
        }
        setPracticeList({ ...practiceList, words: updatedWords })
    }

    const closeModal = () => {
        router.back()
    }

    useEffect(() => {
        fetchPracticeList(id)
    }, [])

    const onSaveBtnPress = () => {
        if (editMode) {
            updatePracticeList(practiceList)
        } else {
            createPracticeList(practiceList.title, practiceList.words)
        }
        closeModal()
    }

    return {
        practiceList,
        onListTitleChanged,
        onSaveBtnPress,
        onWordTextChanged,
        closeModal,
    }
}

export default useWordListFormController
