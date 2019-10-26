import React, { Component } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from "redux";
import reducer from './reducers'
import History from "./components/History";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation'
// import { createBottomTabNavigator } from 'react-navigation-tabs'
import AddEntry from "./components/AddEntry";
import { pink, purple, white } from "./utils/colors";

const Tabs = createBottomTabNavigator({
        History: {
            screen: History,
            navigationOptions: {
                tabBarLabel: 'History',
                tabBarIcon: ({focused, horizontal, tintColor}) => <Ionicons name='ios-bookmarks' size={30}
                                                                            color={tintColor}/>
            }
        },
        AddEntry: {
            screen: AddEntry,
            navigationOptions: {
                tabBarLabel: 'Add Entry',
                tabBarIcon: ({focused, horizontal, tintColor}) => <FontAwesome name='plus-square' size={30}
                                                                               color={tintColor}/>
            }
        },
    },
    {
        navigationOptions: {
            header: null
        },
        tabBarOptions: {
            activeTintColor: Platform.OS === 'ios'? purple: white,
            style: {
                height: 56,
                backgroundColor: Platform.OS === 'ios'? white: purple,
                shadowColor: 'rgba(0,0,0,0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1,
            }
        }
    });

const TabsView = createAppContainer(Tabs)


export default class App extends Component {

    state = {
        value: 0
    }

    store = createStore(reducer)

    render() {
        return (
            <Provider store={this.store}>
                <View style={{flex: 1}}>
                    <View style={{height: 20}}/>
                    <TabsView />
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
