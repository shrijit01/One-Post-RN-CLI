/* eslint-disable prettier/prettier */

import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderMenu = () => {
    const [state, setState] = useContext(AuthContext);

    const handleLogOut = async () => {
        setState({ token: '', user: null });
        await AsyncStorage.removeItem('@auth');
        Alert.alert('Logout Successfully');
    };

    return (
        <View>
            <TouchableOpacity>
                <FontAwesome5
                    name="sign-out-alt"
                    color={'red'}
                    style={styles.iconStyle}
                    onPress={handleLogOut}
                />
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    iconStyle: {
        color: '#dc2f02',
        marginBottom: 3,
        fontSize: 18,
        alignSelf: 'center',
    },
});

export default HeaderMenu;