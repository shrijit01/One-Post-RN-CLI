/* eslint-disable prettier/prettier */

import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import moment from 'moment';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';
import EditModal from './EditModal';

const PostCard = ({ posts, myPostScreen }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({});
    const navigation = useNavigation();
    // handle del prompt ,
    const handleDeletePrompt = (id) => {
        Alert.alert('Attention ', 'Are you sure want to delete ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        console.log('Cancel pressed');
                    }
                },
                {
                    text: 'Delete',
                    onPress: () => handleDeletePost(id)
                },
            ]);
    }

    //delete post data
    const handleDeletePost = async (id) => {
        try {
            setLoading(true);
            const { data } = await axios.delete(`/post/delete-post/${id}`);
            setLoading(false);
            Alert.alert(data?.message);
            navigation.push('Mypost');
        } catch (error) {
            Alert.alert(error);
            setLoading(false);
            console.log(error);
        }
    }


    return (
        <View>
            <Text style={styles.heading}>Total Posts :{posts?.length}</Text>
            {myPostScreen && (
                <EditModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    post={post}
                />
            )
            }
            {posts?.map((post, i) => (
                <View style={styles.card} key={i}>
                    {myPostScreen && (
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text style={{ marginHorizontal: 20 }}>
                                <FontAwesome5
                                    name="pen"
                                    style={styles.iconStyle}
                                    color={'#40916c'}
                                    size={18}//handleDeletePrompt(post?._id),
                                    onPress={() => { setPost(post), setModalVisible(true) }}
                                />
                            </Text>
                            <Text >
                                <FontAwesome5
                                    name="trash"
                                    style={styles.iconStyle}
                                    color={'red'}
                                    size={18}
                                    onPress={() => handleDeletePrompt(post?._id)}
                                />
                            </Text>
                        </View>
                    )}
                    <Text style={styles.title}>Title: {post?.title}</Text>
                    <Text style={styles.desc}>{post?.description}</Text>
                    <View style={styles.footer}>
                        {post?.postedBy?.name && (
                            <Text>
                                <FontAwesome5
                                    name="user-alt"
                                    style={styles.iconStyle}
                                    color={'#40916c'}
                                />{'  '}
                                {post?.postedBy?.name}

                            </Text>
                        )}
                        <Text>
                            <FontAwesome5
                                name="user-clock"
                                style={styles.iconStyle}
                                color={'#40916c'}
                            />
                            {'  '}
                            {moment(post?.createdAt).format('DD:MM:YYYY')}
                        </Text>
                        {/* <Text>{moment(post?.createdAt).format('DD:MM:YYYY')}</Text> */}
                    </View>
                </View>
            ))
            }
        </View >
    );
};

const styles = StyleSheet.create({
    heading: {
        color: 'green',
        textAlign: 'center',
    },
    card: {
        borderWidth: 0.5,
        borderColor: '#40916c',
        width: '100%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        marginVertical: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 10,
    },
    desc: {
        marginTop: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    }
});

export default PostCard;