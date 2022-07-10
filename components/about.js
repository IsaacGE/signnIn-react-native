import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput, ScrollView, Image } from 'react-native';

const about = ({ navigation }) => {

    function logout() {
        navigation.push('login');
    }

    return (
        <ScrollView>
            <View style={estilos.contenedor}>
                <Text style={estilos.titulo}>Acerca de </Text>
                <View style={estilos.container}>
                    <Text style={estilos.person}>Jesús Isaac Gallegos Esquivel</Text>
                </View>
                <Image style={estilos.img}
                    source={require('./img/aboutImg.png')}
                />
                <Button
                    title="Terminar"
                    color='#DB0000'
                    onPress={() => logout()}
                />
            </View>
        </ScrollView>
    );
}

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: "Black",
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    titulo: {
        fontFamily: "Verdana",
        fontSize: 30,
        textAlign: "center",
        color: '#000',
        fontWeight: 'bold'
    },
    container: {
        backgroundColor: "#000",
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10
    },
    person: {
        fontSize: 18,
        fontWeight: '300',
        color: '#fff',
        padding: 15
    },
    img: {
        borderRadius: 50,
        alignSelf: "center",
        padding: 150,
        margin: 20,
        flexDirection: 'row',
        resizeMode: 'stretch',
        width: null,
        height: null,
    }
});

export default about;
