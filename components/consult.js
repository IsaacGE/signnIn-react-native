import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput, Image, ScrollView, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { isTemplateElement } from '@babel/types';

const consult = ({ navigation }) => {

    const [data, setData] = useState();

    async function showData() {
        try {
            const estudiantes = await firestore().collection('estudiantes').get();
            //Probando en consola antes de mostrar en pantalla
            //console.log(estudiantes.docs);            
            setData(estudiantes.docs); // Obteniendo los datos en formato Array
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        showData();
    }, [])

    // Redirigiendo a home(botones)
    function regresar() {
        navigation.push('home');
    }


    //Creadno metodo para mostrar los datos desde firebase
    function renderItem({ item }) {
        return (
            <ScrollView>
                <View style={estilos.container}>
                    <Text style={estilos.studentsList}>{item.data().matricula}</Text>
                    <Text style={estilos.studentsList}>{item.data().nombre}</Text>
                    <Text style={estilos.studentsList}>{item.data().apellido}</Text>
                    <Text style={estilos.studentsList}>{item.data().carrera}</Text>
                </View>
            </ScrollView>
        )
    }

    return (
        <View style={estilos.contenedor}>
            <Image style={estilos.img}
                source={require('./img/consultaImg.png')}
            />
            <Text style={estilos.titulo}>Lista de Estudiantes Registrados</Text>
            <View style={estilos.headRow}>
                <Text style={estilos.textHead}>Matricula</Text>
                <Text style={estilos.textHead}>Nombre</Text>
                <Text style={estilos.textHead}>Apellido</Text>
                <Text style={estilos.textHead}>Carrera</Text>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <Button
                style={estilos.boton}
                color='#359000'
                title="Regresar"
                onPress={() => regresar()}
            />
        </View>
    );
}

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
        textAlign: 'center'
    },
    container: {
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center'
    },
    titulo: {
        fontFamily: "Verdana",
        fontSize: 30,
        textAlign: "center",
        color: '#000',
        fontWeight: 'bold'
    },
    headRow: {
        backgroundColor: '#C0C0C0',
        marginTop: 20,
        flexDirection: 'row'
    },
    textHead: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 20,
    },
    studentsList: {
        color: '#000',
        fontSize: 18,
        fontWeight: '500',
        margin: 5,
        marginRight: 35
    },
    img: {
        height: 200,
        width: 200
    }
});

export default consult;
