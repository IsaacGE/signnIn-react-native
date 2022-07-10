import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput, FlatList, Image, ScrollView, Alert } from 'react-native';
import firestore, { firebase } from '@react-native-firebase/firestore';


const register = ({ navigation }) => {
    const [matricula, setMatricula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [carrera, setCarrera] = useState('');
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
    //console.log(students);

    // Creando Alertas para las Posibles situaciones 
    function showAlert() {
        Alert.alert(
            "¡Registro Exitoso!",
            "Se ha registrado el Estudiante " + nombre,
        );
    }
    function noRegistro() {
        Alert.alert(
            "¡Error!",
            "La matricula " + matricula + " ya esta registrada",
        );
    }
    function noComplete() {
        Alert.alert(
            "¡Error!",
            "Se deben llenar los campos",
        );
    }

    //Creando el metodo de regitro de alumnos en FireBase
    function registrar() {
        let matRegistrada = students.filter(student => student.matricula === matricula);
        //console.log(matRegistrada);
        if (matricula != '' || nombre != '' || apellido != '' || carrera != '' || pass != '') {
            if (matRegistrada.length > 0) {
                noRegistro();
            } else {
                firestore().collection('estudiantes').add({
                    matricula: matricula,
                    nombre: nombre,
                    apellido: apellido,
                    carrera: carrera,
                    pass: pass
                })
                showAlert();
            }
        } else {
            noComplete();
        }
    }

    //Creando funcion para regresar o cancelar operacion
    function cancelar() {
        setMatricula('');
        setNombre('');
        setApellido('');
        setCarrera('');
        setPass('');
        navigation.push('home');
    }

    return (
        <ScrollView>
            <View style={estilos.contenedor}>
                <View style={estilos.header}>
                    <Text style={estilos.titulo}>Registro de Estudiantes</Text>
                    <Image style={estilos.img}
                        source={require('./img/registerImg.png')}
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
                        placeholder='Nombre:'
                        placeholderTextColor='#000'
                        onChangeText={(val) => setNombre(val)}
                    />
                    <TextInput
                        style={estilos.input}
                        placeholder='Apellido:'
                        placeholderTextColor='#000'
                        onChangeText={(val) => setApellido(val)}
                    />
                    <TextInput
                        style={estilos.input}
                        placeholder='Carrera:'
                        placeholderTextColor='#000'
                        onChangeText={(val) => setCarrera(val)}
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
                        title="Registrar"
                        onPress={() => registrar()}
                        color='#00BC0B'
                    />
                    <Button
                        title="Cancelar"
                        color='#DB0000'
                        onPress={() => cancelar()}
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
        backgroundColor: 'rgba(0, 78, 97, 0.479)',
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
        borderWidth: 2,
        borderColor: '#000',
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
        justifyContent: 'center'
    },
    img: {
        height: 100,
        width: 100,
        alignItems: 'center',
    },
    fixToText: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default register;
