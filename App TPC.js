import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import TcpSocket from 'react-native-tcp-socket';
import {Switch} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';

import * as Location from 'expo-location';

let twilite = require('twilite');
global.Buffer = global.Buffer || require('buffer').Buffer;

export default function App() {
	const [value, onChangeText] = useState('');
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	let text = 'Waiting..';

	let today;
	let date;
	let time;
	let latitud;
	let longitud;

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	});

	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		today = new Date();
		date =
			today.getFullYear() +
			'-' +
			(today.getMonth() + 1) +
			'-' +
			today.getDate();

		time =
			today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

		latitud = location.coords.latitude;
		longitud = location.coords.longitude;
	}

	let onPress = async () => {
		let body = `Estas son sus coordenadas , Latitud : ${latitud} , Longitud : ${longitud}. La fecha de hoy es :${date} y la hora del envio es : ${time}`;
		let tw = twilite(
			//api,
			//TOKEN,
			//number'
		);
		await tw.sendMessageAsync({ To: value, Body: body });
	};

	return (
		<View style={styles.container}>
			<Image
				source={require('./assets/icono.png')}
				style={{ width: 40, height: 40 }}
			/>

			<Text style={styles.titleText}>
				Inserte el número telefónico al cuál desea enviar sus coordenadas
			</Text>

			<Input
				placeholder="Número telefónico"
				leftIcon={<Icon name="phone" size={24} color="black" />}
				onChangeText={(text) => onChangeText(text)}
				value={value}
				style={styles.inputt}
				containerStyle={{ width: '50%' }}
			/>

			<Button title="Enviar SMS" type="solid" onPress={onPress} />
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},

	titleText: {
		fontSize: 12,
		fontWeight: 'bold',
		justifyContent: 'center',
	},

	inputt: {
		flex: 1,
	},
});
