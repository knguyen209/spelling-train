type ListenGameStageType = {
    word: string
    options: Array<string>
}

interface ListenGameType {
    stages: Array<ListenGameStageType>
}
