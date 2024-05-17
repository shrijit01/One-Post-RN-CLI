/* eslint-disable react-native/no-inline-styles *//* eslint-disable prettier/prettier */

import { View, StyleSheet } from 'react-native';
import React from 'react';
import FooterMenu from '../components/Menus/FooterMenu';

const About = () => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <FooterMenu />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // margin: 10,
        // marginTop: 40,
        justifyContent: 'space-between',
    },
});


export default About;
