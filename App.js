import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import * as Location from 'expo-location';
// import Communications from 'react-native-communications';
// import Geolocalizacion from './assets/js/geolocalizacion';
// import GetLocation from 'react-native-get-location';
let twilite = require('twilite');
global.Buffer = global.Buffer || require('buffer').Buffer;

export default function App() {
	const [value, onChangeText] = useState('');
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

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
	let today;
	let date;
	let time;
	let latitud = 0;
	let longitud = 0;
	let text = 'Waiting..';
	// console.log(location);
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
		// console.log({ latitud, longitud });
		text = JSON.stringify(location);
		// console.log({ text, time, date });
	}

	let onPress = async () => {
		let body = `Estas son sus coordenadas , Latitud : ${latitud} , Longitud : ${longitud}. La fecha de hoy es :${date} y la hora del envio es : ${time}`;
		let tw = twilite(
			'AC9a964d1fb99e66239dd9e4be708e59b1',
			'20cb96bcfc60a7feb76608ea4176deff',
			'+16514193786'
		);
		await tw.sendMessageAsync({ To: value, Body: body });
	};

	// onPress = async () => {
	// 	const status = Communications.textWithoutEncoding(
	// 		value,
	// 		'Mensaje de prueba'
	// 	);
	// };
	return (
		<View style={styles.container}>
			<Image
				source={require('./assets/icono.png')}
				style={{ width: 40, height: 40 }}
			/>
			<Text style={styles.titleText}>
				Inserte el número telefónico al cuál desea enviar sus coordenadas
			</Text>
			<TextInput
				style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
				onChangeText={(text) => onChangeText(text)}
				value={value}
			/>
			<Button title="Enviar SMS con coordenadas" onPress={onPress} />
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
		fontSize: 20,
		fontWeight: 'bold',
		justifyContent: 'center',
	},
});
