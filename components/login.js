import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput, FlatList, Image, ScrollView, Alert } from 'react-native';
import firestore, { firebase } from '@react-native-firebase/firestore';

const login = ({navigation}) => {

    const [matricula, setMatricula] = useState('');
    const [pass, setPass] = useState('');

    // Consultando datos de Firebase para la comparacion antes de registro
    const [students, setStudents] = useState();

    useEffect(() => {
        firestore().collection('estudiantes').onSnapshot((querySnapshot) => {
            const estudiantes = [];
            querySnapshot.docs.forEach((doc) => {
                const { matricula, nombre, apellido, carrera, pass } = doc.data();
                estudiantes.push({
                    id: doc.id,
                    matricula,
                    nombre,
                    apellido,
                    carrera,
                    pass,
                })
            })
            setStudents(estudiantes);
        });
    }, []);

    // Creando posibles alertas 
    function errLogin() {
        Alert.alert(
            "¡Error!",
            "Credenciales Incorrectas",
        );
    }
    function noComplete() {
        Alert.alert(
            "¡Error!",
            "Ingresa las credenciales",
        );
    }

    // Creando metodo para que pueda registrarse
    function register() {
        navigation.push('register');
    }
    //Creando el metodo para autenticar el estudianre por matricula y contraseña
    function login() {
        let loginCorrect = students.filter(student => student.matricula === matricula && student.pass === pass);
        //console.log(matRegistrada);
        if (matricula != '' ||  pass != '') {
            if (loginCorrect.length > 0) {
                navigation.push('home');
            } else {
                errLogin();
            }
        } else {
            noComplete();
        }
    }

    return (
        <ScrollView>
            <View style={estilos.contenedor}>
                <View style={estilos.header}>
                    <Text style={estilos.titulo}>Bienvenido(a)</Text>
                    <Image style={estilos.img}
                        source={require('./img/loginImg.png')}
                    />
                </View>
                <View style={estilos.containerForm}>
                    <TextInput
                        style={estilos.input}
                        placeholder='Matricula:'
                        placeholderTextColor='#000'
                        onChangeText={(val) => setMatricula(val)}
                    />
                    <TextInput
                        style={estilos.input}
                        placeholder='Contraseña:'
                        placeholderTextColor='#000'
                        onChangeText={(val) => setPass(val)}
                    />
                </View>
                <View style={estilos.fixToText}>
                    <Button
                        title="Ingresar"
                        onPress={() => login()}
                        color='#00BC0B'
                    />
                    <Button
                        title="Registrarme"
                        color='#DB0000'
                        onPress={() => register()}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10
    },
    containerForm: {
        backgroundColor: 'rgba(163, 163, 163, 0.479)',
        borderRadius: 8,
        marginTop: 10,
        padding: 10,
        paddingRight: 50,
        paddingLeft: 50
    },
    titulo: {
        fontFamily: "Verdana",
        fontSize: 30,
        fontWeight: 'bold',
        color: '#0096BF'
    },
    input: {
        borderWidth: 0,
        borderBottomWidth: 2,
        borderColor: '#004644',
        borderRadius: 5,
        textAlign: 'center',
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
        marginBottom: 10
    },
    header: {
        textAlign: "center",
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25
    },
    img: {
        height: 150,
        width: 150,
        alignItems: 'center',
    },
    fixToText: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default login;
