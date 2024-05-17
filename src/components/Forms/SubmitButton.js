/* eslint-disable prettier/prettier */
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const SubmitButton = ({ label, handleSubmit, loading }) => {
    return (
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.btnText}>
                {loading ? 'Please Wait...' : label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    submitBtn: {
        color: 'green',
        height: 50,
        borderRadius: 10,
        marginBottom: 20,
        justifyContent: 'center',
        backgroundColor: '#2d6a4f',
    },
    btnText: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default SubmitButton;