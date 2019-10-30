import React, { Component } from 'react'
import { Image, ImageEditor, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { white } from "../utils/colors";
import * as ImagePickerLib from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { Foundation } from '@expo/vector-icons'

export default class ImagePicker extends Component {

    state = {
        image: null,
        status: null,
    }

    componentDidMount() {
        const result = Promise.all([
            Permissions.askAsync(Permissions.CAMERA),
            Permissions.askAsync(Permissions.CAMERA_ROLL)
        ]).then((result)=>{

            this.setState(() => ({
                status: result[0].permissions.camera.status
            }))
        })
            .catch((error)=> {
                console.log('Error getting Camera permission: ', error)
                }
            )
    }

    askPermission = () => {
        const result = Promise.all([
            Permissions.askAsync(Permissions.CAMERA),
            Permissions.askAsync(Permissions.CAMERA_ROLL)
        ])
        this.setState(() => ({
            status: result.status
        }))

        if (result.status !== 'granted') {
            console.log('Error asking Camera permission: ', result)
        }
    }

    pickImage = () => {
        const {status} = this.state
        if(status === 'granted') {
            ImagePickerLib.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: (2, 1)
            })
                .then((result) => {
                        if (result.cancelled) {
                            return
                        }
                        ImageEditor.cropImage(result.uri, {
                                offset: {x: 0, y: 0},
                                size: {width: result.width, height: result.height},
                                displaySize: {width: 200, height: 100},
                                resizeMode: 'contain '
                            },
                            (uri) => this.setState(() => ({image: uri})),
                            () => console.log('Error ')
                        )
                    }
                )
        } else {
            console.log('Not enough permission')
        }


    }

    render() {
        const {image, status} = this.state
        if (status !== 'granted') {
            return (
                <View style={styles.center}>
                    <Foundation name='alert' size={50}/>
                    <Text>You have to allow Camera permission to run this a]service.</Text>
                    <TouchableOpacity style={styles.button} onPress={this.askPermission}>
                        <Text style={styles.buttonText}>Enable</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.pickImage()}>
                    <Text>Open Camera Roll</Text>
                </TouchableOpacity>
                {image &&
                <Image style={styles.image} source={{uri: image}}/>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 30,
        backgroundColor: white
    },
    image: {
        width: 150,
        height: 250,
        resizeMode: 'contain',
        backgroundColor: 'black'
    }
})
