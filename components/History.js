import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import { fetchCalenderResult } from "../utils/api";
import { ADD_ENTRY, addEntry, receiveEntries } from "../actions";
import { getDailyReminderValue, timeToString } from "../utils/helpers";


class History extends Component{

    componentDidMount() {
        const {dispatch} = this.props

        fetchCalenderResult()
            .then((entries)=> dispatch(receiveEntries(entries)))
            .then(({entries}) => {
                if(!entries[timeToString()]){
                    dispatch(addEntry({
                        [timeToString()]: getDailyReminderValue()
                    }))
                }
            })
    }

    render() {
        return (
            <View>
                <Text>{JSON.stringify(this.props)}</Text>
            </View>
        );
    }
}

function mapStateToProps(entries) {
    return {
        entries
    }
}

export default connect(mapStateToProps)(History)
