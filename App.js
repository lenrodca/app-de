import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import * as SMS from 'expo-sms';
import Communications from 'react-native-communications';

export default function App() {
	const [value, onChangeText] = React.useState('');
	console.log(value);

	onPress = async () => {
		const status = await SMS.sendSMSAsync(value, 'Mensaje de prueba');
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
			<Button title="Enviar SMS con coordenadas" onPress={this.onPress} />
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
