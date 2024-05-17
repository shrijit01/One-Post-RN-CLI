/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import InputBox from '../../components/Forms/InputBox';
import SubmitButton from '../../components/Forms/SubmitButton';
import axios from 'axios';

const Register = ({ navigation }) => {
    // local state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // btn function
    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!name || !email || !password) {
                Alert.alert('Please fill all Fields');
                setLoading(false);
                return;
            }
            setLoading(false);
            const { data } = await axios.post('/auth/signup',
                { name, email, password }
            );
            Alert.alert(data && data.message);
            // console.log('Registerd Data -> ', { name, email, password });
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Register</Text>
            <View>
                <InputBox
                    label="Name"
                    value={name}
                    setValue={setName}
                />
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
                // autoComplete="Password"
                />
            </View>
            {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
            <SubmitButton
                label="Submit"
                loading={loading}
                handleSubmit={handleSubmit}
            />
            <Text style={styles.linkText}>Already Have an Account ? {' '}
                <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Login</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 100,
        // width: 300,
        paddingHorizontal: 25,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#40916c',
        // borderWidth: 1,
        // borderColor: 'red',
    },
    pageTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1b4332',
        marginBottom: 20,
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

export default Register;