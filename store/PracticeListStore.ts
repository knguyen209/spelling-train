import { nanoid } from '@reduxjs/toolkit'
import { PracticeListStateType } from '../types/stateType'

const PracticeListStore: PracticeListStateType = {
    fetchingPracticeLists: false,
    practiceLists: [
        {
            id: nanoid(),
            title: 'Colors',
            words: [
                { id: nanoid(), text: 'Indigo' },
                { id: nanoid(), text: 'Scarlet' },
                { id: nanoid(), text: 'Violet' },
                { id: nanoid(), text: 'Magenta' },
            ],
        },
        {
            id: nanoid(),
            title: 'Animals',
            words: [
                { id: nanoid(), text: 'Elephant' },
                { id: nanoid(), text: 'Giraffe' },
                { id: nanoid(), text: 'Rhino' },
                { id: nanoid(), text: 'Gorilla' },
            ],
        },
        {
            id: nanoid(),
            title: 'Appliances',
            words: [
                { id: nanoid(), text: 'Refrigerator' },
                { id: nanoid(), text: 'Microwave' },
                { id: nanoid(), text: 'Stove' },
                { id: nanoid(), text: 'Washing Machine' },
            ],
        },
        {
            id: nanoid(),
            title: 'Insects',
            words: [
                { id: nanoid(), text: 'Butterfly' },
                { id: nanoid(), text: 'Bee' },
                { id: nanoid(), text: 'Fly' },
                { id: nanoid(), text: 'Mosquito' },
            ],
        },
    ],

    creatingPracticeList: false,
    creatingPracticeListSuccess: false,
    creatingPracticeListError: false,

    updatingPracticeList: false,
    updatingPracticeListSuccess: false,
    updatingPracticeListError: false,

    deletingPracticeList: false,
    deletingPracticeListSuccess: false,
    deletingPracticeListError: false,
}

export default PracticeListStore
