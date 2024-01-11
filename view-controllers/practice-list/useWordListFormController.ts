import { useEffect, useState } from 'react'
import usePracticeListViewModel from '../../view-models/usePracticeListViewModel'
import { PracticeListType } from '../../types/genericTypes'

import { nanoid } from '@reduxjs/toolkit'

const useWordListFormController = (id = '') => {
    const { practiceLists } = usePracticeListViewModel()

    const [practiceList, setPracticeList] = useState<PracticeListType>({
        id: nanoid(),
        title: '',
        words: [{ id: nanoid(), text: '' }],
    })

    const fetchPracticeList = (id: string) => {
        if (id) {
            let list = practiceLists.filter((i) => i.id === id)[0]
            if (list) {
                setPracticeList(list)
            }
        }
    }

    const onListTitleChanged = (newVal: string) => {
        let updatedPracticeList = { ...practiceList, title: newVal }
        setPracticeList(updatedPracticeList)
    }

    useEffect(() => {
        fetchPracticeList(id)
    }, [])

    const onSaveBtnPress = () => {}

    return {
        practiceList,
        onListTitleChanged,
        onSaveBtnPress,
    }
}

export default useWordListFormController
