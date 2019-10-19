import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import AddEntry from './components/AddEntry'
import { Provider } from 'react-redux'
import { createStore } from "redux";
import reducer from './reducers'

export default class App extends Component {

    state = {
        value: 0
    }
    handlePress = () => {
        alert('Hello')
    }

    store = createStore(reducer)

    render() {
        return (
            <Provider store={this.store}>
                <View style={styles.container}>
                    {/*<TouchableHighlight style={styles.btn} onPress={this.handlePress} underlayColor='#d4271b'>
                    <Text style={styles.btnText}>Touchable highlight</Text>
                </TouchableHighlight>
                <TouchableOpacity style={styles.btn} onPress={this.handlePress}>
                    <Text style={styles.btnText}>Touchable Opacity</Text>
                </TouchableOpacity>
                <TouchableWithoutFeedback onPress={this.handlePress}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Touchable Without feedback</Text>
                    </View>
                </TouchableWithoutFeedback>*/}
                    {/*TouchableNativeFeedback only supports for Android platform
                <TouchableNativeFeedback onPress={this.handlePress}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Touchable Without feedback</Text>
                    </View>
                </TouchableNativeFeedback>*/}
                    {/*<Slider*/}
                    {/*    value={this.state.value}*/}
                    {/*    minimumValue={-10} maximumValue={10}*/}
                    {/*    step={1}*/}
                    {/*    onValueChange={(value)=> this.setState(()=> ({value}))}/>*/}
                    {/*<Text>*/}
                    {/*    value: {this.state.value}*/}
                    {/*</Text>*/}
                    <AddEntry/>
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
