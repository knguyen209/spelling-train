export type PracticeListItemType = {
    id: string
    text: string
}

export type PracticeListType = {
    id: string
    title: string
    words: Array<PracticeListItemType>
}
