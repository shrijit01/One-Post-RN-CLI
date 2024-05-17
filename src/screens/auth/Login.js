/* eslint-disable prettier/prettier */
import { View, Text, Alert, StyleSheet } from 'react-native';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import InputBox from '../../components/Forms/InputBox';
import SubmitButton from '../../components/Forms/SubmitButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    // global state
    const [state, setState] = useContext(AuthContext);
    // local state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // btn function
    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!email || !password) {
                Alert.alert('Please fill all Fields');
                setLoading(false);
                return;
            }
            setLoading(false);
            const { data } = await axios.post('/auth/signin',
                { email, password }
            );
            setState(data);
            navigation.navigate('Home');
            await AsyncStorage.setItem('@auth', JSON.stringify(data));
            Alert.alert(data && data.message);
            // console.log('Login Data -> ', { email, password });
        } catch (error) {
            Alert.alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    };
    // temp
    // const loacalStorageData = async () => {
    //     const data = await AsyncStorage.getItem('@auth');
    //     // console.log('Local Storage ->', data);
    // };
    // loacalStorageData();

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Login</Text>
            <View>
                <InputBox
                    label="Email"
                    keyboardType="email-address"
                    autoComplete="email"
                    value={email}
                    setValue={setEmail}
                />
                <InputBox
                    label="Password"
                    secureTextEntry={true}
                    value={password}
                    setValue={setPassword}
                />
            </View>
            {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
            <SubmitButton
                label="Submit"
                loading={loading}
                handleSubmit={handleSubmit}
            />
            <Text style={styles.linkText}>Not a User ?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Signup</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // height: 100,
        flex: 1,
        paddingHorizontal: 25,
        justifyContent: 'center',
        backgroundColor: '#40916c',
    },
    pageTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1b4332',
        marginBottom: 20,
    },
    inputBox: {
        height: 40,
        marginBottom: 20,
        padding: 10,
        // width: 150,
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
        color: '#af9f85',
        backgroundColor: '#ffe5ec',
    },
    linkText: {
        color: '#fff',
        textAlign: 'center',
    },
    link: {
        fontSize: 18,
        color: '#274c77',
    },
});

export default Login;