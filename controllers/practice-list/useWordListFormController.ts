import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { WordListType } from '../../types/genericTypes'
import { useAppSelector } from '../../store'

const useWordListFormController = ({
    id = undefined,
}: {
    id: number | undefined
}) => {
    const router = useRouter()

    const editMode = id ? false : true

    const [wordList, setWordList] = useState<WordListType>({
        id: -1,
        title: '',
        ownerId: -1,
        words: [
            {
                id: -1,
                word: '',
                usage: '',
                rootOrigin: '',
                definition: '',
                languageOrigin: '',
                partsOfSpeech: '',
                alternatePronunciation: '',
            },
        ],
    })

    const { wordLists, fetchingWordLists } = useAppSelector(
        (state) => state.spellTrain
    )

    useEffect(() => {
        fetchWordListDetails(id)
    }, [])

    const fetchWordListDetails = (id: number | undefined) => {
        if (id) {
            let list = wordLists.filter((i) => i.id == id)[0]
            if (list) {
                list = {
                    ...list,
                    words: [
                        ...list.words,
                        {
                            id: -1,
                            word: '',
                            usage: '',
                            rootOrigin: '',
                            definition: '',
                            languageOrigin: '',
                            partsOfSpeech: '',
                            alternatePronunciation: '',
                        },
                    ],
                }
                setWordList(list)
            }
        }
    }

    const onListTitleChanged = (newVal: string) => {
        let updatedPracticeList = { ...wordList, title: newVal }
        setWordList(updatedPracticeList)
    }

    const onWordTextChanged = (id: number, newVal: string) => {
        let updatedWords = wordList.words.map((w) =>
            w.id === id ? { ...w, text: newVal } : w
        )

        let length = updatedWords.length

        // When the last element of the list is empty, add another text field
        if (updatedWords[length - 1].word !== '') {
            updatedWords.push({
                id: -1,
                word: '',
                usage: '',
                rootOrigin: '',
                definition: '',
                languageOrigin: '',
                partsOfSpeech: '',
                alternatePronunciation: '',
            })
        }
        setWordList({ ...wordList, words: updatedWords })
    }

    const closeModal = () => {
        router.back()
    }

    const onSaveBtnPress = () => {
        if (editMode) {
            // updatePracticeList(practiceList)
        } else {
            // createPracticeList(practiceList.title, practiceList.words)
        }
        closeModal()
    }

    return {
        wordList,
        onListTitleChanged,
        onSaveBtnPress,
        onWordTextChanged,
        closeModal,
    }
}

export default useWordListFormController
