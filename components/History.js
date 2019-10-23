import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { fetchCalenderResult } from "../utils/api";
import { addEntry, receiveEntries } from "../actions";
import { getDailyReminderValue, timeToString } from "../utils/helpers";
import UdaciFitnessCalendar from 'udacifitness-calendar'
import { white } from "../utils/colors";
import DateHeader from "./DateHeader";
import TouchableOpacity from "react-native-web/dist/exports/TouchableOpacity";
import MetricCard from "./MetricCard";


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

    renderItem = ({today, ...metrics}, formattedDate, key) => (
        <View style={styles.item}>
            {today
                ? <View>
                    <DateHeader date={formattedDate} />
                    <Text style={styles.noDataText}>
                        {today}
                    </Text>
                </View>
                : <MetricCard metrics={metrics} date={formattedDate} />
            }
        </View>
    )

    renderEmptyDay = (formattedDate) => {
        return (
            <View style={styles.item}>
                <DateHeader date={formattedDate} />
                <Text style={styles.noDataText}>
                    You didn't log any data for the day
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
                renderEmptyDate={this.renderEmptyDay}
            />
        );
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16: 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    }
})

function mapStateToProps(entries) {
    return {
        entries
    }
}

export default connect(mapStateToProps)(History)
