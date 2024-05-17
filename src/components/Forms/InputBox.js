/* eslint-disable prettier/prettier */
import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

const InputBox = ({ label, keyboardType, autoComplete, secureTextEntry = false, value, setValue }) => {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.inputBox}
                autoCorrect={false}
                keyboardType={keyboardType}
                autoComplete={autoComplete}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={(text) => setValue(text)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 17,
        color: '#fff',
        // fontWeight: 'bold',
    },
    inputBox: {
        height: 40,
        marginBottom: 20,
        padding: 10,
        // width: 250,
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
        color: '#081c15',
        fontSize: 15,
        backgroundColor: '#ffe5ec',
    },
});

export default InputBox;