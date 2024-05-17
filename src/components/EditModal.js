/* eslint-disable prettier/prettier */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Modal, Alert, Pressable, StyleSheet, TextInput } from 'react-native';

const EditModal = ({ setModalVisible, modalVisible, post }) => {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState();

    // handle update post
    const handleUpdatePost = async (id) => {
        try {
            setLoading(true);
            const { data } = await axios.put(`/post/update-post/${id}`, {
                title, description,
            });
            setLoading(false);
            Alert.alert(data?.message);
            navigation.push('Mypost');
        } catch (error) {
            setLoading(false);
            console.log(error);
            Alert.alert(error);
        }
    }

    // intial post data
    useEffect(() => {
        setTitle(post?.title);
        setDescription(post?.description);
    }, [post]);


    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {/* <Text>{JSON.stringify(post, null, 4)}</Text> */}
                        <Text style={styles.modalText}>Update Post!</Text>
                        <Text>Title</Text>
                        <TextInput
                            style={styles.inputBox}
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        />
                        <Text>Description</Text>
                        <TextInput
                            style={styles.inputBox}
                            multiline={true}
                            numberOfLines={4}
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                        />
                        <View style={styles.btnContainer}>
                            <Pressable
                                style={styles.button}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonUpdate]}
                                onPress={() => { setModalVisible(!modalVisible), handleUpdatePost(post && post?._id) }}>
                                <Text style={styles.updateTextStyle}>{loading ? 'Please Wait...' : 'Update'}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View >
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    inputBox: {
        textAlignVertical: 'top',
        marginBottom: 20,
        backgroundColor: 'lightgray',
        borderRadius: 10,
        paddingTop: 10,
        marginTop: 10,
        paddingLeft: 10,
    },
    btnContainer: {
        flexDirection: 'row',
    },
    button: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#000',
        elevation: 2,
        width: 100,
        marginVertical: 10,
        margin: 10
    },
    buttonOpen: {
        // backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: 'red',
    },
    buttonUpdate: {
        backgroundColor: '#40916c',
    },
    updateTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default EditModal;