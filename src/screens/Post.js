/* eslint-disable react-native/no-inline-styles *//* eslint-disable prettier/prettier */

import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useContext } from 'react';
import FooterMenu from '../components/Menus/FooterMenu';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { PostContext } from '../context/postContext';

const Post = ({ navigation }) => {
    // global state
    const [posts, setPosts] = useContext(PostContext);

    //local state
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [loading, setLoading] = useState();

    //handle post data
    const handlePost = async () => {
        try {
            if (!title) {
                Alert.alert('Please add post and Title')
            }
            if (!description) {
                Alert.alert('Please add post and Description')
            }
            const { data } = await axios.post('/post/create-post',
                {
                    title,
                    description,
                }
            );
            setLoading(false);
            setPosts([...posts, data?.post]);
            Alert.alert(data?.message);
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert(error.response.data.message || error.message);
            setLoading(false);
            console.log(error);
        }
        // Alert.alert(`Title & desc -> ${title}, ${description}`);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.heading}>Create Post</Text>
                    <TextInput
                        placeholder="Post Title"
                        style={styles.inputBox}
                        placeholderTextColor={'#40916c'}
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                    />
                    <TextInput
                        placeholder="Post description"
                        style={styles.inputBox}
                        multiline={true}
                        numberOfLines={6}
                        placeholderTextColor={'#40916c'}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
                        <Text style={styles.postBtnText}>
                            <FontAwesome5
                                name="plus-square"
                                style={styles.iconStyle}
                                size={20}
                            />{' '}
                            Create Post
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <FooterMenu />
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fbfbf2',
        marginTop: 40,
        justifyContent: 'space-between',
    },
    heading: {
        color: '#3a5a40',
        fontSize: 25,
        fontWeight: 'bold',
    },
    inputBox: {
        textAlignVertical: 'top',
        borderRadius: 10,
        width: 320,
        marginTop: 30,
        padding: 10,
        fontSize: 16,
        paddingLeft: 15,
        color: '#2d6a4f',
        borderWidth: 1,
        borderColor: '#40916c',
    },
    postBtn: {
        backgroundColor: '#2d6a4f',
        color: '#fff',
        width: 300,
        marginTop: 30,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    postBtnText: {
        fontSize: 18,
        color: '#fff',
    },
});

export default Post;