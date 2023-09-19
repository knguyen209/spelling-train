import usePracticeListDetailsViewModel from '../../view-models/usePracticeListDetailsViewModel'

const usePracticeListDetailsController = (id: string) => {
    const { practiceLists } = usePracticeListDetailsViewModel()
    const practiceList = practiceLists.filter((item) => item.id === id)[0]
    return {
        practiceList,
    }
}

export default usePracticeListDetailsController
