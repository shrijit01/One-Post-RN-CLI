/* eslint-disable prettier/prettier */

import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import Register from '../../screens/auth/Register';
import Login from '../../screens/auth/Login';
import { AuthContext } from '../../context/authContext';
import HeaderMenu from './HeaderMenu';
import Post from '../../screens/Post';
import Account from '../../screens/Account';
import Myposts from '../../screens/Myposts';

const ScreenMenu = () => {
    // global state
    const [state] = useContext(AuthContext);
    // condition true or false
    const AuthenticatedUser = state?.user && state?.token;

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Login">
            {AuthenticatedUser ? (
                <>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{
                            // title: 'fullstack',
                            headerBackTitle: 'Back',
                            headerRight: () => <HeaderMenu />,
                        }}
                    />
                    <Stack.Screen
                        name="Post"
                        component={Post}
                        options={{
                            // title: 'fullstack',
                            headerBackTitle: 'Back',
                            headerRight: () => <HeaderMenu />,
                        }}
                    />
                    <Stack.Screen
                        name="Mypost"
                        component={Myposts}
                        options={{
                            // title: 'fullstack',
                            headerBackTitle: 'Back',
                            headerRight: () => <HeaderMenu />,
                        }}
                    />
                    <Stack.Screen
                        name="Account"
                        component={Account}
                        options={{
                            // title: 'fullstack',
                            headerBackTitle: 'Back',
                            headerRight: () => <HeaderMenu />,
                        }}
                    />
                </>
            ) : (
                <>
                    <Stack.Screen
                        name="Register"
                        component={Register}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{
                            headerShown: false,
                        }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};

export default ScreenMenu;