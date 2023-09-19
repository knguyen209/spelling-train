import React from 'react'
import { Button, FlatList, Text, View } from 'react-native'
import { PracticeListType } from '../../types/genericTypes'
type Props = {
    practiceList: PracticeListType
}

const PracticeListDetails = ({ practiceList }: Props) => {
    return (
        <View>
            <Text>{practiceList.title}</Text>
            <FlatList
                data={practiceList.words}
                keyExtractor={(word) => word.id}
                renderItem={({ item }) => <Text>{item.text}</Text>}
            />
            <Button title='Update' />
            <Button title='Practice' />
        </View>
    )
}

export default PracticeListDetails
