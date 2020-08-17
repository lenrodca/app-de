import React from 'react';
import GetLocation from 'react-native-get-location';

export default function Geolocalizacion() {
	GetLocation.getCurrentPosition({
		enableHighAccuracy: true,
		timeout: 15000,
	})
		.then((location) => {
			console.log(location);
		})
		.catch((error) => {
			const { code, message } = error;
			console.warn(code, message);
		});
}
