import { nanoid } from '@reduxjs/toolkit'
import {
    PracticeListStateType,
    SpellingTrainStateType,
} from '../types/stateType'

const PracticeListStore: SpellingTrainStateType = {
    fetchingWordLists: false,
    wordLists: [],

    fetchingWordData: false,
    wordData: undefined,

    generatingWordList: false,
    generatedWordList: undefined,
}

// const PracticeListStore: SpellingTrainStateType = {
//     fetchingPracticeLists: false,
//     practiceLists: [
//         {
//             id: nanoid(),
//             title: 'Fruits',
//             words: [
//                 { id: nanoid(), text: 'Mango' },
//                 { id: nanoid(), text: 'Durian' },
//                 { id: nanoid(), text: 'Jackfruit' },
//                 { id: nanoid(), text: 'Lychee' },
//                 { id: nanoid(), text: 'Mangosteen' },
//                 { id: nanoid(), text: 'Pineapple' },
//             ],
//         },
//         {
//             id: nanoid(),
//             title: 'Latin Words',
//             words: [
//                 { id: nanoid(), text: 'Mentor' },
//                 { id: nanoid(), text: 'Aqua' },
//                 { id: nanoid(), text: 'Singular' },
//                 { id: nanoid(), text: 'Liberty' },
//                 { id: nanoid(), text: 'Circus' },
//                 { id: nanoid(), text: 'Benevolent' },
//                 { id: nanoid(), text: 'Ambulance' },
//             ],
//         },
//         {
//             id: nanoid(),
//             title: 'Color',
//             words: [
//                 { id: nanoid(), text: 'Indigo' },
//                 { id: nanoid(), text: 'Scarlet' },
//                 { id: nanoid(), text: 'Violet' },
//                 { id: nanoid(), text: 'Magenta' },
//             ],
//         },
//         {
//             id: nanoid(),
//             title: 'Animal',
//             words: [
//                 { id: nanoid(), text: 'Elephant' },
//                 { id: nanoid(), text: 'Giraffe' },
//                 { id: nanoid(), text: 'Rhino' },
//                 { id: nanoid(), text: 'Gorilla' },
//                 { id: nanoid(), text: 'Zebra' },
//             ],
//         },
//         {
//             id: nanoid(),
//             title: 'Appliance',
//             words: [
//                 { id: nanoid(), text: 'Refrigerator' },
//                 { id: nanoid(), text: 'Microwave' },
//                 { id: nanoid(), text: 'Stove' },
//                 { id: nanoid(), text: 'Washing Machine' },
//             ],
//         },
//         {
//             id: nanoid(),
//             title: 'Insect',
//             words: [
//                 { id: nanoid(), text: 'Butterfly' },
//                 { id: nanoid(), text: 'Bee' },
//                 { id: nanoid(), text: 'Fly' },
//                 { id: nanoid(), text: 'Mosquito' },
//             ],
//         },
//     ],
// }

export default PracticeListStore
