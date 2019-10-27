import React, {Component} from 'react'
import {View, Text} from 'react-native'
import AddEntry from "./AddEntry";

class EntryDetaail extends Component {

    static navigationOptions = ({navigation})=> {
        const {entryId} = navigation.state.params
        const year = entryId.slice(0,4)
        const month = entryId.slice(5,7)
        const day = entryId.slice(8)
        return {
            title: `${day}/${month}/${year}`
        }
    }
    render() {
        return (
            <View>
                <Text>Entry Details - {this.props.navigation.state.params.entryId}</Text>
            </View>
        )
    }
}

export default EntryDetaail