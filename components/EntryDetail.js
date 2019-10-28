import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import MetricCard from "./MetricCard";
import { addEntry } from "../actions";
import { removeEntry } from "../utils/api";
import { getDailyReminderValue, timeToString } from "../utils/helpers";
import TextButton from "./TextButton";

class EntryDetail extends Component {

    static navigationOptions = ({navigation}) => {
        const {entryId} = navigation.state.params
        const year = entryId.slice(0, 4)
        const month = entryId.slice(5, 7)
        const day = entryId.slice(8)
        return {
            title: `${day}/${month}/${year}`
        }
    }

    reset = () => {
        const {remove, goBack, entryId} = this.props

        remove()
        goBack()
        removeEntry(entryId)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.metrics !== null && !nextProps.metrics.today
    }

    render() {
        const {metrics, entryId} = this.props
        return (
            <View>
                <MetricCard metrics={metrics}/>
                <TextButton onPress={this.reset} style={{margin: 20}}>
                    RESET
                </TextButton>
            </View>
        )
    }
}


const mapStateToProps = (state, {navigation}) => {
    const {entryId} = navigation.state.params

    return {
        entryId,
        metrics: state[entryId]
    }
}

function mapDispatchToProps(dispatch, {navigation}) {
    const {entryId} = navigation.state.params

    return {
        remove:()=> dispatch(addEntry({
            [entryId]: timeToString === entryId
                ? getDailyReminderValue()
                : null
        })),
        goBack: () => navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail)
