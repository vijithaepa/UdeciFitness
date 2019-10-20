import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { fetchCalenderResult } from "../utils/api";
import { addEntry, receiveEntries } from "../actions";
import { getDailyReminderValue, timeToString } from "../utils/helpers";
import UdaciFitnessCalendar from 'udacifitness-calendar'


class History extends Component {

    componentDidMount() {
        const {dispatch} = this.props

        fetchCalenderResult()
            .then((entries) => dispatch(receiveEntries(entries)))
            .then(({entries}) => {
                if (!entries[timeToString()]) {
                    dispatch(addEntry({
                        [timeToString()]: getDailyReminderValue()
                    }))
                }
            })
    }

    renderItem = ({today, ...entries}, formattedDate, key) => (
        <View>
            {today
                ? <Text>{JSON.stringify(today)}</Text>
                : <Text>{JSON.stringify(entries)}</Text>
            }
        </View>
    )

    renderEmptyDay = (formattedDate) => {
        return (
            <View>
                <Text>
                    No data for the day
                </Text>
            </View>
        )

    }

    render() {

        const {entries} = this.props

        return (
            <UdaciFitnessCalendar
                items={entries}
                renderItem={this.renderItem}
                renderEmptyDay={this.renderEmptyDay}
            />
        );
    }
}

function mapStateToProps(entries) {
    return {
        entries
    }
}

export default connect(mapStateToProps)(History)
