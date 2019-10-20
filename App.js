import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import AddEntry from './components/AddEntry'
import { Provider } from 'react-redux'
import { createStore } from "redux";
import reducer from './reducers'
import History from "./components/History";

export default class App extends Component {

    state = {
        value: 0
    }

    store = createStore(reducer)

    render() {
        return (
            <Provider store={this.store}>
                <View style={styles.container}>
                    <History/>
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    btn: {
        backgroundColor: '#E53224',
        padding: 10,
        paddingLeft: 50,
        paddingRight: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    btnText: {
        color: '#fff'
    }
})
