import React from 'react';
import {Text, View} from 'react-native';

import styles from './styles'

const Mes=({navigation, route})=>{
	const nomeMes=route.params.mes

	return(
		<View style={styles.back}>
			<View style={styles.topBar}>
				<Text>{nomeMes}</Text>
			</View>

		</View>
		);
}

export default Mes;