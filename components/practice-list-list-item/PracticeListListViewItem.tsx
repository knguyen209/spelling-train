import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { PracticeListType } from '../../types/genericTypes'
import styles from './practice-list-list-view-item.style'

type Props = {
    item: PracticeListType
    onItemPressed: (item: PracticeListType) => void
}

const PracticeListListItemView = ({ item, onItemPressed }: Props) => {
    const style = styles()
    return (
        <TouchableOpacity
            style={style.containerStyle}
            onPress={() => onItemPressed(item)}
        >
            <Text style={style.textStyle}>{item.title || 'Untitled'}</Text>
        </TouchableOpacity>
    )
}

export default PracticeListListItemView
