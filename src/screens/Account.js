/* eslint-disable react-native/no-inline-styles *//* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, Image, TextInput, ScrollView, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import FooterMenu from '../components/Menus/FooterMenu';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';

const Account = () => {
    const [state, setState] = useContext(AuthContext);
    const { user, token } = state;
    // local state
    const [name, setName] = useState(user?.name);
    const [email] = useState(user?.email);
    const [password, setPassword] = useState(user?.password);
    const [loading, setLoading] = useState(false);


    const handleUpdate = async () => {
        try {
            setLoading(true);
            const { data } = await axios.put('/auth/update-user', {
                name, password, email,
            }
                // if not updating user profile add token 
                // , {
                //     headers: {
                //         Authorization: `Bearer ${token}`,
                //     },
                // }
            );
            setLoading(false);
            // console.log("data ->", data);
            let UD = JSON.stringify(data);
            setState({ ...state, user: UD?.updatedUser });
            Alert.alert(data && data.message);
        } catch (error) {
            Alert.alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: 'center', margin: 10 }}>
                    <Image source={{
                        uri: 'data:image/png;base64,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',
                    }}
                        style={{ height: 150, width: 150, borderRadius: 100 }}
                    />
                    <Text style={styles.warningText}>You can only Update Name and Password*</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Name</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Email</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={email}
                        editable={false}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Password</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Role</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={state?.user.role}
                        editable={false}
                    />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
                        <Text style={styles.UpdateBtnText}>{loading ? 'Please Wait...' : 'Update Profile'}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {/* <Text>{JSON.stringify(state, null, 4)}</Text> */}
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <FooterMenu />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    warningText: {
        color: '#40916c',
        fontSize: 15,
    },
    inputContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputText: {
        fontWeight: 'bold',
        width: 85,
    },
    inputBox: {
        width: 230,
        backgroundColor: '#e5e6e4',
        // borderWidth: 1,
        // borderColor: '#1b4332',
        borderRadius: 10,
        paddingLeft: 10,
        fontSize: 17,
        color: '#000',
        marginLeft: 10,
    },
    updateBtn: {
        backgroundColor: '#40916c',
        color: '#fff',
        height: 40,
        width: 250,
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    UpdateBtnText: {
        color: '#fff',
        fontSize: 16,
    },
});


export default Account;

// import { View, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native'
// import React, { useContext, useState } from 'react'
// import { AuthContext } from '../context/authContext'
// import FooterMenu from '../components/Menus/FooterMenu';
// import { TouchableOpacity } from 'react-native';
// import axios from 'axios';

// const Account = () => {
//     //global state
//     const [state, setState] = useContext(AuthContext);
//     const { user, token } = state;


//     // local state
//     const [name, setName] = useState(user?.name);
//     const [password, setPassword] = useState(user?.password);
//     const [email, setEmail] = useState(user?.email);
//     const [loading, setLoading] = useState(false);

//     // handle update user data
//     const handleUpdate = async () => {
//         try {
//             setLoading(true);//http://192.168.29.161:3000/api/v1
//             const { data } = await axios.put("/auth/update-user", {
//                 name, password, email
//             });
//             setLoading(false);
//             let UD = JSON.stringify(data);
//             setState({ ...state, user: UD?.updatedUser })
//             alert(data && data.message);
//         } catch (error) {
//             alert(error.response.data.message)
//             setLoading(false);
//             console.log(error);
//         }
//     }


//     return (
//         <View style={styles.container}>
//             <ScrollView>
//                 <View style={{ alignItems: 'center' }}>
//                     <Image source={{ uri: "https://imgs.search.brave.com/RkN2hlNmb0LWFjB35MDeWJqrHi9q_ACA3qXVh4PJDks/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzAzLzQ0LzUz/LzM2MF9GXzUwMzQ0/NTM4N19DbVNtZXB3/MmFXZlZjbFZEVGNK/SHFMNjYyZUF3d1Rh/by5qcGc" }}
//                         style={{ height: 200, width: 200, borderRadius: 100 }}
//                     />
//                 </View>
//                 <Text style={styles.warningText}>Currently you can update name and password</Text>
//                 <View style={styles.inputContainer}>
//                     <Text style={styles.inputText}>Name</Text>
//                     <TextInput
//                         style={styles.inputBox}
//                         value={name}
//                         onChangeText={(text) => setName(text)}
//                     />
//                 </View>
//                 <View style={styles.inputContainer}>
//                     <Text style={styles.inputText}>Email</Text>
//                     <TextInput
//                         style={styles.inputBox}
//                         value={email}
//                         editable={false}
//                     />

//                 </View>
//                 <View style={styles.inputContainer}>
//                     <Text style={styles.inputText}>Password</Text>
//                     <TextInput
//                         style={styles.inputBox}
//                         value={password}
//                         onChangeText={(text) => setPassword(text)}
//                         secureTextEntry={true}
//                     />
//                 </View>
//                 <View style={styles.inputContainer}>
//                     <Text style={styles.inputText}>Role</Text>
//                     <TextInput
//                         style={styles.inputBox}
//                         value={state?.user.role}
//                         editable={false}
//                     />
//                 </View>
//                 <View style={{ alignItems: "center" }}>
//                     <TouchableOpacity onPress={handleUpdate} style={styles.updateBtn}>
//                         <Text style={styles.updateBtnText}>{loading ? "Please Wait" : "Update Profile"}</Text>
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>
//             <View  >
//                 <FooterMenu />
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         margin: 10,
//         justifyContent: 'space-between',
//         // marginTop: 40,
//     },
//     warningText: {
//         color: "red",
//         fontSize: 13,
//         textAlign: "center"
//     },
//     inputContainer: {
//         marginTop: 20,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     inputText: {
//         fontWeight: 'bold',
//         width: 70,
//         color: 'gray'
//     },
//     inputBox: {
//         width: 250,
//         backgroundColor: '#ffffff',
//         marginLeft: 10,
//         fontSize: 17,
//         paddingLeft: 10,
//         borderRadius: 5
//     },
//     updateBtn: {
//         marginTop: 5,
//         // padding: 10,
//         borderRadius: 10,
//         height: 40,
//         width: 150,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#0077b6',
//     },
//     updateBtnText: {
//         color: "#fff",
//         fontSize: 18,
//     },
// });


// export default Account;