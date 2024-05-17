/* eslint-disable prettier/prettier */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';

const FooterMenu = () => {
    //hooks 
    const route = useRoute();
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <FontAwesome5
                    name="home"
                    style={styles.iconStyle}
                    color={route.name === 'Home' && 'red'}
                />
                <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Post')}>
                <FontAwesome5
                    name="plus"
                    style={styles.iconStyle}
                    color={route.name === 'Post' && 'red'}
                />
                <Text>Post</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Mypost')}>
                <FontAwesome5
                    name="info-circle"
                    style={styles.iconStyle}
                />
                <Text>My Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                <FontAwesome5
                    name="user-alt"
                    style={styles.iconStyle}
                />
                <Text>Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // padding: 30,
        // borderWidth: 1,
        // borderColor: 'red',
        margin: 10,
        justifyContent: 'space-between',
    },
    iconStyle: {
        color: '#40916c',
        marginBottom: 3,
        fontSize: 20,
        alignSelf: 'center',
    },
});

export default FooterMenu;