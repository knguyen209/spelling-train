export type PracticeListItemType = {
    id: string
    text: string
}

export type PracticeListType = {
    id: string
    title: string
    words: Array<PracticeListItemType>
}

export type MessageType = {
    type: 'player' | 'ai'
    text: string
}

export type WordMeaningType = {
    partOfSpeech: string
    definitions: Array<string>
    synonyms: Array<string>
}

export type WordMetaDataType = {
    audio: Array<string>
    meanings: Array<WordMeaningType>
}

export type PracticeWordMeaningType = {
    partOfSpeech: string
    definitions: Array<string>
    synonyms: Array<string>
}

export type PracticeWordMetaDataType = {
    text: string
    audio: string
    meaning: PracticeWordMeaningType
}

export type PracticeResultType = {
    noQuestions: number
    noCorrect: number
    noHintsUsed: number
    totalTime: number
}
