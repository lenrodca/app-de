import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import * as SMS from 'expo-sms';
import * as Location from 'expo-location';

// import Communications from 'react-native-communications';
// import Geolocalizacion from './assets/js/geolocalizacion';
// import GetLocation from 'react-native-get-location';

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

		latitud = Object.values(location)[0].latitude;
		longitud = Object.values(location)[0].longitude;
		// console.log({ latitud, longitud });
		text = JSON.stringify(location);
		// console.log({ text, time, date });
	}

	let onPress = async () => {
		// console.log({ latitud, longitud });
		const status = await SMS.sendSMSAsync(
			value,
			`Estas son sus coordenadas , ${text}. La fecha de hoy es :${date} y la hora del envio es : ${time}`
		);
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
