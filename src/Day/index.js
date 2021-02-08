import React, {useEffect} from 'react'
import {View,Text, TouchableOpacity, Image, AsyncStorage} from 'react-native'

import styles from './styles'


const Day=({navigation, route})=>{
	const valorMes=route.params.valorMes
	const nomeMes=route.params.mes
	const dia=route.params.dia
	let data={"CEE":[]}

	useEffect(() => {
    	let data = getDataDay()
    	console.log(data);
  	});

	const saveDay = async (dd) => {
		try{ 
			await AsyncStorage.setItem("dados", dd);
		}catch (error){ 
	  		console.log(error.message);
	}};

	const getDataDay = async () => {
	  	let db
	  	try{ 
	  		db = await AsyncStorage.getItem("dados")
	  	}catch (error){ 
	  		  		console.log(error.message);
	  	}
	  	return db;
	}

	saveDay("kjd")

	return(
		<View style={styles.back}>
			<View style={styles.topBar}>
				<TouchableOpacity style={styles.warpMesDia} onPress={()=>navigation.navigate('Mes')}>
					<Text style={styles.mesDia}>{'Dia '+dia+' de '+nomeMes}</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.edit}>
					<Text style={styles.edTex}>[]</Text>
				</TouchableOpacity>
				
			</View>
		</View>

)}

export default Day
