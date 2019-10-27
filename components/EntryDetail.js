import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {connect} from 'react-redux'
import MetricCard from "./MetricCard";


class EntryDetaail extends Component {

    static navigationOptions = ({navigation}) => {
        const {entryId} = navigation.state.params
        const year = entryId.slice(0, 4)
        const month = entryId.slice(5, 7)
        const day = entryId.slice(8)
        return {
            title: `${day}/${month}/${year}`
        }
    }

    render() {
        const {metrics, entryId} = this.props

        return (
            <View>
                <MetricCard metrics={metrics}/>
                <Text>Entry Details - {this.props.navigation.state.params.entryId}</Text>
            </View>
        )
    }
}


const mapStateToProps= (state, {navigation}) => {
    const {entryId} = navigation.state.params

    return {
        entryId,
        metrics: state[entryId]
    }
}
export default connect(mapStateToProps)(EntryDetaail)
