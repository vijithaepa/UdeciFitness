import React, { Component } from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from "redux";
import reducer from './reducers'
import History from "./components/History";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
// import { createStackNavigator } from 'react-navigation-stack';
import Constants from 'expo-constants'
import AddEntry from "./components/AddEntry";
import { purple, white } from "./utils/colors";
import EntryDetail from './components/EntryDetail'
import Live from "./components/Live";
import {setLocalNotification} from "./utils/helpers";
import ImagePicker from "./components/ImagePicker";

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
        Live: {
            screen: Live,
            navigationOptions: {
                tabBarLabel: 'Live',
                tabBarIcon: ({focused, horizontal, tintColor}) =>
                    <Ionicons name='ios-speedometer' size={30} color={tintColor}/>
            }
        },
        ImagePicker: {
            screen: ImagePicker,
            navigationOptions: {
                tabBarLabel: 'Pick Image',
                tabBarIcon: ({focused, horizontal, tintColor}) =>
                    <Ionicons name='ios-photos' size={30} color={tintColor}/>
            }
        }
    },
    {
        navigationOptions: {
            header: null
        },
        tabBarOptions: {
            activeTintColor: Platform.OS === 'ios' ? purple : white,
            style: {
                height: 56,
                backgroundColor: Platform.OS === 'ios' ? white : purple,
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

const MainNavigation = createAppContainer(createStackNavigator({
    Home: {
        screen: TabsView
    },
    EntryDetail: {
        screen: EntryDetail,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple
            }
        }
    }
}))

function UdaciStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}

export default class App extends Component {

    state = {
        value: 0
    }

    componentDidMount() {
        setLocalNotification()
    }

    store = createStore(reducer)

    render() {
        return (
            <Provider store={this.store}>
                <View style={{flex: 1}}>
                    <UdaciStatusBar backgroundColor={white} bar-style='light-content'/>
                    <MainNavigation/>
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
