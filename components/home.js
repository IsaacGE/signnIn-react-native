import React from 'react';
import { Text, View, StyleSheet, Button, TextInput, Image} from 'react-native';


const Separator = () => (
    <View style={estilos.separator} />
);

const home = ({navigation}) => {

    function cambio(btn) {
        if (btn == 1) {
            navigation.push('consult');
        }
        else if (btn == 2) {
            navigation.push('register');
        }
        else {
            navigation.push('about');
        }
    }

    return(
        <View style={estilos.contenedor}>
            <Text style={estilos.titulo}>Bienvenid@ al la App de Estudiantes</Text>
            <Image style={estilos.img}
                source={require('./img/homeImg.png')}
            />
            <View style={estilos.contenedor2}>
                <Button 
                    style={estilos.boton}  
                    color='#007990'
                    title="Consulta"
                    onPress={() => cambio(1)}
                />
                <Separator />
                <Button 
                    style={estilos.boton} 
                    color='#359000'
                    title="Registro"
                    onPress={() => cambio(2)}
                />
                <Separator />
                <Button 
                    style={estilos.boton} 
                    color='#A00000'
                    title="Acerca de..."
                    onPress={() => cambio(3)}
                />
            </View>
        </View>
    );
}

const estilos = StyleSheet.create ({
    contenedor:{
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    contenedor2:{
        flex: 4,
        paddingTop: 80,
        paddingHorizontal: 0,
    },
    titulo:{
        fontSize: 24,
        textTransform: 'uppercase',
        fontWeight: "bold",
        color: '#000',
        textAlign: 'center'
    },
    boton: {
        padding: 15,
        fontSize: 20,
        marginBottom:10,
        padding:15
    },
    separator: {
        marginVertical: 10,
        borderBottomColor: '#000',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    img: {
        height: 200,
        width: 200,
        marginTop: 20
    }
});

export default home;
