/* eslint-disable prettier/prettier */
import React from 'react';
import { AuthProvider } from './src/context/authContext';
import ScreenMenu from './src/components/Menus/ScreenMenu';
import { PostProvider } from './src/context/postContext';

const RootNavigation = () => {
    return (
        <AuthProvider>
            <PostProvider>
                <ScreenMenu />
            </PostProvider>
        </AuthProvider>
    );
};

export default RootNavigation;