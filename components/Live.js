import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'

export default class Live extends Component {

    state = {
        cords: null,
        status: 'granted',
        direction: ''
    }

    askPermission = () => {

    }

    render() {
        const {cords, direction, status} = this.state

        if (status === null) {
            return <ActivityIndicator style={{marginTop: 30}}/>
        }
        if (status === 'denied') {
            return (
                <View style={styles.center}>
                    <Foundation name='alert' size={50}/>
                    <Text>You denied your location service. You can fix this by visiting settings and enable the
                        location services to run this app.</Text>
                </View>
            )
        }
        if (status === 'undetermined') {
            return (
                <View style={styles.center}>
                    <Foundation name='alert' size={50}/>
                    <Text>You have to enable location services to run this app.</Text>
                    <TouchableOpacity style={styles.button} onPress={this.askPermission}>
                        <Text style={styles.buttonText}>Enable</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.header}>You are heading</Text>
                    <Text style={styles.direction}>North</Text>
                </View>
                <View style={styles.metricContainer}>
                    <View style={styles.metric}>
                        <Text style={[styles.header, {color: white}]}>
                                Altitude
                        </Text>
                        <Text style={[styles.subHeader, {color: white}]}>
                            {200} metres
                        </Text>
                    </View>
                    <View style={styles.metric}>
                        <Text style={[styles.header, {color: white}]}>
                            Speed
                        </Text>
                        <Text style={[styles.subHeader, {color: white}]}>
                            {250} KMh
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
    button: {
        padding: 10,
        backgroundColor: purple,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    },
    buttonText: {
        color: white,
        fontSize: 20,
    }, directionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        fontSize: 35,
        textAlign: 'center',
    },
    direction: {
        color: purple,
        fontSize: 120,
        textAlign: 'center',
    },
    metricContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: purple,
    },
    metric: {
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    subHeader: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 5,
    },
})
