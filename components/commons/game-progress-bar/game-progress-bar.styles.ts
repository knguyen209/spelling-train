import { StyleSheet, ViewStyle } from 'react-native'
interface IStyleSheet {
    container: ViewStyle
    progressBar: ViewStyle
}

const styles = ({ progress = 0.0 }: { progress: number }) =>
    StyleSheet.create({
        container: {
            backgroundColor: '#E5E5E5',
            borderRadius: 100,
            flex: 1,
            marginHorizontal: 10,
            maxHeight: 18,
        },
        progressBar: {
            flex: 1,
            borderRadius: 100,
            backgroundColor: '#58CC03',
            width: '75%',
        },
    })

export default styles
